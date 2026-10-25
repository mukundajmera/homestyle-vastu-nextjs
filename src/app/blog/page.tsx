import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getBlogPosts } from '@/lib/blog-posts';
import { BRAND_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Vastu and Feng Shui Blog',
  description: `Practical Vastu Shastra and Feng Shui articles from ${BRAND_NAME} on plots, homes, entrances, kitchens and floor-plan reviews.`,
  alternates: { canonical: '/blog' },
};

function formatMonth(isoDate: string) {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-IN', { month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export default function BlogIndexPage() {
  const posts = getBlogPosts();
  return <main className="container mx-auto max-w-5xl px-4 py-12 sm:py-16 md:py-24">
    <p className="eyebrow mb-3">Blog</p>
    <h1 className="font-headline text-4xl font-semibold md:text-5xl">Vastu and Feng Shui notes</h1>
    <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/80">Practical guides on plots, entrances, kitchens and preparing a floor plan for discussion.</p>
    <ol aria-label="Blog articles by publication date" className="relative mt-12 space-y-10 before:absolute before:bottom-8 before:left-[9px] before:top-2 before:w-px before:bg-border md:space-y-14 md:before:left-1/2 md:before:-translate-x-1/2">
      {posts.map((post, index) => <li key={post.slug} className="relative grid grid-cols-[20px_minmax(0,1fr)] gap-x-4 md:grid-cols-[minmax(0,1fr)_36px_minmax(0,1fr)] md:gap-x-5">
        <span aria-hidden="true" className="absolute left-[4px] top-2 z-10 h-3 w-3 rounded-full border-2 border-background bg-primary md:static md:col-start-2 md:row-span-2 md:mx-auto" />
        <p className={`col-start-2 row-start-1 mb-3 text-sm font-semibold text-terracotta-ink ${index % 2 === 0 ? 'md:col-start-1 md:text-right' : 'md:col-start-3 md:text-left'}`}>
          <time dateTime={post.publishedAt}>{formatMonth(post.publishedAt)}</time>
        </p>
        <article className={`paper-card col-start-2 row-start-2 overflow-hidden rounded-xl border border-border md:row-start-2 ${index % 2 === 0 ? 'md:col-start-1' : 'md:col-start-3'}`}>
          <Link href={`/blog/${post.slug}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring" aria-label={`Read ${post.title}`}>
            <Image src={post.image} alt={post.imageAlt} width={1440} height={900} sizes="(min-width: 768px) 42vw, 100vw" className="h-auto w-full border-b border-border" />
          </Link>
          <div className="p-5 sm:p-6">
            <p className="text-sm font-semibold text-terracotta-ink">{post.readMinutes} min read</p>
            <h2 className="mt-2 font-headline text-2xl font-semibold leading-snug"><Link href={`/blog/${post.slug}`} className="rounded-sm hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{post.title}</Link></h2>
            <p className="mt-3 leading-relaxed text-foreground/80">{post.description}</p>
            <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-primary hover:underline">Read the guide <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </article>
      </li>)}
    </ol>
  </main>;
}
