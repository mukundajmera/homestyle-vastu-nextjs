import { createHash } from 'node:crypto';
import { TextDecoder } from 'node:util';
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { z } from 'zod';

export const runtime = 'nodejs';

const MAX_REQUEST_BYTES = 5 * 1024;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 10;
const MAX_RATE_LIMIT_KEYS = 10_000;
const PRIVACY_POLICY_VERSION = 'v1.0';

const contactSchema = z.object({
  submissionId: z.string().uuid(),
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  phone: z.string().trim().min(10, 'Phone number must be at least 10 characters').max(20),
  email: z.string().trim().email('Enter a valid email address').max(255).optional().or(z.literal('')),
  location: z.string().trim().min(2, 'City/Location is required').max(100),
  type: z.enum(['residential', 'commercial'], {
    required_error: 'Please select whether your inquiry is about a home or business',
  }),
  serviceInterest: z.enum(
    ['general_vastu', 'feng_shui', 'plot_selection', 'construction_renovation', 'industrial_vastu', 'floor_plan_review', 'other'],
    { required_error: 'Please select a service' },
  ),
  format: z.enum(['onsite', 'online'], {
    required_error: 'Please select a consultation format',
  }),
  inquiry: z.string().trim().max(1000).optional().or(z.literal('')),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Please consent to being contacted about this inquiry' }),
  }),
  honeypot: z.string().max(0).optional(),
});

type RateLimitEntry = { count: number; expiresAt: number };
const rateLimits = new Map<string, RateLimitEntry>();

class PayloadTooLargeError extends Error {}
class InvalidJsonError extends Error {}

async function readLimitedJson(request: Request): Promise<unknown> {
  const contentLength = request.headers.get('content-length');
  if (contentLength !== null) {
    const declaredLength = Number(contentLength);
    if (Number.isFinite(declaredLength) && declaredLength > MAX_REQUEST_BYTES) {
      throw new PayloadTooLargeError();
    }
  }

  if (!request.body) throw new InvalidJsonError();

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let byteLength = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      byteLength += value.byteLength;
      if (byteLength > MAX_REQUEST_BYTES) {
        await reader.cancel();
        throw new PayloadTooLargeError();
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(byteLength);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
  } catch {
    throw new InvalidJsonError();
  }
}

function getRateLimitKey(phone: string): string {
  // Do not trust caller-controlled forwarded-IP headers. Keep only a short-lived
  // one-way hash of the supplied phone number in process memory.
  return createHash('sha256').update(phone.replace(/\D/g, '')).digest('hex');
}

function isRateLimited(key: string, now = Date.now()): boolean {
  for (const [storedKey, entry] of rateLimits) {
    if (entry.expiresAt <= now) rateLimits.delete(storedKey);
  }

  if (!rateLimits.has(key) && rateLimits.size >= MAX_RATE_LIMIT_KEYS) {
    const oldestKey = rateLimits.keys().next().value;
    if (oldestKey) rateLimits.delete(oldestKey);
  }

  const entry = rateLimits.get(key);
  if (!entry || entry.expiresAt <= now) {
    rateLimits.set(key, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count += 1;
  return false;
}

function getDatabaseConfig() {
  const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
  if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME) return null;

  const parsedPort = Number(process.env.DB_PORT ?? 3306);
  const port = Number.isInteger(parsedPort) && parsedPort > 0 && parsedPort <= 65535 ? parsedPort : 3306;
  return { host: DB_HOST, port, user: DB_USER, password: DB_PASSWORD, database: DB_NAME };
}

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type')?.split(';')[0].trim().toLowerCase();
  if (contentType !== 'application/json') {
    return NextResponse.json({ error: 'Send this form using the supported application/json format.' }, { status: 415 });
  }

  let body: unknown;
  try {
    body = await readLimitedJson(request);
  } catch (error) {
    if (error instanceof PayloadTooLargeError) {
      return NextResponse.json({ error: 'Your message is too large. Please shorten it and try again.' }, { status: 413 });
    }
    return NextResponse.json({ error: 'The form data could not be read. Please review it and try again.' }, { status: 400 });
  }

  if (typeof body === 'object' && body !== null && 'honeypot' in body) {
    const honeypot = (body as { honeypot?: unknown }).honeypot;
    if (typeof honeypot === 'string' && honeypot.length > 0) {
      return NextResponse.json({ error: 'This form submission could not be accepted.' }, { status: 400 });
    }
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Please correct the highlighted fields and try again.' }, { status: 400 });
  }
  const lead = parsed.data;

  if (isRateLimited(getRateLimitKey(lead.phone))) {
    return NextResponse.json(
      { error: 'Too many inquiries were sent recently. Please wait a little and try again, or contact us on WhatsApp.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)) } },
    );
  }

  const databaseConfig = getDatabaseConfig();
  if (!databaseConfig) {
    return NextResponse.json({ error: 'The inquiry form is temporarily unavailable. Please contact us on WhatsApp.' }, { status: 503 });
  }

  let connection: mysql.Connection | undefined;
  try {
    connection = await mysql.createConnection({ ...databaseConfig, connectTimeout: 10000, timezone: 'Z' });

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS leads (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        submission_id CHAR(36) NOT NULL,
        payload_hash CHAR(64) NOT NULL,
        name VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        email VARCHAR(255) NULL,
        location VARCHAR(100) NOT NULL,
        type ENUM('residential', 'commercial') NOT NULL,
        service_interest VARCHAR(80) NOT NULL,
        format ENUM('onsite', 'online') NOT NULL,
        inquiry TEXT NULL,
        consent TINYINT(1) NOT NULL,
        consent_timestamp DATETIME NOT NULL,
        privacy_policy_version VARCHAR(20) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY uq_leads_submission_id (submission_id),
        KEY ix_leads_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    const payloadHash = createHash('sha256').update(JSON.stringify(lead)).digest('hex');
    await connection.execute(
      `INSERT INTO leads
        (submission_id, payload_hash, name, phone, email, location, type, service_interest, format, inquiry, consent, consent_timestamp, privacy_policy_version)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id)`,
      [
        lead.submissionId,
        payloadHash,
        lead.name,
        lead.phone,
        lead.email || null,
        lead.location,
        lead.type,
        lead.serviceInterest,
        lead.format,
        lead.inquiry || null,
        lead.consent,
        new Date().toISOString().slice(0, 19).replace('T', ' '),
        PRIVACY_POLICY_VERSION,
      ],
    );

    const [rows] = await connection.execute('SELECT payload_hash FROM leads WHERE submission_id = ? LIMIT 1', [lead.submissionId]);
    const savedRow = Array.isArray(rows) ? (rows as Array<{ payload_hash: string }>)[0] : undefined;
    if (!savedRow) throw new Error('Lead insert could not be confirmed');
    if (savedRow.payload_hash !== payloadHash) {
      return NextResponse.json({ error: 'This form has already been submitted with different details.' }, { status: 409 });
    }

    return NextResponse.json({ success: true, dbSuccess: true });
  } catch {
    console.error('Lead database operation failed.');
    return NextResponse.json(
      { error: 'We could not save your inquiry. Please try again or contact us on WhatsApp.' },
      { status: 500 },
    );
  } finally {
    if (connection) {
      try {
        await connection.end();
      } catch {
        console.error('Lead database connection cleanup failed.');
      }
    }
  }
}
