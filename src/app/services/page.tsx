import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { FormatToggle } from '@/components/format-toggle';
import { consultationFormats, propertyServices, whatsappLink } from '@/lib/services-data';

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

export default function ServicesPage() {
  return (
    <div>
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="grid-lines absolute inset-0 -z-10 opacity-50" aria-hidden="true" />
        <div className="container mx-auto max-w-5xl break-words px-4 py-16 md:py-24">
          <p className="eyebrow mb-4">Consultation services</p>
          <h1 className="max-w-3xl font-headline text-4xl font-semibold leading-tight md:text-5xl">Vastu and Feng Shui Consultation Services</h1>
          <p className="mt-6 max-w-3xl text-xl leading-9 text-foreground/85">
            Vastu Shastra and Feng Shui guidance for homes and businesses, plus plot selection, construction or renovation guidance, industrial and factory Vastu, and online floor-plan review.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-5xl space-y-20 px-4 py-16 md:py-24">
        <section className="break-words">
          <h2 className="mb-8 border-b border-border pb-4 font-headline text-3xl font-semibold">Guidance by property and project</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {propertyServices.map(({ id, icon: Icon, title, tag, lead, text, bring }) => (
              <article key={id} id={id} className="paper-card-interactive flex scroll-mt-24 flex-col p-6 md:p-8">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-secondary text-primary">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="tag-pill">{tag}</span>
                </div>
                <h3 className="font-headline text-2xl font-semibold">{title}</h3>
                <p className="mt-2 text-[17px] font-semibold leading-[29px] text-terracotta-ink">{lead}</p>
                <p className="mt-3 flex-1 leading-[29px] text-foreground/85">{text}</p>
                <p className="mt-5 rounded border border-border bg-secondary px-4 py-3 text-[17px] leading-[29px] text-foreground">
                  <span className="font-semibold">Helpful to have ready: </span>
                  {bring}
                </p>
                <a
                  href={whatsappLink(`Hello, I would like to ask about ${title.toLowerCase()}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-fit items-center rounded text-[17px] font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                  Ask about this service
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="break-words">
          <h2 className="mb-8 border-b border-border pb-4 font-headline text-3xl font-semibold">Consultation formats</h2>
          <FormatToggle formats={consultationFormats} />
        </section>

        <section className="break-words rounded border border-border bg-primary p-8 text-center text-primary-foreground md:p-12">
          <h2 className="mb-4 font-headline text-2xl font-semibold text-white md:text-3xl">Not sure which format suits your property?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl leading-8 text-white/95">
            Contact Sanjay Jain to discuss your property and ask which consultation format may suit your needs.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-14 bg-white px-7 text-lg font-semibold text-primary hover:bg-white/90">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5 shrink-0" aria-hidden="true" />
                <span>Inquire via WhatsApp</span>
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 border-white bg-transparent px-7 text-lg font-semibold text-white hover:bg-white/10 hover:text-white">
              <Link href="/contact">
                Go to contact page <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
