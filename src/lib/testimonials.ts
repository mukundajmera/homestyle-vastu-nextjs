export type Testimonial = {
  name: string;
  place: string;
  service: string;
  quote: string;
  /** Placeholder entries are not genuine client words. They must be replaced before they are shown publicly. */
  placeholder: boolean;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Priya Sharma',
    place: 'Jaipur',
    service: 'Residential Vastu consultation',
    quote: '[PLACEHOLDER] The consultation was clear and practical, and the suggestions for our home were easy to follow.',
    placeholder: true,
  },
  {
    name: 'Rakesh Agarwal',
    place: 'Jaipur',
    service: 'Plot and land selection',
    quote: '[PLACEHOLDER] The guidance on the plot helped us understand the points to consider before we decided.',
    placeholder: true,
  },
  {
    name: 'Anjali Mehta',
    place: 'Jaipur',
    service: 'Online floor-plan review',
    quote: '[PLACEHOLDER] The online floor-plan review was thorough, and the remedies suggested were simple to apply.',
    placeholder: true,
  },
];

/**
 * Keep false on the public site. Placeholder testimonials are fabricated and must not be shown to visitors as real client reviews.
 * Set to true only on a non-public review build, and only until real client testimonials replace the placeholders.
 */
export const SHOW_PLACEHOLDER_TESTIMONIALS = false;

export function visibleTestimonials(): Testimonial[] {
  return TESTIMONIALS.filter((testimonial) => !testimonial.placeholder || SHOW_PLACEHOLDER_TESTIMONIALS);
}
