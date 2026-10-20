import { MetadataRoute } from 'next';
import { getSiteOrigin, isPublicProduction } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  if (!isPublicProduction()) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${getSiteOrigin()}/sitemap.xml`,
  };
}
