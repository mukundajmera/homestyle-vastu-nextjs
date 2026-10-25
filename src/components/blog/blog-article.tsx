import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { blogPosts, type BlogPost } from '@/lib/blog-posts';
import { BRAND_NAME, PERSON_NAME, PERSON_TITLE, WHATSAPP_URL } from '@/lib/site';
import { CompareTool, EntranceExplorerTool, PlanReadinessTool, PlotChecklistTool } from './interactive-tools';

const tools = {
  compare: CompareTool,
  'plot-checklist': PlotChecklistTool,
  'entrance-explorer': EntranceExplorerTool,
  'plan-check': PlanReadinessTool
};

function formatDate(isoDate: string) {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export function BlogArticle({ post }: { post: BlogPost }) {
  const Tool = tools[post.tool];
  return <article className="container mx-auto max-w-3xl px-4 py-12 sm:py-16 md:py-24">
    <nav aria-label="Breadcrumb" className="text-sm"><ol className="flex flex-wrap items-center gap-2"><li><Link className="text-primary underline-offset-4 hover:underline" href="/">Home</Link></li><li aria-hidden="true">/</li><li><Link className="text-primary underline-offset-4 hover:underline" href="/blog">Blog</Link></li><li aria-hidden="true">/</li><li aria-current="page">{post.title}</li></ol></nav>
    <p className="mt-8 text-sm font-semibold text-terracotta-ink"><time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> · {post.readMinutes} min read</p>
    <h1 className="mt-3 font-headline text-4xl font-semibold leading-tight md:text-5xl">{post.title}</h1>
    <figure className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
      <Image src={post.image} alt={post.imageAlt} width={1440} height={900} sizes="(min-width: 768px) 768px, 100vw" priority className="h-auto w-full" />
      <figcaption className="px-4 py-3 text-sm text-muted-foreground">A measured drawing is a useful starting point for a property discussion.</figcaption>
    </figure>
    <p className="mt-5 text-lg leading-relaxed text-foreground/80">{post.description}</p>
    <div className="mt-8 flex items-center gap-4 border-y border-border py-5">
      <Image src="/brand/sanjay-avatar-v3.jpg" alt={`${PERSON_NAME}, ${PERSON_TITLE}`} width={56} height={56} className="h-14 w-14 rounded-full border border-accent/40 object-cover object-top" />
      <div className="text-sm leading-6"><p className="font-semibold">{PERSON_NAME}</p><p className="text-muted-foreground">{PERSON_TITLE}, {BRAND_NAME}</p></div>
    </div>
    <div className="mt-9 space-y-10">{post.sections.map((section) => <section key={section.heading}>
      <h2 className="mb-4 font-headline text-2xl font-semibold">{section.heading}</h2>
      <div className="space-y-4 text-lg leading-relaxed text-foreground/85">{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
    </section>)}</div>
    <Tool />
    <section aria-labelledby="faq-heading" className="mt-12 border-t border-border pt-8">
      <h2 id="faq-heading" className="font-headline text-2xl font-semibold">Frequently asked questions</h2>
      <dl className="mt-5 space-y-6">{post.faqs.map((faq) => <div key={faq.question}><dt className="font-semibold">{faq.question}</dt><dd className="mt-2 leading-relaxed text-foreground/85">{faq.answer}</dd></div>)}</dl>
    </section>
    <nav aria-label="Related articles and services" className="mt-12 border-t border-border pt-8">
      <h2 className="mb-4 font-headline text-2xl font-semibold">Explore more</h2>
      <ul className="grid gap-3 sm:grid-cols-2">{blogPosts.filter((item) => item.slug !== post.slug).map((item) => <li key={item.slug}><Link href={`/blog/${item.slug}`} className="font-semibold text-primary underline-offset-4 hover:underline">{item.title}</Link></li>)}
        <li><Link href="/services" className="font-semibold text-primary underline-offset-4 hover:underline">Consultation services</Link></li>
        <li><Link href="/about" className="font-semibold text-primary underline-offset-4 hover:underline">About Sanjay Jain</Link></li>
        <li><Link href="/contact" className="font-semibold text-primary underline-offset-4 hover:underline">Contact</Link></li></ul>
    </nav>
    <aside className="paper-card mt-10 rounded-xl border border-border p-6">
      <h2 className="font-headline text-2xl font-semibold">Discuss your plan</h2>
      <p className="mt-2 leading-relaxed">Share a clear layout or plot plan along with your questions.</p>
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center rounded bg-primary px-4 py-2 font-semibold text-primary-foreground hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />Share your layout or plot plan on WhatsApp.</a>
    </aside>
  </article>;
}
