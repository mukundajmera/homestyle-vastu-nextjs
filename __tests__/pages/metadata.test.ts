import type { MetadataRoute } from 'next';
import { metadata } from '@/app/layout';
import robots from '@/app/robots';
import sitemap from '@/app/sitemap';
import { SITE_ORIGIN } from '@/lib/site';

describe('metadata', () => {
  describe('sitemap', () => {
  it('always returns all public routes at SITE_ORIGIN', () => {
      expect(sitemap().map((route) => route.url)).toEqual([
        SITE_ORIGIN,
        `${SITE_ORIGIN}/services`,
        `${SITE_ORIGIN}/about`,
        `${SITE_ORIGIN}/contact`,
        `${SITE_ORIGIN}/privacy`,
    ]);
    expect(sitemap().some(({ url }) => url.endsWith('/llms.txt'))).toBe(false);
    });
  });

  describe('robots', () => {
    it('allows all and sets the SITE_ORIGIN sitemap', () => {
      const result: MetadataRoute.Robots = robots();
      expect(result.rules).toContainEqual({ userAgent: '*', allow: '/' });
      expect(JSON.stringify(result.rules)).not.toContain('"disallow"');
      expect(result.sitemap).toBe(`${SITE_ORIGIN}/sitemap.xml`);
    });
  });

  it('sets the public origin and allows indexing', () => {
    expect(metadata.metadataBase).toEqual(new URL(SITE_ORIGIN));
    expect(metadata.alternates?.canonical).toBe(SITE_ORIGIN);
    expect(metadata.openGraph?.url).toBe(SITE_ORIGIN);
    expect(metadata.robots).toMatchObject({
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    });
  });
});
