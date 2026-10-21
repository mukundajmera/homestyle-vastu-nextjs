import robots from '@/app/robots';

const originalSiteEnv = process.env.NEXT_PUBLIC_SITE_ENV;
const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

afterEach(() => {
  if (originalSiteEnv === undefined) delete process.env.NEXT_PUBLIC_SITE_ENV;
  else process.env.NEXT_PUBLIC_SITE_ENV = originalSiteEnv;

  if (originalSiteUrl === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
  else process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
});

describe('robots metadata', () => {
  it('allows preview crawlers to read the noindex metadata without publishing a sitemap', () => {
    process.env.NEXT_PUBLIC_SITE_ENV = 'preview';
    process.env.NEXT_PUBLIC_SITE_URL = 'https://lightskyblue-quetzal-346016.hostingersite.com';

    const result = robots();

    expect(result.rules).toMatchObject({ userAgent: '*', allow: '/' });
    expect(result.sitemap).toBeUndefined();
  });

  it('publishes the sitemap only for the production environment', () => {
    process.env.NEXT_PUBLIC_SITE_ENV = 'production';
    process.env.NEXT_PUBLIC_SITE_URL = 'https://www.fengshuihomestylevastu.com';

    const result = robots();

    expect(result.rules).toMatchObject({ userAgent: '*', allow: '/' });
    expect(result.sitemap).toBe('https://www.fengshuihomestylevastu.com/sitemap.xml');
  });
});
