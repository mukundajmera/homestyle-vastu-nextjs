import { TESTIMONIALS, SHOW_PLACEHOLDER_TESTIMONIALS, visibleTestimonials } from '@/lib/testimonials';

describe('testimonials visibility', () => {
  it('hides placeholder testimonials on the public site', () => {
    expect(SHOW_PLACEHOLDER_TESTIMONIALS).toBe(false);
    expect(visibleTestimonials()).toEqual([]);
  });

  it('marks every current testimonial as a placeholder', () => {
    expect(TESTIMONIALS.length).toBeGreaterThan(0);
    TESTIMONIALS.forEach((testimonial) => {
      expect(testimonial.placeholder).toBe(true);
      expect(testimonial.quote.startsWith('[PLACEHOLDER]')).toBe(true);
    });
  });
});
