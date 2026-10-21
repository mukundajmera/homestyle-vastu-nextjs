import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Home, Building2, MapPin, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Consultation Services',
  description: 'Explore Vastu Shastra and Feng Shui consultations for homes and businesses, plot or land selection, construction or renovation, industrial and factory properties, and online floor-plan reviews.',
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
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-5xl">
      <div className="max-w-3xl mb-16 break-words">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6 text-foreground break-words">Vastu and Feng Shui Consultation Services</h1>
        <p className="text-xl text-foreground/80 leading-relaxed font-body break-words">
          Vastu Shastra and Feng Shui guidance for homes and businesses, plus plot selection, construction or renovation guidance, industrial and factory Vastu, and online floor-plan review.
        </p>
      </div>

      <div className="space-y-16">
        {/* Service Types */}
        <section className="break-words">
          <h2 className="text-2xl font-headline font-bold mb-8 border-b border-border pb-4 break-words">Guidance by property and project</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white border-border shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <Home className="w-6 h-6" />
                </div>
                <CardTitle className="font-headline text-2xl">Residential Vastu & Feng Shui</CardTitle>
                <CardDescription className="text-base mt-2">Guidance for homes, apartments, and plots.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-foreground/70">
                <p>Vastu and Feng Shui guidance for residential properties, including homes and apartments.</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Plot / Land Selection:</strong> Discuss Vastu considerations for a plot or site you are considering for a home or business.</li>
                  <li><strong>Construction / Renovation:</strong> Discuss Vastu guidance for a planned build or renovation, including your project stage and questions.</li>
                </ul>
                <p>Share the kind of guidance you are looking for and ask which consultation format may suit your property.</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-border shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <Building2 className="w-6 h-6" />
                </div>
                <CardTitle className="font-headline text-2xl">Commercial Vastu & Feng Shui</CardTitle>
                <CardDescription className="text-base mt-2">Guidance for offices, retail, and commercial sites.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-foreground/70">
                <p>Vastu and Feng Shui guidance for commercial properties and business spaces.</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Industrial / Factory Vastu:</strong> Discuss the layout and Vastu considerations of an industrial or factory property.</li>
                </ul>
                <p>Contact the practice to discuss your property and the questions you would like to explore.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Consultation Formats */}
        <section className="break-words">
          <h2 className="text-2xl font-headline font-bold mb-8 border-b border-border pb-4 break-words">Consultation Formats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4 p-6 rounded-lg bg-secondary/20 border border-border">
              <div className="mt-1 text-primary">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-headline font-semibold mb-2">On-Site Consultation</h3>
                <p className="text-foreground/70 mb-2">An on-site consultation format is available.</p>
                <p className="text-foreground/70 text-sm">Ask whether this format may suit your property and consultation needs.</p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-lg bg-secondary/20 border border-border">
              <div className="mt-1 text-primary">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-headline font-semibold mb-2">Online / Remote Consultation</h3>
                <p className="text-foreground/70 mb-2">An online/remote consultation format is available.</p>
                <p className="text-foreground/70 mb-2">This includes <strong>online floor-plan review</strong>. Contact the practice to discuss your layout and what information to share.</p>
                <p className="text-foreground/70 text-sm">Ask whether this format may suit your property and consultation needs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-muted p-8 md:p-12 rounded-xl text-center break-words">
          <h2 className="text-2xl md:text-3xl font-headline font-bold mb-4 break-words">Not sure which format suits your property?</h2>
          <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto break-words">
            Contact Sanjay Jain to discuss your property and ask which consultation format may suit your needs.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold flex-wrap h-auto py-3">
            <a href="https://wa.me/919828088678?text=Hello%2C%20I%20would%20like%20to%20ask%20about%20a%20consultation." target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5 shrink-0" />
              <span>Inquire via WhatsApp</span>
            </a>
          </Button>
        </section>
      </div>
    </div>
  );
}
