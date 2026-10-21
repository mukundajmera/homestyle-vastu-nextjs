import { MetadataRoute } from 'next';
import { getSiteOrigin, isPublicProduction } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_SITE_ENV === 'preview') {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
      },
    };
  }

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
