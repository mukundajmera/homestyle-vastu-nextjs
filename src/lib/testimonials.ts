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
 * Placeholder testimonials are shown with a visible [PLACEHOLDER] label, so visitors can see they are not real client reviews.
 * Replace each entry with a real testimonial, then remove the label and set placeholder to false.
 */
export const SHOW_PLACEHOLDER_TESTIMONIALS = true;

export function visibleTestimonials(): Testimonial[] {
  return TESTIMONIALS.filter((testimonial) => !testimonial.placeholder || SHOW_PLACEHOLDER_TESTIMONIALS);
}
