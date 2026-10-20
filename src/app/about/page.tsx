import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Sanjay Jain',
  description: 'Meet Sanjay Jain, the consultant associated with Homestyle Vastu, offering Vastu Shastra and Feng Shui guidance for homes and businesses.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Sanjay Jain | Homestyle Vastu',
    description: 'Meet Sanjay Jain, the consultant associated with Homestyle Vastu.',
    url: '/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Sanjay Jain | Homestyle Vastu',
    description: 'Meet Sanjay Jain, the consultant associated with Homestyle Vastu.',
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
      <div className="flex flex-col md:flex-row gap-12 md:gap-16">
        <div className="w-full md:w-1/3">
          <div className="aspect-[3/4] w-full bg-secondary/30 rounded-2xl p-6 relative overflow-hidden flex items-center justify-center border border-border">
             <div className="absolute inset-0 opacity-10 flex items-center justify-center">
               <svg width="150" height="150" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                 <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="1" />
                 <rect x="25" y="25" width="50" height="50" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(45 50 50)" />
                 <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
               </svg>
             </div>
             <div className="z-10 text-center">
                <div className="font-headline text-4xl font-bold text-foreground">SJ</div>
             </div>
          </div>
          <div className="mt-6 text-center md:text-left">
            <h1 className="text-3xl font-headline font-bold text-foreground">Sanjay Jain</h1>
            <p className="text-primary font-medium mt-1">Consultant</p>
          </div>
        </div>
        
        <div className="w-full md:w-2/3 space-y-8">
          <section>
            <h2 className="text-2xl font-headline font-bold mb-4">About the Practice</h2>
            <div className="space-y-4 text-lg text-foreground/80 font-body leading-relaxed">
              <p>
                Sanjay Jain is the consultant associated with Homestyle Vastu. The practice offers Vastu Shastra and Feng Shui guidance for residential and commercial properties.
              </p>
              <p>
                Visitors can contact the practice to discuss their property, the guidance they are looking for, and whether an on-site or online/remote consultation format may suit them.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-headline font-bold mb-4">Our Approach</h2>
            <div className="space-y-4 text-lg text-foreground/80 font-body leading-relaxed">
              <p>
                Homestyle Vastu lists residential and commercial Vastu, Feng Shui guidance, and on-site and online/remote consultation formats.
              </p>
              <p>
                No outcome or result is promised. Contact Sanjay Jain to discuss what guidance may be relevant to your property.
              </p>
              <p>
                For details about the service categories and consultation formats, explore the Services page or contact the practice directly.
              </p>
            </div>
          </section>

          <section className="pt-6 border-t border-border">
            <h3 className="text-xl font-headline font-bold mb-4">Start a Conversation</h3>
            <p className="text-foreground/70 mb-6">
              If you are considering a consultation for your home or business, please reach out to discuss how we can assist with your specific property.
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              <Link href="/contact">
                Get in Touch
              </Link>
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
}
