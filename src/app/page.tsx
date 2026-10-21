import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { SpacePlanIllustration } from '@/components/space-plan-illustration';

export const metadata: Metadata = {
  title: 'Vastu & Feng Shui for Homes and Businesses',
  description: 'Vastu and Feng Shui guidance with Sanjay Jain for homes, businesses, plots, construction and renovation, industrial spaces and online floor-plan reviews.',
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

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden border-b border-border bg-background">
        <div className="container mx-auto grid items-center gap-12 px-4 py-14 md:gap-16 md:py-20 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-24">
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d8c7ad] bg-white/70 px-4 py-2 text-sm font-medium text-[#61594d] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#71836f]" aria-hidden="true" />
              Vastu and Feng Shui consultations
            </p>
            <h1 className="font-headline text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Guidance for the spaces where you <span className="text-primary italic">live and work.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-foreground/75 md:text-xl lg:mx-0">
              Talk with Sanjay Jain about a home, workplace, plot, planned build, renovation, industrial property or floor plan. Ask which Vastu or Feng Shui guidance and consultation format may suit your project.
            </p>
            <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row lg:justify-start">
              <Button asChild size="lg" className="h-12 rounded-md bg-primary px-6 text-base font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md">
                <a href="https://wa.me/919828088678?text=Hello%2C%20I%20would%20like%20to%20ask%20about%20a%20consultation." target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Message on WhatsApp
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 rounded-md border-[#bcae9a] bg-white/70 px-6 text-base font-semibold hover:bg-secondary/20">
                <Link href="/services">Explore services</Link>
              </Button>
            </div>
            <p className="mt-5 text-sm text-foreground/60 font-medium">22 years of experience as of 2026. For homes and businesses. On-site and online/remote formats.</p>
          </div>
          <div className="mx-auto w-full max-w-xl lg:max-w-none">
            <SpacePlanIllustration />
          </div>
        </div>
      </section>

      {/* How a Consultation Starts */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-6 text-foreground">
              A clear first step
            </h2>
            <p className="text-lg text-foreground/70 leading-relaxed font-body">
              Tell us what you are planning or reviewing: a home, business, plot, construction or renovation project, industrial space, or floor plan. You can ask whether an on-site or online/remote consultation may suit your property.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Start a conversation",
                description: "Share whether you are asking about a home, business, plot, planned build, renovation, industrial property or floor plan."
              },
              {
                step: "02",
                title: "Discuss the format",
                description: "Ask about on-site or online/remote consultation formats and which may suit your property."
              },
              {
                step: "03",
                title: "Agree next steps",
                description: "Discuss your questions with Sanjay Jain and decide how you would like to continue."
              }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 rounded-lg bg-background/50 border border-border/50">
                <span className="text-primary font-headline text-3xl font-bold mb-4">{item.step}</span>
                <h3 className="text-xl font-headline font-semibold mb-3">{item.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 md:py-24 bg-secondary/20 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Consultation Services</h2>
              <p className="text-lg text-foreground/70">Guidance for homes, workplaces, plots, planned builds and industrial properties.</p>
            </div>
            <Link href="/services" className="hidden md:flex items-center text-primary font-semibold hover:underline mt-4 md:mt-0">
              View all services <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white border-border/50 hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Residential Vastu & Feng Shui</CardTitle>
                <CardDescription className="text-base mt-2">For homes, apartments, and residential plots.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70 mb-6">Discuss Vastu and Feng Shui questions about your home, apartment or residential plot, and ask whether an on-site or online consultation may suit your project.</p>
                <Link href="/services" className="text-primary font-medium flex items-center hover:underline w-fit">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white border-border/50 hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Commercial Vastu & Feng Shui</CardTitle>
                <CardDescription className="text-base mt-2">For offices, retail spaces, and commercial sites.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70 mb-6">Discuss a business, office, retail, industrial or factory property, including questions about construction, renovation and online floor-plan review.</p>
                <Link href="/services" className="text-primary font-medium flex items-center hover:underline w-fit">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center md:hidden">
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/services">View all services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <div className="w-full max-w-md mx-auto relative h-64 md:h-80 bg-secondary/10 rounded-2xl flex flex-col items-center justify-center p-8 text-center border border-border">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <span className="font-headline text-2xl font-bold">SJ</span>
                </div>
                <h3 className="text-xl font-headline font-semibold mb-2">Sanjay Jain</h3>
                <p className="text-foreground/70 text-sm max-w-xs">Vastu and Feng Shui consultant with 22 years of experience as of 2026.</p>
              </div>
            </div>

            <div className="w-full md:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">Rooted in tradition, applied for modern living</h2>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Sanjay Jain is the Vastu and Feng Shui consultant at Homestyle Vastu, with 22 years of experience as of 2026.
              </p>
              <p className="text-lg text-foreground/70 leading-relaxed">
                The practice offers guidance for homes, businesses, plots and land, construction or renovation, industrial properties and online floor-plan review. On-site and online/remote consultation formats are available.
              </p>
              <div className="pt-4">
                <Button asChild variant="outline" className="text-base">
                  <Link href="/about">Read full profile</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently asked questions */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-8">Common questions</h2>
          <div className="divide-y divide-border border-y border-border">
            <details className="py-5">
              <summary className="cursor-pointer font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm">
                What kinds of properties can I ask about?
              </summary>
              <p className="mt-3 text-foreground/75">You can ask about homes and businesses, plot or land selection, construction or renovation, industrial and factory properties, and online floor-plan review.</p>
            </details>
            <details className="py-5">
              <summary className="cursor-pointer font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm">
                Are on-site and online consultations available?
              </summary>
              <p className="mt-3 text-foreground/75">Both on-site and online/remote formats are available. Ask which may suit your property.</p>
            </details>
            <details className="py-5">
              <summary className="cursor-pointer font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm">
                Is a particular outcome guaranteed?
              </summary>
              <p className="mt-3 text-foreground/75">No specific result is promised. You can contact the practice to discuss your inquiry before deciding on next steps.</p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-24 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-6 text-white">
            Discuss your property
          </h2>
          <p className="text-lg text-white/90 mb-10">
            On-site and online/remote consultation formats are available. Ask which may suit your property.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-[#2a382d] hover:bg-white/90 font-bold h-12 px-8">
              <a href="https://wa.me/919828088678?text=Hello%2C%20I%20would%20like%20to%20ask%20about%20a%20consultation." target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Us
              </a>
            </Button>
            <a href="tel:+919828088678" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-white text-white bg-transparent hover:bg-white/10 h-12 px-8">
              Call +91 98280 88678
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
