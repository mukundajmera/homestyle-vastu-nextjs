import { visibleTestimonials } from '@/lib/testimonials';

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

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
            <li key={testimonial.name} className="paper-card flex flex-col gap-5 p-8">
              <blockquote className="text-lg leading-8 text-foreground/85">
                <p>&ldquo;{testimonial.quote}&rdquo;</p>
              </blockquote>
              <div className="mt-auto flex items-center gap-4">
                <div aria-hidden="true" className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-accent/50 bg-secondary font-headline text-lg font-semibold text-primary">
                  {initials(testimonial.name)}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="block font-semibold text-foreground">{testimonial.name}</span>
                  {testimonial.place} &middot; {testimonial.service}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
