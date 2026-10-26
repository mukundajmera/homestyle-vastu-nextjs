import mysql from 'mysql2/promise';
import { randomUUID } from 'node:crypto';
import { TextEncoder } from 'node:util';
import { NextResponse } from 'next/server';
import { POST } from '@/app/api/contact/route';

jest.mock('mysql2/promise', () => ({
  __esModule: true,
  default: { createConnection: jest.fn() },
}));

const storedLeads = new Map<string, string>();
const mockExecute = jest.fn();
const mockEnd = jest.fn();
const mockConnection = { execute: mockExecute, end: mockEnd };
let requestNumber = 0;
let mockedPhoneCount = 0;

const basePayload = () => ({
  submissionId: randomUUID(),
  name: 'John Doe',
  phone: `+91 98280 88${String(++requestNumber).padStart(3, '0')}`,
  email: 'test@example.com',
  location: 'Jaipur',
  type: 'home',
  serviceInterest: 'floor_plan_review',
  format: 'online',
  inquiry: 'Please review a floor plan.',
  consent: true,
});

type MockRequestOptions = {
  contentType?: string;
  contentLength?: string;
};

function createMockRequest(payload: unknown, options: MockRequestOptions = {}): Request {
  const bytes = new TextEncoder().encode(JSON.stringify(payload));
  let sent = false;
  const body = {
    getReader: () => ({
      read: jest.fn(async () => {
        if (sent) return { done: true, value: undefined };
        sent = true;
        return { done: false, value: bytes };
      }),
      cancel: jest.fn(async () => undefined),
      releaseLock: jest.fn(),
    }),
  };
  const headers: Record<string, string> = {
    'content-type': options.contentType ?? 'application/json',
  };
  if (options.contentLength !== undefined) headers['content-length'] = options.contentLength;

  return { headers: new Headers(headers), body } as unknown as Request;
}

describe('/api/contact', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    storedLeads.clear();
    mockedPhoneCount = 0;
    process.env.DB_HOST = 'db.example.test';
    process.env.DB_PORT = '3306';
    process.env.DB_USER = 'test-user';
    process.env.DB_PASSWORD = 'test-password';
    process.env.DB_NAME = 'test-leads';
    (mysql.createConnection as jest.Mock).mockResolvedValue(mockConnection);
    mockEnd.mockResolvedValue(undefined);
    mockExecute.mockImplementation(async (statement: string, values: unknown[] = []) => {
      if (statement.includes('CREATE ') || statement.includes('ALTER ')) throw new Error('Route code must not issue DDL at runtime');
      if (statement.includes('SELECT COUNT(*) AS n FROM leads WHERE phone = ?')) {
        return [[{ n: mockedPhoneCount }], []];
      }
      if (statement.includes('INSERT INTO leads')) {
        const [submissionId, payloadHash] = values as [string, string];
        if (!storedLeads.has(submissionId)) storedLeads.set(submissionId, payloadHash);
        return [{ affectedRows: 1 }, []];
      }
      if (statement.includes('SELECT payload_hash')) {
        const [submissionId] = values as [string];
        const payloadHash = storedLeads.get(submissionId);
        return [payloadHash ? [{ payload_hash: payloadHash }] : [], []];
      }
      throw new Error(`Unexpected SQL in test: ${statement}`);
    });
  });

  it('rejects a body above 5 KB even when Content-Length is missing', async () => {
    const payload = { ...basePayload(), extra: 'x'.repeat(6000) };
    const response = await POST(createMockRequest(payload));
    expect(response.status).toBe(413);
    expect(mysql.createConnection).not.toHaveBeenCalled();
  });

  it('rejects a body above 5 KB even when Content-Length understates it', async () => {
    const payload = { ...basePayload(), extra: 'x'.repeat(6000) };
    const response = await POST(createMockRequest(payload, { contentLength: '10' }));
    expect(response.status).toBe(413);
    expect(mysql.createConnection).not.toHaveBeenCalled();
  });

  it('rejects unsupported content types', async () => {
    const response = await POST(createMockRequest(basePayload(), { contentType: 'text/plain' }));
    expect(response.status).toBe(415);
    expect(mysql.createConnection).not.toHaveBeenCalled();
  });

  it('rejects malformed JSON with a client error', async () => {
    const request = createMockRequest(basePayload());
    Object.defineProperty(request, 'body', {
      value: {
        getReader: () => ({
          read: jest.fn().mockResolvedValueOnce({ done: false, value: new TextEncoder().encode('{') }).mockResolvedValueOnce({ done: true }),
          cancel: jest.fn(),
          releaseLock: jest.fn(),
        }),
      },
    });
    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it('rejects a filled honeypot without creating a lead', async () => {
    const response = await POST(createMockRequest({ ...basePayload(), honeypot: 'filled by a bot' }));
    expect(response.status).toBe(400);
    expect(mysql.createConnection).not.toHaveBeenCalled();
    expect(storedLeads.size).toBe(0);
  });

  it('accepts a null Turnstile token when the form has no widget', async () => {
    const response = await POST(createMockRequest({ ...basePayload(), turnstileToken: null }));
    expect(response.status).not.toBe(400);
  });

  it('requires affirmative consent', async () => {
    const response = await POST(createMockRequest({ ...basePayload(), consent: false }));
    expect(response.status).toBe(400);
    expect(mysql.createConnection).not.toHaveBeenCalled();
  });

  it('returns a clear service-unavailable response when database settings are missing', async () => {
    delete process.env.DB_PASSWORD;
    const response = await POST(createMockRequest(basePayload()));
    expect(response.status).toBe(503);
    expect(mysql.createConnection).not.toHaveBeenCalled();
    expect(mockExecute).not.toHaveBeenCalled();
  });

  it('returns 429 with Retry-After when the database phone limit is reached without inserting', async () => {
    mockedPhoneCount = 10;
    const jsonSpy = jest.spyOn(NextResponse, 'json');
    const response = await POST(createMockRequest(basePayload()));

    expect(response.status).toBe(429);
    expect(jsonSpy).toHaveBeenCalledWith(
      expect.objectContaining({ error: expect.stringContaining('Too many inquiries') }),
      { status: 429, headers: { 'Retry-After': '900' } },
    );
    expect(mockExecute).toHaveBeenCalledWith(
      'SELECT COUNT(*) AS n FROM leads WHERE phone = ? AND created_at >= (UTC_TIMESTAMP() - INTERVAL 15 MINUTE)',
      expect.any(Array),
    );
    expect(mockExecute.mock.calls.some(([statement]) => String(statement).includes('INSERT INTO leads'))).toBe(false);
    jsonSpy.mockRestore();
  });

  it('inserts when the database phone count is below the limit', async () => {
    mockedPhoneCount = 9;
    const response = await POST(createMockRequest(basePayload()));

    expect(response.status).toBe(200);
    expect(mockExecute.mock.calls.some(([statement]) => String(statement).includes('INSERT INTO leads'))).toBe(true);
  });

  it('stores a lead with server-owned consent evidence and returns success', async () => {
    const before = Date.now();
    const payload = basePayload();
    const response = await POST(createMockRequest(payload));
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result).toEqual({ success: true, dbSuccess: true });
    const insertCall = mockExecute.mock.calls.find(([statement]) => String(statement).includes('INSERT INTO leads'));
    expect(insertCall).toBeDefined();
    expect(insertCall?.[1]).toContain(true);
    expect(insertCall?.[1]).toContain('v2.0');
    const consentTimestamp = insertCall?.[1]?.[11] as string;
    const timestamp = new Date(`${consentTimestamp.replace(' ', 'T')}Z`).getTime();
    expect(timestamp).toBeGreaterThanOrEqual(before - 1000);
    expect(timestamp).toBeLessThanOrEqual(Date.now() + 1000);
  });

  it('treats a retry with the same idempotency key and data as one saved lead', async () => {
    const payload = basePayload();
    const first = await POST(createMockRequest(payload));
    const second = await POST(createMockRequest(payload));

    expect(first.status).toBe(200);
    expect(second.status).toBe(200);
    expect(storedLeads.size).toBe(1);
  });

  it('treats an omitted inquiry and an empty string as functionally identical for retries', async () => {
    const payload = basePayload();
    // Remove the optional field to represent an omitted state
    delete (payload as Record<string, unknown>).inquiry;

    const first = await POST(createMockRequest(payload));

    // Retry with explicit empty strings
    const second = await POST(createMockRequest({
      ...payload,
      inquiry: '',
    }));

    expect(first.status).toBe(200);
    expect(second.status).toBe(200);
    expect(storedLeads.size).toBe(1);
  });

  it('requires an email address', async () => {
    const payload = basePayload();
    delete (payload as Record<string, unknown>).email;
    const response = await POST(createMockRequest(payload));
    expect(response.status).toBe(400);
  });

  it('stores a property category derived from the service when none is sent', async () => {
    const payload = { ...basePayload(), serviceInterest: 'plot_selection' } as Record<string, unknown>;
    delete payload.type;
    delete payload.format;
    const response = await POST(createMockRequest(payload));
    expect(response.status).toBe(200);
  });

  it('confirms a materially changed inquiry still returns 409', async () => {
    const payload = basePayload();
    // Start with empty inquiry
    const firstPayload = { ...payload, inquiry: '' };
    const first = await POST(createMockRequest(firstPayload));

    // Retry with different inquiry
    const changed = await POST(createMockRequest({
      ...payload,
      inquiry: 'A materially different inquiry',
    }));

    expect(first.status).toBe(200);
    expect(changed.status).toBe(409);
    expect(storedLeads.size).toBe(1);
  });

  it('rejects reuse of an idempotency key with different form data', async () => {
    const payload = basePayload();
    await POST(createMockRequest(payload));
    const changed = await POST(createMockRequest({ ...payload, inquiry: 'Different request' }));

    expect(changed.status).toBe(409);
    expect(storedLeads.size).toBe(1);
  });

  it('limits repeated submissions from the same phone number', async () => {
    const initialPayload = basePayload();
    let lastResponse: Response | undefined;
    for (let index = 0; index < 11; index += 1) {
      lastResponse = await POST(createMockRequest({
        ...initialPayload,
        submissionId: randomUUID(),
      }));
    }

    expect(lastResponse?.status).toBe(429);
    expect(storedLeads.size).toBe(10);
  });

  it('does not turn a database failure into a WhatsApp-eligible success', async () => {
    mockExecute.mockRejectedValueOnce(new Error('database unavailable'));
    const response = await POST(createMockRequest(basePayload()));
    const result = await response.json();

    expect(response.status).toBe(500);
    expect(result.success).not.toBe(true);
    expect(JSON.stringify(result)).not.toContain('John Doe');
  });

  it.each(['home', 'business', 'plot', 'industrial', 'other'])(
    'persists the %s property category',
    async (type) => {
      const response = await POST(createMockRequest({ ...basePayload(), type }));
      const insertCall = mockExecute.mock.calls.find(([statement]) => String(statement).includes('INSERT INTO leads'));

      expect(response.status).toBe(200);
      expect((insertCall?.[1] as unknown[])[6]).toBe(type);
    },
  );

  it.each(['residential', 'commercial', 'unknown', ''])(
    'rejects unsupported property category %s before opening the database',
    async (type) => {
      const response = await POST(createMockRequest({ ...basePayload(), type }));

      expect(response.status).toBe(400);
      expect(mysql.createConnection).not.toHaveBeenCalled();
    },
  );

  it('rejects short phone numbers', async () => {
    const payload = { ...basePayload(), phone: '+911234567' };
    const response = await POST(createMockRequest(payload));
    expect(response.status).toBe(400);
    const result = await response.json();
    expect(result.error).toContain('correct the highlighted fields');
  });

  it('rejects long phone numbers', async () => {
    const payload = { ...basePayload(), phone: '+9112345678901234567' };
    const response = await POST(createMockRequest(payload));
    expect(response.status).toBe(400);
  });

  it('rejects invalid phone numbers with letters', async () => {
    const payload = { ...basePayload(), phone: '+91 98280 8867a' };
    const response = await POST(createMockRequest(payload));
    expect(response.status).toBe(400);
  });

  describe('database connection config', () => {
    let originalEnv: NodeJS.ProcessEnv;

    beforeEach(() => {
      originalEnv = process.env;
    });

    afterEach(() => {
      process.env = originalEnv;
    });

    it('normalizes localhost to 127.0.0.1 for Hostinger IPv6 mitigation', async () => {
      process.env.DB_HOST = 'localhost';
      await POST(createMockRequest(basePayload()));
      expect(mysql.createConnection).toHaveBeenCalledWith(
        expect.objectContaining({ host: '127.0.0.1' }),
      );
    });

    it('preserves an explicit IPv4 address host', async () => {
      process.env.DB_HOST = '192.168.1.100';
      await POST(createMockRequest(basePayload()));
      expect(mysql.createConnection).toHaveBeenCalledWith(
        expect.objectContaining({ host: '192.168.1.100' }),
      );
    });

    it('preserves a non-localhost domain name host', async () => {
      process.env.DB_HOST = 'db.example.test';
      await POST(createMockRequest(basePayload()));
      expect(mysql.createConnection).toHaveBeenCalledWith(
        expect.objectContaining({ host: 'db.example.test' }),
      );
    });
  });

  describe('lead intake gate', () => {
    let originalEnv: NodeJS.ProcessEnv;

    beforeEach(() => {
      originalEnv = process.env;
    });

    afterEach(() => {
      process.env = originalEnv;
    });

    it('rejects submissions with 403 in production when gate is disabled', async () => {
      process.env = { ...originalEnv, NODE_ENV: 'production', LEAD_INTAKE_ENABLED: 'false' };
      const req = createMockRequest(basePayload());
      const res = await POST(req);
      expect(res.status).toBe(403);
      const data = await res.json();
      expect(data.error).toBe('Lead intake is currently disabled.');
    });

    it('accepts submissions in production when gate is enabled', async () => {
      process.env = { ...originalEnv, NODE_ENV: 'production', LEAD_INTAKE_ENABLED: 'true' };
      const req = createMockRequest(basePayload());
      const res = await POST(req);
      expect(res.status).not.toBe(403);
    });

    it('accepts submissions in development by default', async () => {
      process.env = { ...originalEnv, NODE_ENV: 'development' };
      const req = createMockRequest(basePayload());
      const res = await POST(req);
      expect(res.status).not.toBe(403);
    });
  });
});
