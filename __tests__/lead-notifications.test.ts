import nodemailer from 'nodemailer';
import { LEAD_RECIPIENTS, sendLeadEmail } from '@/lib/lead-notifications';
import { verifyTurnstileToken } from '@/lib/turnstile';

const mockSendMail = jest.fn();

jest.mock('nodemailer', () => ({
  __esModule: true,
  default: { createTransport: jest.fn(() => ({ sendMail: mockSendMail })) },
}));

const lead = {
  submissionId: '6f1b6c2e-3d6a-4f3e-9a51-2f1c4e7b9d10',
  name: 'Test Visitor',
  phone: '9876543210',
  location: 'Jaipur, Rajasthan',
  type: 'home',
  serviceInterest: 'general_vastu',
  format: 'onsite',
};

describe('sendLeadEmail', () => {
  const originalEnv = process.env;
  const originalFetch = global.fetch;

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      SMTP_HOST: 'smtp.hostinger.com',
      SMTP_PORT: '465',
      SMTP_USER: 'leads@example.test',
      SMTP_PASSWORD: 'smtp-test-value',
      LEAD_EMAIL_FROM: 'Leads <leads@example.test>',
    };
    mockSendMail.mockReset().mockResolvedValue({ messageId: 'test-message' });
    (nodemailer.createTransport as jest.Mock).mockClear();
  });

  afterEach(() => {
    process.env = originalEnv;
    global.fetch = originalFetch;
  });

  it('sends one email to both configured recipients and sets reply-to to the visitor', async () => {
    await expect(sendLeadEmail({ ...lead, email: 'visitor@example.test' })).resolves.toBe(true);

    expect(nodemailer.createTransport).toHaveBeenCalledWith(
      expect.objectContaining({
        host: 'smtp.hostinger.com',
        port: 465,
        secure: true,
        auth: { user: 'leads@example.test', pass: 'smtp-test-value' },
      }),
    );
    expect(mockSendMail).toHaveBeenCalledTimes(1);
    const message = mockSendMail.mock.calls[0][0];
    expect(message.to).toEqual(['mukundajmera94@gmail.com', 'ajmeramukund94@gmail.com']);
    expect(LEAD_RECIPIENTS).toEqual(message.to);
    expect(message.from).toBe('Leads <leads@example.test>');
    expect(message.replyTo).toBe('visitor@example.test');
    expect(message.text).toContain('Phone: 9876543210');
  });

  it('does not open an SMTP connection when email is not configured', async () => {
    delete process.env.SMTP_PASSWORD;
    await expect(sendLeadEmail(lead)).resolves.toBe(false);
    expect(nodemailer.createTransport).not.toHaveBeenCalled();
    expect(mockSendMail).not.toHaveBeenCalled();
  });

  it('returns false when the SMTP server rejects the message', async () => {
    mockSendMail.mockRejectedValueOnce(new Error('535 authentication failed'));
    await expect(sendLeadEmail(lead)).resolves.toBe(false);
  });
});

describe('verifyTurnstileToken', () => {
  const originalEnv = process.env;
  const originalFetch = global.fetch;

  beforeEach(() => {
    process.env = { ...originalEnv, TURNSTILE_SECRET_KEY: 'secret-test-value' };
  });

  afterEach(() => {
    process.env = originalEnv;
    global.fetch = originalFetch;
  });

  it('accepts a token that Cloudflare marks as successful', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({ success: true }) });
    await expect(verifyTurnstileToken('token-value')).resolves.toBe(true);
  });

  it('rejects a token that Cloudflare does not mark as successful', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({ success: false }) });
    await expect(verifyTurnstileToken('token-value')).resolves.toBe(false);
  });

  it('fails closed when the secret is missing', async () => {
    delete process.env.TURNSTILE_SECRET_KEY;
    global.fetch = jest.fn();
    await expect(verifyTurnstileToken('token-value')).resolves.toBe(false);
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
