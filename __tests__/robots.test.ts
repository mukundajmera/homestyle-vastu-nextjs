import robots from '@/app/robots';
import { SITE_ORIGIN } from '@/lib/site';

describe('robots metadata', () => {
  const userAgents = [
    'Googlebot',
    'Bingbot',
    'Google-Extended',
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'Claude-SearchBot',
    'Claude-User',
    'PerplexityBot',
    'Applebot-Extended',
    'CCBot',
  ];

  it('allows all crawlers by default', () => {
    expect(robots().rules).toContainEqual({ userAgent: '*', allow: '/' });
  });

  it.each(userAgents)('allows %s', (userAgent) => {
    expect(robots().rules).toContainEqual({ userAgent, allow: '/' });
  });

  it('publishes the public sitemap and host', () => {
    expect(robots()).toMatchObject({
      sitemap: `${SITE_ORIGIN}/sitemap.xml`,
      host: new URL(SITE_ORIGIN).host,
    });
  });
});
