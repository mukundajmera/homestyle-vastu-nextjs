import { blogPosts, getBlogPost, getBlogPosts } from '@/lib/blog-posts';

describe('blog posts', () => {
  it('publishes at least three articles with unique slugs', () => {
    expect(blogPosts.length).toBeGreaterThanOrEqual(3);
    expect(new Set(blogPosts.map((post) => post.slug)).size).toBe(blogPosts.length);
  });

  it('gives every article a valid date, a short description and at least one section', () => {
    for (const post of blogPosts) {
      expect(post.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(post.description.length).toBeLessThanOrEqual(160);
      expect(post.sections.length).toBeGreaterThan(0);
      expect(post.keywords.length).toBeGreaterThanOrEqual(6);
      expect(post.keywords.length).toBeLessThanOrEqual(10);
      post.sections.forEach((section) => expect(section.paragraphs.length).toBeGreaterThan(0));
    }
  });

  it('uses the requested fortnightly publication schedule', () => {
    expect(Object.fromEntries(blogPosts.map(({ slug, publishedAt }) => [slug, publishedAt]))).toEqual({
      'vastu-and-feng-shui-compared': '2026-09-01',
      'plot-selection-checklist': '2026-09-15',
      'entrance-and-kitchen-basics': '2026-09-29',
      'preparing-floor-plan-for-online-review': '2026-10-13',
    });
  });

  it('lists the newest article first and finds articles by slug', () => {
    const dates = getBlogPosts().map((post) => post.publishedAt);
    expect(dates).toEqual([...dates].sort().reverse());
    expect(getBlogPost(blogPosts[0].slug)).toBe(blogPosts[0]);
    expect(getBlogPost('does-not-exist')).toBeUndefined();
  });
});
