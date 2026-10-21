import sitemap from '@/app/sitemap';
import robots from '@/app/robots';
import type { MetadataRoute } from 'next';

describe('metadata', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('sitemap', () => {
    it('returns empty array when not in production', () => {
      process.env.NEXT_PUBLIC_SITE_ENV = 'development';
      expect(sitemap()).toEqual([]);
    });

    it('returns routes when in production', () => {
      process.env.NEXT_PUBLIC_SITE_ENV = 'production';
      const result = sitemap();
      expect(result.length).toBe(5);
      expect(result.map(r => r.url)).toEqual([
        'https://www.fengshuihomestylevastu.com',
        'https://www.fengshuihomestylevastu.com/services',
        'https://www.fengshuihomestylevastu.com/about',
        'https://www.fengshuihomestylevastu.com/contact',
        'https://www.fengshuihomestylevastu.com/privacy',
      ]);
    });

    it('uses the configured origin for a preview deployment', () => {
      process.env.NEXT_PUBLIC_SITE_ENV = 'preview';
      process.env.NEXT_PUBLIC_SITE_URL = 'https://preview.example.test/';
      expect(sitemap()).toEqual([]);
    });
  });

  describe('robots', () => {
    it('disallows all in local development', () => {
      process.env.NEXT_PUBLIC_SITE_ENV = 'development';
      const result: MetadataRoute.Robots = robots();
      expect(result.rules).toEqual({ userAgent: '*', disallow: '/' });
      expect(result.sitemap).toBeUndefined();
    });

    it('allows all and sets sitemap when in production', () => {
      process.env.NEXT_PUBLIC_SITE_ENV = 'production';
      const result: MetadataRoute.Robots = robots();
      expect(result.rules).toEqual({ userAgent: '*', allow: '/' });
      expect(result.sitemap).toBe('https://www.fengshuihomestylevastu.com/sitemap.xml');
    });

    it('uses the configured origin in robots for a production site', () => {
      process.env.NEXT_PUBLIC_SITE_ENV = 'production';
      process.env.NEXT_PUBLIC_SITE_URL = 'https://preview.example.test/';
      const result: MetadataRoute.Robots = robots();
      expect(result.sitemap).toBe('https://preview.example.test/sitemap.xml');
    });
  });
});
