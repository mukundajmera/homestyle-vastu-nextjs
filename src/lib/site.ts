export function isPublicProduction(): boolean {
  return process.env.NEXT_PUBLIC_SITE_ENV === 'production';
}

export function getSiteOrigin(): string {
  const fallbackOrigin = isPublicProduction()
    ? 'https://www.fengshuihomestylevastu.com'
    : 'http://localhost:9002';
  const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configuredOrigin) return fallbackOrigin;

  let parsed: URL;
  try {
    parsed = new URL(configuredOrigin);
  } catch {
    throw new Error('NEXT_PUBLIC_SITE_URL must be a valid website origin.');
  }

  if (
    !['http:', 'https:'].includes(parsed.protocol) ||
    parsed.username !== '' ||
    parsed.password !== '' ||
    parsed.pathname !== '/' ||
    parsed.search !== '' ||
    parsed.hash !== ''
  ) {
    throw new Error('NEXT_PUBLIC_SITE_URL must be an HTTP or HTTPS origin without a path.');
  }

  return parsed.origin;
}
