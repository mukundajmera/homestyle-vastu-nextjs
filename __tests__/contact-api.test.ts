import mysql from 'mysql2/promise';
import nodemailer from 'nodemailer';
import { POST } from '@/app/api/contact/route';

jest.mock('mysql2/promise');
jest.mock('nodemailer');

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((body, init) => {
      return {
        status: init?.status || 200,
        json: async () => body,
      };
    }),
  },
}));

describe('/api/contact', () => {
  let mockExecute: jest.Mock;
  let mockConnection: any;
  let mockSendMail: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockExecute = jest.fn().mockResolvedValue([{}]);
    mockConnection = {
      execute: mockExecute,
      end: jest.fn(),
    };
    (mysql.createConnection as jest.Mock).mockResolvedValue(mockConnection);

    mockSendMail = jest.fn().mockResolvedValue({});
    (nodemailer.createTransport as jest.Mock).mockReturnValue({
      sendMail: mockSendMail,
    });

    process.env.DB_HOST = 'test';
    process.env.SMTP_HOST = 'test';
    process.env.SMTP_USER = 'test';
  });

  const createMockRequest = (body: any) => {
    return {
      json: async () => body,
    } as unknown as Request;
  };

  it('rejects invalid data', async () => {
    const req = createMockRequest({ name: '' });
    const res = await POST(req) as any;
    expect(res.status).toBe(400);
  });

  it('silently accepts honeypot submissions', async () => {
    const req = createMockRequest({ honeypot: 'bot-filled-this' });
    const res = await POST(req) as any;
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(mockExecute).not.toHaveBeenCalled();
  });

  it('inserts into database and sends email on success', async () => {
    const req = createMockRequest({
      name: 'John Doe',
      phone: '1234567890',
      location: 'Jaipur',
      type: 'residential',
      format: 'onsite',
    });

    const res = await POST(req) as any;
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.dbSuccess).toBe(true);
    expect(json.mailSuccess).toBe(true);

    expect(mockExecute).toHaveBeenCalledTimes(1);
    expect(mockSendMail).toHaveBeenCalledTimes(1);
  });

  it('handles database error and returns 500', async () => {
    mockExecute.mockRejectedValue(new Error('DB Error'));

    const req = createMockRequest({
      name: 'John Doe',
      phone: '1234567890',
      location: 'Jaipur',
      type: 'residential',
      format: 'onsite',
    });

    const res = await POST(req) as any;
    expect(res.status).toBe(500);
  });
});
