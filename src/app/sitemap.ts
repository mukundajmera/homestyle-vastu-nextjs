import { MetadataRoute } from 'next';
import { getSiteOrigin, isPublicProduction } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isPublicProduction()) return [];

  const routes = ['', '/services', '/about', '/contact', '/privacy'].map((route) => ({
    url: `${getSiteOrigin()}${route}`,
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes];
}
