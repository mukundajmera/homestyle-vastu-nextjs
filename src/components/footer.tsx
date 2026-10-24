import Link from 'next/link';
import { MapPin, MessageCircle, Phone } from 'lucide-react';
import { BrandMark } from '@/components/brand-mark';
import { ADDRESS, BRAND_NAME, PHONE_E164, WHATSAPP_URL } from '@/lib/site';

const linkClass =
  'inline-flex min-h-11 items-center rounded-sm py-1.5 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-secondary">
      <div className="container mx-auto grid gap-10 px-4 py-12 md:grid-cols-[1.4fr_0.6fr_1.2fr] md:px-8 md:py-14">
        <div>
          <Link href="/" className="inline-flex min-h-11 items-center gap-2.5 rounded-sm font-headline text-xl font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <BrandMark className="h-8 w-8" />
            {BRAND_NAME}
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-foreground/85">
            Vastu Shastra and Feng Shui consultation with Sanjay Jain for homes, businesses, plots, builds and factories.
          </p>
          <address className="mt-5 flex max-w-sm items-start gap-2 text-sm not-italic leading-6 text-foreground/85">
            <MapPin className="mt-1 h-4 w-4 shrink-0 text-terracotta-ink" aria-hidden="true" />
            <span>
              {ADDRESS.neighborhood}, {ADDRESS.locality}, {ADDRESS.region} {ADDRESS.postalCode}, {ADDRESS.country}
            </span>
          </address>
        </div>
        <nav aria-label="Footer navigation">
          <h2 className="eyebrow font-body">Explore</h2>
          <ul className="mt-3 space-y-1 text-sm text-foreground/80">
            <li><Link href="/services" className={`inline-block ${linkClass}`}>Services</Link></li>
            <li><Link href="/about" className={`inline-block ${linkClass}`}>About</Link></li>
            <li><Link href="/contact" className={`inline-block ${linkClass}`}>Contact</Link></li>
          </ul>
        </nav>
        <div>
          <h2 className="eyebrow font-body">Get in touch</h2>
          <div className="mt-3 flex flex-col items-start gap-1 text-sm text-foreground/80">
            <a href={`tel:${PHONE_E164}`} className={`inline-flex items-center gap-2 ${linkClass}`}>
              <Phone className="h-4 w-4" aria-hidden="true" /> {PHONE_E164.replace('+91', '+91 ').replace(/(\d{5})(\d{5})/, '$1 $2')}
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 ${linkClass}`}>
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> Message on WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container mx-auto flex flex-col items-center justify-between px-4 py-4 text-xs text-muted-foreground sm:flex-row md:px-8">
          <div>&copy; {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</div>
          <Link href="/privacy" className="mt-2 inline-flex min-h-11 items-center py-1.5 hover:text-primary sm:mt-0">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
