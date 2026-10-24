import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Building2, Factory, Globe, Home, MapPin, MessageCircle, PencilRuler, Ruler } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Vastu & Feng Shui Services in Jaipur',
  description: 'Vastu Shastra and Feng Shui consultations in Jaipur for homes, businesses, plots, construction, industrial properties and online floor-plan reviews.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Consultation Services | Homestyle Vastu',
    description: 'Explore Vastu and Feng Shui guidance for homes and businesses, plot selection, construction or renovation, industrial and factory properties, and online floor-plan review.',
    url: '/services',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Consultation Services | Homestyle Vastu',
    description: 'Explore Vastu and Feng Shui guidance for homes and businesses, plot selection, construction or renovation, industrial and factory properties, and online floor-plan review.',
  },
};

const services = [
  {
    id: 'residential',
    icon: Home,
    title: 'Residential Vastu & Feng Shui',
    lead: 'Guidance for homes, apartments and residential plots.',
    text: 'Discuss Vastu and Feng Shui questions about where you live. Share the kind of guidance you are looking for and ask which consultation format may suit your property.',
  },
  {
    id: 'commercial',
    icon: Building2,
    title: 'Commercial Vastu & Feng Shui',
    lead: 'Offices, retail spaces, hotels, hospitals and restaurants.',
    text: 'Commercial Vastu consultations can cover offices, retail spaces, hotels, hospitals and restaurants. Feng Shui guidance can also be discussed for commercial spaces.',
  },
  {
    id: 'plot-land',
    icon: MapPin,
    title: 'Plot & Land Selection',
    lead: 'Think it through before you commit.',
    text: 'Discuss Vastu considerations for a plot or site you are considering for a home or business.',
  },
  {
    id: 'construction',
    icon: PencilRuler,
    title: 'Construction & Renovation',
    lead: 'For a planned build or a renovation.',
    text: 'Discuss Vastu guidance for a planned build or renovation, including your project stage and the questions you have.',
  },
  {
    id: 'industrial',
    icon: Factory,
    title: 'Industrial & Factory Vastu',
    lead: 'Industrial and factory properties.',
    text: 'Discuss the layout and Vastu considerations of an industrial or factory property.',
  },
  {
    id: 'floor-plan',
    icon: Ruler,
    title: 'Online Floor-Plan Review',
    lead: 'Share a layout remotely.',
    text: 'Contact the practice to discuss your layout and what information to share for an online floor-plan review.',
  },
];

export default function ServicesPage() {
  return (
    <div>
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="grid-lines absolute inset-0 -z-10 opacity-50" aria-hidden="true" />
        <div className="container mx-auto max-w-5xl break-words px-4 py-16 md:py-24">
          <p className="eyebrow mb-4">Consultation services</p>
          <h1 className="max-w-3xl font-headline text-4xl font-semibold leading-tight md:text-5xl">Vastu and Feng Shui Consultation Services</h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-foreground/80">
            Vastu Shastra and Feng Shui guidance for homes and businesses, plus plot selection, construction or renovation guidance, industrial and factory Vastu, and online floor-plan review.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-5xl space-y-20 px-4 py-16 md:py-24">
        <section className="break-words">
          <h2 className="mb-8 border-b border-border pb-4 font-headline text-2xl font-semibold">Guidance by property and project</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {services.map(({ id, icon: Icon, title, lead, text }) => (
              <article key={id} id={id} className="paper-card p-6 md:p-8">
                <span className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-secondary text-primary">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="font-headline text-2xl font-semibold">{title}</h3>
                <p className="mt-2 font-semibold text-terracotta-ink">{lead}</p>
                <p className="mt-3 leading-7 text-foreground/70">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="break-words">
          <h2 className="mb-8 border-b border-border pb-4 font-headline text-2xl font-semibold">Consultation Formats</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex gap-4 rounded-lg border border-border bg-secondary p-6">
              <MapPin className="mt-1 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h3 className="mb-2 font-headline text-xl font-semibold">On-Site Consultation</h3>
                <p className="mb-2 text-foreground/70">An on-site consultation format is available.</p>
                <p className="text-sm text-foreground/70">Ask whether this format may suit your property and consultation needs.</p>
              </div>
            </div>
            <div className="flex gap-4 rounded-lg border border-border bg-secondary p-6">
              <Globe className="mt-1 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h3 className="mb-2 font-headline text-xl font-semibold">Online / Remote Consultation</h3>
                <p className="mb-2 text-foreground/70">An online/remote consultation format is available, including <strong>online floor-plan review</strong>.</p>
                <p className="text-sm text-foreground/70">Ask whether this format may suit your property and consultation needs.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="break-words rounded-xl border border-border bg-primary p-8 text-center text-primary-foreground md:p-12">
          <h2 className="mb-4 font-headline text-2xl font-semibold text-white md:text-3xl">Not sure which format suits your property?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
            Contact Sanjay Jain to discuss your property and ask which consultation format may suit your needs.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-auto flex-wrap bg-white py-3 font-semibold text-primary hover:bg-white/90">
              <a href="https://wa.me/919828088678?text=Hello%2C%20I%20would%20like%20to%20ask%20about%20a%20consultation." target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5 shrink-0" aria-hidden="true" />
                <span>Inquire via WhatsApp</span>
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-auto border-white bg-transparent py-3 font-semibold text-white hover:bg-white/10 hover:text-white">
              <Link href="/contact">Go to contact page</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
