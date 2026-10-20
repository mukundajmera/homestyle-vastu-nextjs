import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === 'production';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';

  if (!isProduction) {
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
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
