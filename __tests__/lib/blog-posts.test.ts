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
      post.sections.forEach((section) => expect(section.paragraphs.length).toBeGreaterThan(0));
    }
  });

  it('lists the newest article first and finds articles by slug', () => {
    const dates = getBlogPosts().map((post) => post.publishedAt);
    expect(dates).toEqual([...dates].sort().reverse());
    expect(getBlogPost(blogPosts[0].slug)).toBe(blogPosts[0]);
    expect(getBlogPost('does-not-exist')).toBeUndefined();
  });
});
