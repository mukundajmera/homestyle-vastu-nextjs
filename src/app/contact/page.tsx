import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact Homestyle Vastu for Vastu Shastra and Feng Shui consultations. Reach out via WhatsApp or phone to discuss your property.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Homestyle Vastu',
    description: 'Contact Homestyle Vastu by WhatsApp or phone to discuss your property.',
    url: '/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Homestyle Vastu',
    description: 'Contact Homestyle Vastu by WhatsApp or phone to discuss your property.',
  },
};

export default function ContactPage() {
  const whatsappNumber = "919828088678";
  const displayPhone = "+91 98280 88678";

  const whatsappMessage = encodeURIComponent("Hello, I would like to ask about a consultation. My property is residential/commercial and I am interested in an on-site/online consultation.");

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6 text-foreground">Contact Us</h1>
        <p className="text-xl text-foreground/80 leading-relaxed font-body max-w-2xl mx-auto">
          Contact Sanjay Jain to discuss residential or commercial Vastu and Feng Shui guidance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <Card className="bg-white border-border shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-8 flex flex-col items-center text-center h-full">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-headline font-bold mb-3">WhatsApp</h2>
            <p className="text-foreground/70 mb-8 flex-grow">
              Send a message to ask about residential or commercial Vastu and Feng Shui guidance and available consultation formats.
            </p>
            <Button asChild size="lg" className="w-full bg-[#087A3A] hover:bg-[#066632] text-white font-bold">
              <Link href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Message on WhatsApp
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white border-border shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-8 flex flex-col items-center text-center h-full">
            <div className="w-16 h-16 rounded-full bg-secondary/30 flex items-center justify-center mb-6 text-secondary-foreground">
              <Phone className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-headline font-bold mb-3">Phone</h2>
            <p className="text-foreground/70 mb-8 flex-grow">
              Prefer to speak directly? Call to discuss your property and consultation inquiry.
            </p>
            <Button asChild size="lg" variant="outline" className="w-full font-bold border-2">
              <a href={`tel:+${whatsappNumber}`}>
                <Phone className="mr-2 h-5 w-5" />
                {displayPhone}
              </a>
            </Button>
          </CardContent>
        </Card>
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
