import { MetadataRoute } from 'next';
import { SITE_ORIGIN } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/services', '/about', '/contact', '/privacy'].map((route) => ({
    url: `${SITE_ORIGIN}${route}`,
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes];
}
