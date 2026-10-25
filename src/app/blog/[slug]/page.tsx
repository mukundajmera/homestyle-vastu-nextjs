import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { blogPosts, getBlogPost } from '@/lib/blog-posts';
import { BRAND_NAME, PERSON_NAME, WHATSAPP_URL } from '@/lib/site';

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: 'Article not found' };

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: `${post.title} | ${BRAND_NAME}`, description: post.description, url: `/blog/${post.slug}`, type: 'article', publishedTime: post.publishedAt },
  };
}

function formatDate(isoDate: string) {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <article className="container mx-auto max-w-3xl px-4 py-16 md:py-24">
      <Link href="/blog" className="inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All articles
      </Link>
      <p className="mt-8 text-sm font-semibold text-terracotta-ink">
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> · {post.readMinutes} min read
      </p>
      <h1 className="mt-3 font-headline text-4xl font-semibold leading-tight md:text-5xl">{post.title}</h1>
      <p className="mt-5 text-lg leading-relaxed text-foreground/80">{post.description}</p>

      <div className="mt-10 space-y-10">
        {post.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="mb-4 font-headline text-2xl font-semibold">{section.heading}</h2>
            <div className="space-y-4 text-lg leading-relaxed text-foreground/85">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <aside className="paper-card mt-14 rounded-xl p-6">
        <h2 className="font-headline text-2xl font-semibold">Want guidance on your own property?</h2>
        <p className="mt-2 leading-relaxed text-foreground/80">
          Articles give general background only. {PERSON_NAME} reviews the actual site or floor plan before giving specific guidance.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild className="font-semibold">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />Chat on WhatsApp</a>
          </Button>
          <Button asChild variant="outline" className="font-semibold">
            <Link href="/contact">Send an inquiry</Link>
          </Button>
        </div>
      </aside>
    </article>
  );
}
