import Link from 'next/link';
import { Compass, MessageCircle, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#586b56]/30 bg-[#334436] text-white">
      <div className="container mx-auto grid gap-10 px-4 py-12 md:grid-cols-[1.3fr_0.7fr_1fr] md:px-8 md:py-14">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 rounded-sm font-headline text-xl font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#334436]">
            <Compass className="h-5 w-5 text-[#f0c46f]" aria-hidden="true" />
            Homestyle Vastu
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/75">
            Vastu Shastra and Feng Shui consultation categories for homes and businesses.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <h2 className="font-semibold">Explore</h2>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            <li><Link href="/services" className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Services</Link></li>
            <li><Link href="/about" className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">About</Link></li>
            <li><Link href="/contact" className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Contact</Link></li>
          </ul>
        </nav>
        <div>
          <h2 className="font-semibold">Get in touch</h2>
          <div className="mt-4 flex flex-col items-start gap-3 text-sm">
            <a href="tel:+919828088678" className="inline-flex items-center gap-2 rounded-sm text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              <Phone className="h-4 w-4" aria-hidden="true" /> +91 98280 88678
            </a>
            <a href="https://wa.me/919828088678" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-sm text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> Message on WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="container mx-auto px-4 py-4 text-xs text-white/65 flex flex-col sm:flex-row justify-between items-center md:px-8">
          <div>&copy; {new Date().getFullYear()} Homestyle Vastu. All rights reserved.</div>
          <Link href="/privacy" className="mt-2 sm:mt-0 hover:text-white transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
