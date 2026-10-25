import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getBlogPosts } from '@/lib/blog-posts';
import { BRAND_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Vastu and Feng Shui Blog',
  description: `Practical Vastu Shastra and Feng Shui articles from ${BRAND_NAME} on plots, homes, entrances, kitchens and floor-plan reviews.`,
  alternates: { canonical: '/blog' },
};

function formatDate(isoDate: string) {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export default function BlogIndexPage() {
  const posts = getBlogPosts();

  return (
    <div className="container mx-auto max-w-5xl px-4 py-16 md:py-24">
      <p className="eyebrow mb-3">Blog</p>
      <h1 className="font-headline text-4xl font-semibold md:text-5xl">Vastu and Feng Shui notes</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/80">
        Short, practical articles on the traditional guidance we are asked about most: plots, entrances, kitchens and preparing a floor plan for review.
      </p>

      <ul className="mt-12 grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <li key={post.slug}>
            <article className="paper-card flex h-full flex-col rounded-xl p-6">
              <p className="text-sm font-semibold text-terracotta-ink">
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> · {post.readMinutes} min read
              </p>
              <h2 className="mt-3 font-headline text-2xl font-semibold leading-snug">
                <Link href={`/blog/${post.slug}`} className="rounded-sm hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 flex-1 leading-relaxed text-foreground/80">{post.description}</p>
              <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex items-center gap-2 font-semibold text-primary hover:underline">
                Read the article <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
