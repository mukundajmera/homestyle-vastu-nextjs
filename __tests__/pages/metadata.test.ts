import sitemap from '@/app/sitemap';
import robots from '@/app/robots';

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
      process.env.NEXT_PUBLIC_SITE_URL = 'https://www.homestylevastu.com';
      const result = sitemap();
      expect(result.length).toBe(5);
      expect(result.map(r => r.url)).toEqual([
        'https://www.homestylevastu.com',
        'https://www.homestylevastu.com/services',
        'https://www.homestylevastu.com/about',
        'https://www.homestylevastu.com/contact',
        'https://www.homestylevastu.com/privacy',
      ]);
    });
  });

  describe('robots', () => {
    it('disallows all when not in production', () => {
      process.env.NEXT_PUBLIC_SITE_ENV = 'development';
      const result = robots();
      expect(result.rules).toEqual({ userAgent: '*', disallow: '/' });
      expect((result as any).sitemap).toBeUndefined();
    });

    it('allows all and sets sitemap when in production', () => {
      process.env.NEXT_PUBLIC_SITE_ENV = 'production';
      process.env.NEXT_PUBLIC_SITE_URL = 'https://www.homestylevastu.com';
      const result = robots();
      expect(result.rules).toEqual({ userAgent: '*', allow: '/' });
      expect((result as any).sitemap).toBe('https://www.homestylevastu.com/sitemap.xml');
    });
  });
});
