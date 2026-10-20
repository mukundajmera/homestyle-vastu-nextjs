import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.homestylevastu.com';
  const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === 'production';

  if (!isProduction) return [];

  const routes = ['', '/services', '/about', '/contact', '/privacy'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes];
}
