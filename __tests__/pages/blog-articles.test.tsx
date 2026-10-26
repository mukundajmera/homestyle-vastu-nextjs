import { fireEvent, render, screen, within } from '@testing-library/react';
import { BlogArticle } from '@/components/blog/blog-article';
import { blogPosts } from '@/lib/blog-posts';
import BlogPostPage, { generateMetadata } from '@/app/blog/[slug]/page';

jest.mock('next/image', () => ({ __esModule: true, default: ({ priority: _priority, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean }) => <img {...props} /> }));

describe('blog article guides', () => {
  it.each(blogPosts)('$slug renders the article structure and tool', (post) => {
    render(<BlogArticle post={post} />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('img', { name: post.imageAlt })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /frequently asked questions/i })).toBeInTheDocument();
    expect(screen.getAllByRole('definition')).toHaveLength(3);
    expect(screen.getByRole('link', { name: /share your layout or plot plan on whatsapp/i })).toHaveAttribute('href', 'https://wa.me/919828088678');
    const toolHeadings = ['Which tradition question should I ask first?', 'Plot visit readiness check', 'Main entrance direction explorer', 'Online Vastu plan readiness check'];
    expect(screen.getByRole('heading', { name: toolHeadings[['compare', 'plot-checklist', 'entrance-explorer', 'plan-check'].indexOf(post.tool)] })).toBeInTheDocument();
  });

  it('compares tradition-specific questions and updates the preparation output', () => {
    render(<BlogArticle post={blogPosts[0]} />);
    fireEvent.click(screen.getByRole('button', { name: 'Kitchen' }));
    expect(screen.getByText(/Vastu discussion may review the kitchen location/i)).toBeInTheDocument();
    expect(screen.getByText(/Feng Shui discussion may review the kitchen as part/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Where are the cooktop, sink, ventilation/i).length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole('checkbox', { name: 'Kitchen' }));
    expect(screen.getAllByRole('listitem').some((item) => /Kitchen:.*Where are the cooktop, sink/i.test(item.textContent ?? ''))).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: 'Mirrors' }));
    expect(screen.getByText(/what a mirror reflects/i)).toBeInTheDocument();
  });

  it('updates plot readiness and encodes checked and unresolved questions for WhatsApp', () => {
    render(<BlogArticle post={blogPosts[1]} />);
    fireEvent.click(screen.getByRole('checkbox', { name: /title and ownership records/i }));
    expect(screen.getByText('1 of 10 items verified')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /readiness summary: 10%/i })).toBeInTheDocument();
    expect(screen.getByText(/9 questions remain/i)).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /share readiness notes on whatsapp/i });
    const href = link.getAttribute('href') as string;
    expect(href).toContain(encodeURIComponent('Title and ownership records reviewed by a property lawyer'));
    expect(decodeURIComponent(href)).toContain('Still to ask or confirm:');
    expect(decodeURIComponent(href)).toContain('Surveyed boundary points compared with the documents');
  });

  it('shows direction-specific entrance notes, measurements and consultant questions', () => {
    render(<BlogArticle post={blogPosts[2]} />);
    fireEvent.click(screen.getByRole('button', { name: 'SE' }));
    expect(screen.getByText(/SE road-facing wall: traditional discussion/i)).toBeInTheDocument();
    expect(screen.getByText(/how their method divides and reads that wall/i)).toBeInTheDocument();
    expect(screen.getByText(/Wall length, door width, corner offsets/i)).toBeInTheDocument();
    expect(screen.getByText(/How do you define and measure the pada/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'NW' }));
    expect(screen.getByText(/NW road-facing wall/i)).toBeInTheDocument();
  });

  it('scores plan readiness, updates missing items, and copies a shareable checklist', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    render(<BlogArticle post={blogPosts[3]} />);
    const dimension = screen.getAllByText(/Outside dimensions and room measurements/i)[0];
    const fieldset = dimension.closest('fieldset') as HTMLElement;
    fireEvent.click(within(fieldset).getByRole('button', { name: 'Yes' }));
    expect(screen.getByRole('heading', { name: /plan readiness: 1 of 8 details confirmed \(13%\)/i })).toBeInTheDocument();
    const summary = screen.getByRole('heading', { name: /plan readiness:/i }).parentElement as HTMLElement;
    expect(within(summary).queryByText('Outside dimensions and room measurements are shown with units')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Copy plan checklist' }));
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining('[x] Outside dimensions and room measurements are shown with units'));
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining('[ ] North is marked and its source or uncertainty is noted'));
    expect(await screen.findByText('Checklist copied.')).toBeInTheDocument();
  });

  it('emits page keywords and Open Graph article tags and publish time', async () => {
    const post = blogPosts[3];
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: post.slug }) });
    expect(metadata.keywords).toEqual(post.keywords);
    expect(metadata.openGraph).toMatchObject({ type: 'article', publishedTime: post.publishedAt, tags: post.keywords });
  });

  it('keeps Article and FAQPage JSON-LD on each article route', async () => {
    const post = blogPosts[0];
    const page = await BlogPostPage({ params: Promise.resolve({ slug: post.slug }) });
    const { container } = render(page);
    const schemas = [...container.querySelectorAll('script[type="application/ld+json"]')]
      .map((script) => JSON.parse(script.textContent ?? '{}') as { '@type': string; keywords?: string });
    expect(schemas.map(({ '@type': type }) => type)).toEqual(['Article', 'FAQPage', 'BreadcrumbList']);
    expect(schemas[0].keywords).toContain(post.keywords[0]);
  });
});
