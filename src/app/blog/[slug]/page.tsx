import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogArticle } from '@/components/blog/blog-article';
import { blogPosts, getBlogPost } from '@/lib/blog-posts';
import { BRAND_NAME, PERSON_NAME, SITE_ORIGIN } from '@/lib/site';

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: 'Article not found' };
  const url = `${SITE_ORIGIN}/blog/${post.slug}`;
  const image = `${SITE_ORIGIN}${post.image}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.description, url, type: 'article', publishedTime: post.publishedAt, tags: post.keywords, images: [{ url: image, alt: post.imageAlt }] },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description, images: [{ url: image, alt: post.imageAlt }] }
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const url = `${SITE_ORIGIN}/blog/${post.slug}`;
  const image = `${SITE_ORIGIN}${post.image}`;
  const jsonLd = [
    {
      '@context': 'https://schema.org', '@type': 'Article', headline: post.title, description: post.description, keywords: post.keywords.join(', '),
      image, datePublished: post.publishedAt, dateModified: post.publishedAt,
      author: { '@type': 'Person', name: PERSON_NAME, url: `${SITE_ORIGIN}/about` },
      publisher: { '@type': 'Organization', name: BRAND_NAME, url: SITE_ORIGIN }, mainEntityOfPage: url
    },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: post.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_ORIGIN },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_ORIGIN}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url }
    ] }
  ];
  return <>
    {jsonLd.map((data) => <script key={data['@type']} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />)}
    <BlogArticle post={post} />
  </>;
}
