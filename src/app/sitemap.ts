import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blog-posts';
import { SITE_ORIGIN } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/services', '/blog', '/about', '/contact', '/privacy', '/terms', ...blogPosts.map((post) => `/blog/${post.slug}`)].map((route) => ({
    url: `${SITE_ORIGIN}${route}`,
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes];
}
