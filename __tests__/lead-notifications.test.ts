import { LEAD_RECIPIENTS, sendLeadEmail } from '@/lib/lead-notifications';
import { verifyTurnstileToken } from '@/lib/turnstile';

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
    process.env = { ...originalEnv, RESEND_API_KEY: 're_test_key', LEAD_EMAIL_FROM: 'Leads <leads@example.test>' };
    global.fetch = jest.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({}) });
  });

  afterEach(() => {
    process.env = originalEnv;
    global.fetch = originalFetch;
  });

  it('sends one email per configured recipient and sets reply-to to the visitor', async () => {
    await expect(sendLeadEmail({ ...lead, email: 'visitor@example.test' })).resolves.toBe(true);

    const calls = (global.fetch as jest.Mock).mock.calls;
    expect(calls).toHaveLength(LEAD_RECIPIENTS.length);
    const bodies = calls.map(([url, init]) => {
      expect(url).toBe('https://api.resend.com/emails');
      return JSON.parse(init.body);
    });
    expect(bodies.map((body) => body.to[0])).toEqual([...LEAD_RECIPIENTS]);
    bodies.forEach((body) => {
      expect(body.from).toBe('Leads <leads@example.test>');
      expect(body.reply_to).toBe('visitor@example.test');
      expect(body.text).toContain('Phone: 9876543210');
    });
  });

  it('still reports success when only one recipient is accepted', async () => {
    global.fetch = jest.fn()
      .mockResolvedValueOnce({ ok: false, status: 403, json: async () => ({}) })
      .mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({}) });
    await expect(sendLeadEmail(lead)).resolves.toBe(true);
  });

  it('does not call Resend when email is not configured', async () => {
    delete process.env.RESEND_API_KEY;
    await expect(sendLeadEmail(lead)).resolves.toBe(false);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('returns false when Resend rejects the request', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 422, json: async () => ({}) });
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
