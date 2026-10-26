import { SITE_ORIGIN } from '@/lib/site';

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

type VerifyOptions = {
  // The action name the widget was rendered with. A token minted for another form is rejected.
  action?: string;
};

/**
 * Checks a Cloudflare Turnstile token on the server. Returns false when the secret is missing,
 * the token is rejected, the token was issued for another hostname or action, or Cloudflare
 * cannot be reached, so the form fails closed.
 */
export async function verifyTurnstileToken(token: string, options: VerifyOptions = {}): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false;

  // Only accept tokens solved on our own site, so a solver running on another site cannot feed us tokens.
  const expectedHostname = process.env.TURNSTILE_HOSTNAME || new URL(SITE_ORIGIN).hostname;

  try {
    const response = await fetch(SITEVERIFY_URL, {
      method: 'POST',
      body: new URLSearchParams({ secret, response: token }),
      signal: AbortSignal.timeout(8_000),
    });
    const result = (await response.json()) as { success?: boolean; hostname?: string; action?: string };
    if (result.success !== true) return false;
    if (result.hostname !== expectedHostname) return false;
    if (options.action !== undefined && result.action !== options.action) return false;
    return true;
  } catch {
    return false;
  }
}
