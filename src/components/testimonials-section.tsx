import { visibleTestimonials } from '@/lib/testimonials';

export function TestimonialsSection() {
  const testimonials = visibleTestimonials();

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-border py-16 md:py-24" aria-labelledby="testimonials-heading">
      <div className="container mx-auto px-4">
        <p className="eyebrow mb-3">Client words</p>
        <h2 id="testimonials-heading" className="mb-10 font-headline text-3xl font-semibold md:text-4xl">What clients say</h2>
        <ul className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <li key={testimonial.name} className="paper-card flex flex-col gap-4 p-8">
              <blockquote className="text-lg leading-8 text-foreground/85">
                <p>&ldquo;{testimonial.quote}&rdquo;</p>
              </blockquote>
              <p className="mt-auto text-sm text-muted-foreground">
                <span className="block font-semibold text-foreground">{testimonial.name}</span>
                {testimonial.place} &middot; {testimonial.service}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
