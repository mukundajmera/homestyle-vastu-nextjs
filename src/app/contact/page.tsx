import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MapPin, MessageCircle, Instagram } from 'lucide-react';
import { ContactForm } from "@/components/contact-form";
import { ADDRESS, BRAND_NAME, PERSON_NAME, INSTAGRAM_HANDLE, INSTAGRAM_URL, PHONE_E164, WHATSAPP_CHAT_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact in Jaipur',
  description: `Contact ${BRAND_NAME} in Jaipur about Vastu and Feng Shui for homes, businesses, plots and floor-plan review.`,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: `Contact | ${BRAND_NAME}`,
    description: `Contact ${PERSON_NAME} by WhatsApp or phone about homes, businesses, plots, construction, renovation, factories, or online floor-plan review.`,
    url: '/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Contact | ${BRAND_NAME}`,
    description: `Contact ${PERSON_NAME} by WhatsApp or phone about homes, businesses, plots, construction, renovation, factories, or online floor-plan review.`,
  },
};

export default function ContactPage() {
  const displayPhone = PHONE_E164.replace('+91', '+91 ').replace(/(\d{5})(\d{5})/, '$1 $2');

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
      <div className="text-center mb-16">
        <p className="eyebrow mb-4">Get in touch</p>
        <h1 className="text-4xl md:text-5xl font-headline font-semibold mb-6 text-foreground">Talk to a Vastu &amp; Feng Shui Expert Before You Build, Buy or Move In</h1>
        <p className="text-xl text-foreground/80 leading-relaxed font-body max-w-2xl mx-auto">
          Share your plan or plot details and get clear, practical direction from {PERSON_NAME}, backed by 25+ years of experience. Homes, businesses, plots, factories or an online floor-plan review.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-2">
          <Card className="bg-white border-border shadow-sm">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-headline font-bold mb-6">Start with your property details</h2>
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
              <h2 className="text-xl font-headline font-bold mb-2">Want answers right now?</h2>
              <p className="text-foreground/85 text-sm mb-6">
                Speak to Sanjay directly. A quick call can show which consultation fits your property.
              </p>
              <Button asChild variant="outline" className="w-full font-bold border-2">
                <a href={`tel:${PHONE_E164}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  {displayPhone}
                </a>
              </Button>
              <Button asChild className="mt-3 w-full font-bold">
                <a href={WHATSAPP_CHAT_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                  Message on WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" className="mt-3 w-full font-bold border-2">
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                  <Instagram className="mr-2 h-4 w-4" aria-hidden="true" />
                  Follow @{INSTAGRAM_HANDLE}
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
            {ADDRESS.street}<br />
            {ADDRESS.locality}<br />
            {ADDRESS.region} {ADDRESS.postalCode}<br />
            {ADDRESS.country}
          </address>
          <p className="mt-4 text-sm text-foreground/85 italic">
            On-site and online/remote consultation formats are available. Ask which may suit your property.
          </p>
        </div>
      </div>
    </div>
  );
}
