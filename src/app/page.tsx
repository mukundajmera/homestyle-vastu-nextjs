import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown, Compass, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { HomeJourneyStepper, HomePropertyExplorer, HomeVastuDial } from '@/components/home-interactions';
import { BRAND_NAME, PERSON_NAME, PERSON_TITLE, PHONE_E164, WHATSAPP_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Vastu & Feng Shui Jaipur',
  description: `${BRAND_NAME} offers Vastu and Feng Shui guidance by ${PERSON_NAME} in Jaipur for homes, businesses, plots, construction, renovation and online floor-plan reviews.`,
  alternates: { canonical: '/' },
  openGraph: {
    title: `Vastu & Feng Shui Jaipur | ${BRAND_NAME}`,
    description: 'Explore Vastu and Feng Shui guidance for homes, businesses, plots, construction and renovation, industrial properties and online floor-plan reviews.',
    url: '/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Vastu & Feng Shui Jaipur | ${BRAND_NAME}`,
    description: 'Explore Vastu and Feng Shui guidance for homes, businesses, plots, construction and renovation, industrial properties and online floor-plan reviews.',
  },
};

const journey = [
  { step: '01', title: 'Start a conversation', text: 'Message or call and say what you are asking about: a home, business, plot, build, renovation, factory or floor plan.' },
  { step: '02', title: 'Share the details', text: 'Tell us the property type and project stage, and what guidance you are looking for.' },
  { step: '03', title: 'Choose a format', text: 'Ask whether an on-site or an online/remote consultation may suit your property.' },
  { step: '04', title: 'Agree next steps', text: `Discuss your questions with ${PERSON_NAME} and decide how you would like to continue.` },
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

const highlights = [
  { big: '22 years', small: 'of experience as of 2026' },
  { big: 'On-site & online', small: 'consultation formats' },
  { big: 'Homes & business', small: 'residential and commercial' },
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
            <h1 className="font-headline text-[2.6rem] font-semibold leading-[1.08] sm:text-5xl md:text-6xl">
              Guidance for the spaces where you <span className="italic text-primary">live and work.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-xl leading-9 text-foreground/85 lg:mx-0">
              Talk with {PERSON_NAME} about a home, workplace, plot, planned build, renovation, industrial property or floor plan, and ask which consultation format may suit your project.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Button asChild size="lg" className="h-14 px-7 text-lg font-semibold shadow-[0_8px_20px_-8px_rgba(176,90,7,0.55)] transition-transform hover:-translate-y-0.5">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                  Message on WhatsApp
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 border-accent px-7 text-lg font-semibold text-terracotta-ink hover:bg-accent/10 hover:text-terracotta-ink">
                <Link href="#find-your-property">Find your property type</Link>
              </Button>
            </div>
            <ul className="mt-10 grid grid-cols-1 gap-3 text-left sm:grid-cols-3">
              {highlights.map(({ big, small }) => (
                <li key={big} className="rounded border border-border bg-card px-4 py-3">
                  <span className="block font-headline text-xl font-semibold">{big}</span>
                  <span className="text-[17px] leading-[29px] text-muted-foreground">{small}</span>
                </li>
              ))}
            </ul>
          </div>
          <HomeVastuDial />
        </div>
      </section>

      {/* Property explorer (replaces the static services grid) */}
      <section id="find-your-property" className="scroll-mt-20 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow mb-3">Consultation services</p>
              <h2 className="font-headline text-3xl font-semibold md:text-4xl">Pick the property you are asking about</h2>
              <p className="mt-4 text-lg text-foreground/85">Choose a property type to see what a consultation covers and what to have ready.</p>
            </div>
            <Link href="/services" className="inline-flex items-center rounded-sm text-lg font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              All services <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <HomePropertyExplorer />
        </div>
      </section>

      {/* Journey */}
      <section className="border-y border-border bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="eyebrow mb-3">How it works</p>
            <h2 className="font-headline text-3xl font-semibold md:text-4xl">A clear first step</h2>
            <p className="mt-4 text-lg text-foreground/85">Select each step to see what happens next.</p>
          </div>
          <div className="mx-auto max-w-6xl">
            <HomeJourneyStepper steps={journey} />
          </div>
        </div>
      </section>

      {/* Consultant */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto grid items-center gap-12 px-4 md:grid-cols-[0.8fr_1.2fr]">
          <div className="paper-card mx-auto flex w-full max-w-sm flex-col items-center p-10 text-center">
            <div className="grid h-24 w-24 place-items-center rounded border-2 border-accent/50 bg-secondary font-headline text-3xl font-semibold text-primary">SJ</div>
            <h3 className="mt-5 font-headline text-2xl font-semibold">{PERSON_NAME}</h3>
            <p className="mt-1 text-[17px] font-semibold leading-[29px] text-terracotta-ink">{PERSON_TITLE}</p>
            <p className="mt-4 text-[17px] leading-[29px] text-muted-foreground">22 years of experience as of 2026</p>
          </div>
          <div className="space-y-5">
            <p className="eyebrow">The consultant</p>
            <h2 className="font-headline text-3xl font-semibold md:text-4xl">Rooted in tradition, applied for modern living</h2>
            <p className="text-lg leading-8 text-foreground/85">
              {PERSON_NAME} is the {PERSON_TITLE} at {BRAND_NAME}. The practice offers guidance for homes, businesses, plots and land, construction or renovation, industrial properties and online floor-plan review.
            </p>
            <Button asChild variant="outline" className="h-12 border-accent px-6 text-base font-semibold text-terracotta-ink hover:bg-accent/10 hover:text-terracotta-ink">
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
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-sm text-lg font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-primary transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="mt-3 text-lg leading-8 text-foreground/85">{item.a}</p>
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
          <p className="mb-10 text-xl leading-8 text-white/95">
            On-site and online/remote consultation formats are available. Ask which may suit your property.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="h-14 bg-white px-8 text-lg font-bold text-primary hover:bg-white/90">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                WhatsApp Us
              </a>
            </Button>
            <a href={`tel:${PHONE_E164}`} className="inline-flex h-14 items-center justify-center whitespace-nowrap rounded-md border border-white bg-transparent px-8 text-lg font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary">
              Call {PHONE_E164.replace('+91', '+91 ').replace(/(\d{5})(\d{5})/, '$1 $2')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
