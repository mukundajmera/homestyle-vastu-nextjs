import { TESTIMONIALS, SHOW_PLACEHOLDER_TESTIMONIALS, visibleTestimonials } from '@/lib/testimonials';

describe('testimonials visibility', () => {
  it('shows placeholder testimonials with their label', () => {
    expect(SHOW_PLACEHOLDER_TESTIMONIALS).toBe(true);
    expect(visibleTestimonials()).toEqual(TESTIMONIALS);
  });

  it('marks every current testimonial as a placeholder with a visible label', () => {
    expect(TESTIMONIALS.length).toBeGreaterThan(0);
    TESTIMONIALS.forEach((testimonial) => {
      expect(testimonial.placeholder).toBe(true);
      expect(testimonial.quote.startsWith('[PLACEHOLDER]')).toBe(true);
    });
  });
});
