import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'About Sanjay Jain',
  description: 'Meet Sanjay Jain, Vastu and Feng Shui consultant at Homestyle Vastu, with 22 years of experience as of 2026. Guidance for homes, businesses, plots, builds, renovations, factories, and online floor-plan review.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Sanjay Jain | Homestyle Vastu',
    description: 'Meet Sanjay Jain, Vastu and Feng Shui consultant at Homestyle Vastu, with 22 years of experience as of 2026.',
    url: '/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Sanjay Jain | Homestyle Vastu',
    description: 'Meet Sanjay Jain, Vastu and Feng Shui consultant at Homestyle Vastu, with 22 years of experience as of 2026.',
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
      <div className="flex flex-col md:flex-row gap-12 md:gap-16">
        <div className="w-full md:w-1/3">
          <div className="aspect-[3/4] w-full bg-[#f3ede3] rounded-2xl relative overflow-hidden flex items-center justify-center border border-[#dfd5c7] shadow-sm">
             <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#e9bd65]/30 blur-xl" />
             <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-[#99a98d]/30 blur-xl" />
             <div className="absolute inset-0 opacity-20 flex items-center justify-center text-[#897966]">
               <svg width="200" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                 <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
                 <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(45 50 50)" />
                 <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.5" />
                 <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.5" />
                 <circle cx="50" cy="50" r="5" fill="currentColor" />
               </svg>
             </div>
             <div className="z-10 text-center">
                <div className="font-headline text-5xl font-bold text-[#334436]">SJ</div>
             </div>
          </div>
          <div className="mt-6 text-center md:text-left">
            <h1 className="text-3xl font-headline font-bold text-foreground">Sanjay Jain</h1>
            <p className="text-primary font-medium mt-1">Vastu &amp; Feng Shui Consultant</p>
          </div>
        </div>

        <div className="w-full md:w-2/3 space-y-8">
          <section>
            <h2 className="text-2xl font-headline font-bold mb-4">About the Practice</h2>
            <div className="space-y-4 text-lg text-foreground/80 font-body leading-relaxed">
              <p>
                Sanjay Jain is the consultant at Homestyle Vastu, with 22 years of experience as of 2026. He provides Vastu Shastra and Feng Shui guidance for homes and businesses, plot and land selection, construction or renovation, industrial and factory properties, and online floor-plan review.
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
                Guidance covers homes and businesses, plot or land selection, new construction or renovation, industrial and factory properties, and online floor-plan review. On-site and online/remote formats are available.
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
              Share your property type, project stage and questions to discuss which guidance or consultation format may be relevant.
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
