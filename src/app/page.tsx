import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2, ChevronDown, Compass, Factory, Home as HomeIcon, MapPin, MessageCircle, PencilRuler, Ruler } from 'lucide-react';
import Link from 'next/link';
import { VastuDial } from '@/components/vastu-dial';

export const metadata: Metadata = {
  title: 'Vastu & Feng Shui in Jaipur for Homes',
  description: 'Vastu and Feng Shui guidance by Sanjay Jain in Jaipur for homes, businesses, plots, construction, renovation and online floor-plan reviews.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Vastu & Feng Shui for Homes and Businesses | Homestyle Vastu',
    description: 'Explore Vastu and Feng Shui guidance for homes, businesses, plots, construction and renovation, industrial properties and online floor-plan reviews.',
    url: '/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vastu & Feng Shui for Homes and Businesses | Homestyle Vastu',
    description: 'Explore Vastu and Feng Shui guidance for homes, businesses, plots, construction and renovation, industrial properties and online floor-plan reviews.',
  },
};

const WHATSAPP_URL = 'https://wa.me/919828088678?text=Hello%2C%20I%20would%20like%20to%20ask%20about%20a%20consultation.';

const services = [
  {
    title: 'Residential Vastu & Feng Shui',
    tag: 'Homes',
    icon: HomeIcon,
    text: 'Questions about your home, apartment or residential plot, with on-site or online/remote formats to choose from.',
  },
  {
    title: 'Commercial Vastu & Feng Shui',
    tag: 'Business',
    icon: Building2,
    text: 'Offices, retail, hotels, hospitals and restaurants. Feng Shui can also be discussed for commercial spaces.',
  },
  {
    title: 'Plot & Land Selection',
    tag: 'Before you buy',
    icon: MapPin,
    text: 'Talk through the Vastu considerations of a plot or site you are thinking about for a home or business.',
  },
  {
    title: 'Construction & Renovation',
    tag: 'Planned builds',
    icon: PencilRuler,
    text: 'Discuss a new build or renovation and the questions you have at your current project stage.',
  },
  {
    title: 'Industrial & Factory Vastu',
    tag: 'Industrial',
    icon: Factory,
    text: 'Layout and Vastu considerations for an industrial or factory property.',
  },
  {
    title: 'Online Floor-Plan Review',
    tag: 'Remote',
    icon: Ruler,
    text: 'Share your layout remotely and discuss what information is useful to send.',
  },
];

const journey = [
  { step: '01', title: 'Start a conversation', text: 'Message or call and say what you are asking about: a home, business, plot, build, renovation, factory or floor plan.' },
  { step: '02', title: 'Share the details', text: 'Tell us the property type and project stage, and what guidance you are looking for.' },
  { step: '03', title: 'Choose a format', text: 'Ask whether an on-site or an online/remote consultation may suit your property.' },
  { step: '04', title: 'Agree next steps', text: 'Discuss your questions with Sanjay Jain and decide how you would like to continue.' },
];

const faqs = [
  {
    q: 'What kinds of properties can I ask about?',
    a: 'You can ask about homes and businesses, plot or land selection, construction or renovation, industrial and factory properties, and online floor-plan review.',
  },
  {
    q: 'Are on-site and online consultations available?',
    a: 'Both on-site and online/remote formats are available. Ask which may suit your property.',
  },
  {
    q: 'Is a particular outcome guaranteed?',
    a: 'No specific result is promised. You can contact the practice to discuss your inquiry before deciding on next steps.',
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="grid-lines absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
        <div className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[#D97706]/10 blur-3xl" aria-hidden="true" />
        <div className="container mx-auto grid items-center gap-12 px-4 py-14 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            <p className="eyebrow mb-5">Vastu Shastra &middot; Feng Shui &middot; Jaipur</p>
            <h1 className="font-headline text-[2.4rem] font-semibold leading-[1.1] sm:text-5xl md:text-6xl">
              Guidance for the spaces where you <span className="italic text-primary">live and work.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-foreground/75 lg:mx-0">
              Talk with Sanjay Jain about a home, workplace, plot, planned build, renovation, industrial property or floor plan, and ask which consultation format may suit your project.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Button asChild size="lg" className="h-12 px-6 text-base font-semibold shadow-[0_8px_20px_-8px_rgba(176,90,7,0.55)] transition-transform hover:-translate-y-0.5">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                  Message on WhatsApp
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 border-accent px-6 text-base font-semibold text-terracotta-ink hover:bg-accent/10 hover:text-terracotta-ink">
                <Link href="/services">Explore services</Link>
              </Button>
            </div>
            <ul className="mt-10 grid grid-cols-1 gap-3 text-left text-sm sm:grid-cols-3">
              {[
                ['22 years', 'of experience as of 2026'],
                ['On-site & online', 'consultation formats'],
                ['Homes & business', 'residential and commercial'],
              ].map(([big, small]) => (
                <li key={big} className="border-l-2 border-accent/60 pl-3">
                  <span className="block font-headline text-lg font-semibold">{big}</span>
                  <span className="text-muted-foreground">{small}</span>
                </li>
              ))}
            </ul>
          </div>
          <VastuDial />
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow mb-3">Consultation services</p>
              <h2 className="font-headline text-3xl font-semibold md:text-4xl">Guidance for every kind of space</h2>
              <p className="mt-4 text-lg text-foreground/70">From a family home to a factory floor, start with the property you are asking about.</p>
            </div>
            <Link href="/services" className="inline-flex items-center rounded-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              View all services <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map(({ title, tag, icon: Icon, text }) => (
              <article key={title} className="paper-card group flex flex-col p-6 transition-transform hover:-translate-y-1">
                <div className="mb-5 flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-secondary text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="rounded bg-sage/10 px-2 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-sage">{tag}</span>
                </div>
                <h3 className="font-headline text-xl font-semibold">{title}</h3>
                <p className="mt-3 flex-1 leading-7 text-foreground/70">{text}</p>
                <Link href="/services" className="mt-5 inline-flex w-fit items-center rounded-sm text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="border-y border-border bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="eyebrow mb-3">How it works</p>
            <h2 className="font-headline text-3xl font-semibold md:text-4xl">A clear first step</h2>
          </div>
          <ol className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-4">
            {journey.map((item) => (
              <li key={item.step} className="relative border-t-2 border-accent/50 pt-6">
                <span className="font-headline text-4xl font-semibold text-primary/80">{item.step}</span>
                <h3 className="mt-3 font-headline text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 leading-7 text-foreground/70">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Consultant */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto grid items-center gap-12 px-4 md:grid-cols-[0.8fr_1.2fr]">
          <div className="paper-card mx-auto flex w-full max-w-sm flex-col items-center p-10 text-center">
            <div className="grid h-24 w-24 place-items-center rounded-full border-2 border-accent/50 bg-secondary font-headline text-3xl font-semibold text-primary">SJ</div>
            <h3 className="mt-5 font-headline text-2xl font-semibold">Sanjay Jain</h3>
            <p className="mt-1 text-sm font-semibold text-terracotta-ink">Vastu &amp; Feng Shui Consultant</p>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">22 years of experience as of 2026</p>
          </div>
          <div className="space-y-5">
            <p className="eyebrow">The consultant</p>
            <h2 className="font-headline text-3xl font-semibold md:text-4xl">Rooted in tradition, applied for modern living</h2>
            <p className="text-lg leading-8 text-foreground/70">
              Sanjay Jain is the Vastu and Feng Shui consultant at Homestyle Vastu. The practice offers guidance for homes, businesses, plots and land, construction or renovation, industrial properties and online floor-plan review.
            </p>
            <Button asChild variant="outline" className="border-accent text-terracotta-ink hover:bg-accent/10 hover:text-terracotta-ink">
              <Link href="/about">Read full profile</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="container mx-auto max-w-3xl px-4">
          <p className="eyebrow mb-3">Questions</p>
          <h2 className="mb-8 font-headline text-3xl font-semibold md:text-4xl">Common questions</h2>
          <div className="divide-y divide-border border-y border-border">
            {faqs.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="mt-3 leading-7 text-foreground/75">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden bg-primary py-20 text-center text-primary-foreground md:py-24">
        <Compass className="absolute -bottom-16 -right-10 -z-10 h-72 w-72 text-white/10" strokeWidth={0.6} aria-hidden="true" />
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="mb-6 font-headline text-3xl font-semibold text-white md:text-4xl">Discuss your property</h2>
          <p className="mb-10 text-lg text-white/90">
            On-site and online/remote consultation formats are available. Ask which may suit your property.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="h-12 bg-white px-8 font-bold text-primary hover:bg-white/90">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                WhatsApp Us
              </a>
            </Button>
            <a href="tel:+919828088678" className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-md border border-white bg-transparent px-8 text-sm font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary">
              Call +91 98280 88678
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
