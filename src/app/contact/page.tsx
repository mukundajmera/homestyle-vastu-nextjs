import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MapPin, MessageCircle } from 'lucide-react';
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: 'Contact Homestyle Vastu in Jaipur',
  description: 'Contact Homestyle Vastu in Jaipur about Vastu and Feng Shui for homes, businesses, plots and floor-plan review.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Homestyle Vastu',
    description: 'Contact Sanjay Jain by WhatsApp or phone about homes, businesses, plots, construction, renovation, factories, or online floor-plan review.',
    url: '/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Homestyle Vastu',
    description: 'Contact Sanjay Jain by WhatsApp or phone about homes, businesses, plots, construction, renovation, factories, or online floor-plan review.',
  },
};

export default function ContactPage() {
  const whatsappNumber = "919828088678";
  const displayPhone = "+91 98280 88678";

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
      <div className="text-center mb-16">
        <p className="eyebrow mb-4">Get in touch</p>
        <h1 className="text-4xl md:text-5xl font-headline font-semibold mb-6 text-foreground">Contact Us</h1>
        <p className="text-xl text-foreground/80 leading-relaxed font-body max-w-2xl mx-auto">
          Contact Sanjay Jain about Vastu and Feng Shui for homes, businesses, plot selection, construction or renovation, industrial properties, or online floor-plan review.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-2">
          <Card className="bg-white border-border shadow-sm">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-headline font-bold mb-6">Consultation Inquiry</h2>
              <ContactForm />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="bg-white border-border shadow-sm">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-secondary/30 flex items-center justify-center mb-4 text-secondary-foreground">
                <Phone className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-headline font-bold mb-2">Prefer to call?</h2>
              <p className="text-foreground/70 text-sm mb-6">
                Prefer to speak directly or having trouble with the form? Call to discuss your property.
              </p>
              <Button asChild variant="outline" className="w-full font-bold border-2">
                <a href={`tel:+${whatsappNumber}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  {displayPhone}
                </a>
              </Button>
              <Button asChild className="mt-3 w-full font-bold">
                <a href={`https://wa.me/${whatsappNumber}?text=Hello%2C%20I%20would%20like%20to%20ask%20about%20a%20consultation.`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                  Message on WhatsApp
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="bg-muted rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
        <div className="w-16 h-16 shrink-0 rounded-full bg-background flex items-center justify-center text-foreground shadow-sm">
          <MapPin className="w-8 h-8" />
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-headline font-bold mb-2">Location</h2>
          <address className="not-italic text-lg text-foreground/80 leading-relaxed font-body">
            Shivam Apartment, Acharya Kriplani Marg<br />
            Anand Puri, Bees Dukan, Adarsh Nagar<br />
            Jaipur, Rajasthan 302004<br />
            India
          </address>
          <p className="mt-4 text-sm text-foreground/60 italic">
            On-site and online/remote consultation formats are available. Ask which may suit your property.
          </p>
        </div>
      </div>
    </div>
  );
}
