import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BRAND_NAME, PERSON_NAME, PERSON_TITLE } from '@/lib/site';

export const metadata: Metadata = {
  title: `About ${PERSON_NAME}`,
  description: `Meet ${PERSON_NAME}, ${PERSON_TITLE} in Jaipur, with 22 years of experience as of 2026.`,
  alternates: { canonical: '/about' },
  openGraph: {
    title: `About ${PERSON_NAME} | ${BRAND_NAME}`,
    description: `Meet ${PERSON_NAME}, ${PERSON_TITLE} at ${BRAND_NAME}, with 22 years of experience as of 2026.`,
    url: '/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `About ${PERSON_NAME} | ${BRAND_NAME}`,
    description: `Meet ${PERSON_NAME}, ${PERSON_TITLE} at ${BRAND_NAME}, with 22 years of experience as of 2026.`,
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-16 md:py-24">
      <div className="flex flex-col gap-12 md:flex-row md:gap-16">
        <aside className="w-full md:w-1/3">
          <div className="paper-card relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-t-[6rem] rounded-b-lg">
            <div className="grid-lines absolute inset-0 opacity-70" aria-hidden="true" />
            <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute h-4/5 w-4/5 text-accent/40" fill="none">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.8" />
              <rect x="20" y="20" width="60" height="60" stroke="currentColor" strokeWidth="0.8" transform="rotate(45 50 50)" />
              <path d="M50 0V100M0 50H100" stroke="currentColor" strokeWidth="0.5" />
            </svg>
            <span className="relative font-headline text-6xl font-semibold text-primary">SJ</span>
          </div>
          <div className="mt-6 text-center md:text-left">
            <h1 className="font-headline text-3xl font-semibold">{PERSON_NAME}</h1>
            <p className="mt-1 font-semibold text-terracotta-ink">{PERSON_TITLE}</p>
            <p className="mt-3 inline-block rounded bg-sage/10 px-2 py-1 text-xs font-bold uppercase tracking-[0.1em] text-sage">22 years of experience as of 2026</p>
          </div>
        </aside>

        <div className="w-full space-y-10 md:w-2/3">
          <section>
            <p className="eyebrow mb-3">The practice</p>
            <h2 className="mb-4 font-headline text-3xl font-semibold">About the Practice</h2>
            <div className="space-y-4 text-lg leading-relaxed text-foreground/80">
              <p>
                {PERSON_NAME} is the consultant at {BRAND_NAME}, with 22 years of experience as of 2026. He provides Vastu Shastra and Feng Shui guidance for homes and businesses, plot and land selection, construction or renovation, industrial and factory properties, and online floor-plan review.
              </p>
              <p>
                Visitors can contact the practice to discuss their property, the guidance they are looking for, and whether an on-site or online/remote consultation format may suit them.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-headline text-2xl font-semibold">Our Approach</h2>
            <div className="space-y-4 text-lg leading-relaxed text-foreground/80">
              <p>
                Guidance covers homes and businesses, plot or land selection, new construction or renovation, industrial and factory properties, and online floor-plan review. On-site and online/remote formats are available.
              </p>
              <p className="border-l-2 border-accent pl-4">
                No outcome or result is promised. Contact {PERSON_NAME} to discuss what guidance may be relevant to your property.
              </p>
              <p>
                For details about the service categories and consultation formats, explore the <Link href="/services" className="font-semibold text-primary underline underline-offset-4">Services page</Link> or contact the practice directly.
              </p>
            </div>
          </section>

          <section className="border-t border-border pt-8">
            <h3 className="mb-3 font-headline text-xl font-semibold">Start a Conversation</h3>
            <p className="mb-6 text-foreground/85">
              Share your property type, project stage and questions to discuss which guidance or consultation format may be relevant.
            </p>
            <Button asChild className="font-semibold">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
}
