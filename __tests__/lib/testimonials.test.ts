import { TESTIMONIALS, SHOW_PLACEHOLDER_TESTIMONIALS, visibleTestimonials } from '@/lib/testimonials';

describe('testimonials visibility', () => {
  it('hides placeholder testimonials on the public site', () => {
    expect(SHOW_PLACEHOLDER_TESTIMONIALS).toBe(false);
    expect(visibleTestimonials()).toEqual([]);
  });

  it('keeps every unverified testimonial marked as a placeholder', () => {
    TESTIMONIALS.forEach((testimonial) => {
      expect(testimonial.placeholder).toBe(true);
    });
  });
});
