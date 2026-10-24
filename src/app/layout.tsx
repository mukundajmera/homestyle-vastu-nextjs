import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { ADDRESS, BRAND_NAME, BRAND_TITLE, PERSON_NAME, PHONE_E164, SITE_ORIGIN } from '@/lib/site';

const bodyFont = Plus_Jakarta_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-body' });
const headlineFont = Playfair_Display({ subsets: ['latin'], display: 'swap', variable: '--font-headline' });

export const metadata: Metadata = {
  title: {
    default: `${BRAND_TITLE} | Vastu & Feng Shui`,
    template: `%s | ${BRAND_NAME}`
  },
  description: 'Vastu Shastra and Feng Shui guidance with Sanjay Jain for homes, businesses, plots, construction and renovation, industrial spaces, and online floor-plan review.',
  keywords: ['Vastu Shastra', 'Feng Shui', 'consultation', 'residential Vastu', 'commercial Vastu', 'plot selection', 'construction Vastu', 'industrial Vastu', 'online floor-plan review', 'Sanjay Jain', 'Vastu consultant Jaipur', 'Feng Shui Jaipur'],
  authors: [{ name: PERSON_NAME }],
  creator: BRAND_NAME,
  publisher: BRAND_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_ORIGIN),
  alternates: {
    canonical: SITE_ORIGIN,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_ORIGIN,
    title: `${BRAND_TITLE} | Vastu & Feng Shui`,
    description: 'Vastu and Feng Shui guidance for homes, businesses, plots, construction and renovation, industrial spaces, and online floor-plan review.',
    siteName: BRAND_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND_TITLE} | Vastu & Feng Shui`,
    description: 'Vastu and Feng Shui guidance for homes, businesses, plots, construction and renovation, industrial spaces, and online floor-plan review.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": BRAND_NAME,
  "@id": `${SITE_ORIGIN}/#business`,
  "url": SITE_ORIGIN,
  "telephone": PHONE_E164,
  "address": {
    "@type": "PostalAddress",
    "addressLocality": ADDRESS.locality,
    "addressRegion": ADDRESS.region,
    "postalCode": ADDRESS.postalCode,
    "addressCountry": ADDRESS.countryCode
  },
  "makesOffer": [
    "Residential Vastu consultation",
    "Commercial Vastu consultation",
    "Feng Shui consultation",
    "Plot and land selection guidance",
    "Vastu guidance for new construction or renovation",
    "Industrial and factory Vastu guidance",
    "Online floor-plan review"
  ].map((name) => ({ "@type": "Offer", "itemOffered": { "@type": "Service", name } }))
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${headlineFont.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col bg-background text-foreground">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground p-4 z-50 rounded-md">Skip to content</a>
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
