import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown, Compass, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { HomePropertyExplorer, HomeVastuDial } from '@/components/home-interactions';
import { BRAND_NAME, PERSON_NAME, PERSON_TITLE, PHONE_E164, WHATSAPP_CHAT_URL } from '@/lib/site';
import { TestimonialsSection } from '@/components/testimonials-section';

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
  { step: '01', title: 'Send your enquiry', text: 'Tell us the property type (home, shop, office, plot or factory), its area in Jaipur, and the decision you are weighing.' },
  { step: '02', title: 'Share the layout', text: 'Send a floor plan with the main compass directions marked, plus any drawings you have. Businesses should show entry, work areas and staff spaces.' },
  { step: '03', title: 'Choose on-site or online', text: 'An on-site visit walks through the property with you. An online floor-plan review suits properties outside Jaipur or a plan you only need checked.' },
  { step: '04', title: 'Agree the next step', text: 'Go through what was observed, then decide what to change and what your architect, engineer or legal adviser should confirm.' },
];

const faqs = [
  {
    q: 'What happens in a consultation, and what should I bring?',
    a: 'You walk through your property and priorities with Sanjay Jain, who reads the layout against Vastu and Feng Shui principles and gives you clear, prioritised observations. Bring a floor plan or plot map (even a hand sketch or photo), the direction of your main entrance, and your top questions.',
  },
  {
    q: 'I live outside Jaipur. Can you review my floor plan online?',
    a: 'Yes. Send a clear plan with room names and a north direction on WhatsApp or the inquiry form, and the review is done remotely. Online review also suits a quick second opinion on a plan your architect has already drawn.',
  },
  {
    q: 'Should I consult before buying a plot or starting construction?',
    a: 'Earlier is easier. Plot shape, road side and entrance position are hard to change after purchase, and a layout is far cheaper to adjust on paper than after the walls are up. Many clients consult at plot selection and again at the drawing stage.',
  },
  {
    q: 'Will I have to demolish or rebuild to follow your advice?',
    a: 'No. Suggestions are ranked by priority and practicality, so you can see what is worth changing, what can be adjusted with placement or simple modifications, and what is best left alone. Structural decisions stay with your architect or engineer.',
  },
  {
    q: 'How do I book, and how are fees decided?',
    a: 'Send an inquiry or WhatsApp message with your property details. You will hear back about the best format, and the fee is agreed with you in writing before any work starts, so there are no surprises.',
  },
];

const highlights = [
  { big: '25+ years', small: 'of experience' },
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
                <a href={WHATSAPP_CHAT_URL} target="_blank" rel="noopener noreferrer">
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
          <div className="mt-10 flex flex-col items-start gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-lg text-foreground/85">Not sure which property type applies? Send a short WhatsApp message describing your property.</p>
            <Button asChild variant="outline" className="h-12 border-accent px-6 text-base font-semibold text-terracotta-ink hover:bg-accent/10 hover:text-terracotta-ink">
              <a href={WHATSAPP_CHAT_URL} target="_blank" rel="noopener noreferrer"><MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />Ask on WhatsApp</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="border-y border-border bg-secondary py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-3">How it works</p>
            <h2 className="font-headline text-3xl font-semibold md:text-4xl">Start with one WhatsApp message</h2>
            <p className="mt-4 text-lg text-foreground/85">Four steps from your first enquiry to a clear decision on what to do next.</p>
          </div>
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {journey.map((item, i) => (
              <li key={item.step} className={`rounded border bg-card p-6 ${i === 0 ? 'border-primary' : 'border-border'}`}>
                <span className="font-headline text-2xl font-semibold text-terracotta-ink">{item.step}</span>
                <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-6 text-foreground/80">{item.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="h-12 px-6 font-semibold">
              <a href={WHATSAPP_CHAT_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                Start with step 01
              </a>
            </Button>
            <p className="text-sm text-muted-foreground">Guidance is traditional and offered as a consultation, not a guarantee of results.</p>
          </div>
        </div>
      </section>

      {/* Consultant */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto grid items-center gap-12 px-4 md:grid-cols-[0.8fr_1.2fr]">
          <div className="paper-card mx-auto flex w-full max-w-sm flex-col items-center p-10 text-center">
            <Image src="/brand/sanjay-home-v4.jpg" alt={`${PERSON_NAME}, ${PERSON_TITLE}`} width={780} height={1200} sizes="(min-width: 768px) 25vw, 60vw" className="h-64 w-52 rounded-lg border border-accent/40 object-cover object-top" />

            <h3 className="mt-5 font-headline text-2xl font-semibold">{PERSON_NAME}</h3>
            <p className="mt-1 text-[17px] font-semibold leading-[29px] text-terracotta-ink">{PERSON_TITLE}</p>
            <p className="mt-4 text-[17px] leading-[29px] text-muted-foreground">25+ years of experience</p>
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

      <TestimonialsSection />

      {/* FAQ */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="container mx-auto max-w-3xl px-4">
          <p className="eyebrow mb-3">Questions</p>
          <h2 className="mb-8 font-headline text-3xl font-semibold md:text-4xl">Questions clients ask before they book</h2>
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
              <a href={WHATSAPP_CHAT_URL} target="_blank" rel="noopener noreferrer">
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
