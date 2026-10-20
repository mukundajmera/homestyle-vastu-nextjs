import { metadata as homeMetadata } from '@/app/page';
import { metadata as servicesMetadata } from '@/app/services/page';
import { metadata as aboutMetadata } from '@/app/about/page';
import { metadata as contactMetadata } from '@/app/contact/page';
import robots from '@/app/robots';
import sitemap from '@/app/sitemap';

describe('public route metadata', () => {
  it('uses a distinct canonical and Open Graph URL for each route', () => {
    const routes = [
      [homeMetadata, '/'],
      [servicesMetadata, '/services'],
      [aboutMetadata, '/about'],
      [contactMetadata, '/contact'],
    ] as const;

    for (const [routeMetadata, path] of routes) {
      expect(routeMetadata.alternates?.canonical).toBe(path);
      expect((routeMetadata.openGraph as { url?: string } | undefined)?.url).toBe(path);
      expect((routeMetadata.twitter as { card?: string } | undefined)?.card).toBe('summary_large_image');
    }
  });

  it('keeps route descriptions free of unverified credential and coverage claims', () => {
    const descriptions = [
      homeMetadata.description,
      servicesMetadata.description,
      aboutMetadata.description,
      contactMetadata.description,
    ].join(' ');

    expect(descriptions).not.toMatch(/expert|worldwide|service area|based in Jaipur/i);
  });
});

describe('robots and sitemap', () => {
  it('points robots to the canonical sitemap without a nonexistent exclusion', () => {
    const result = robots();
    expect(result.sitemap).toBe('https://www.fengshuihomestylevastu.com/sitemap.xml');
    expect(JSON.stringify(result)).not.toContain('/private/');
  });

  it('lists the four public routes on the canonical domain', () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toEqual([
      'https://www.fengshuihomestylevastu.com',
      'https://www.fengshuihomestylevastu.com/services',
      'https://www.fengshuihomestylevastu.com/about',
      'https://www.fengshuihomestylevastu.com/contact',
    ]);
  });
});
