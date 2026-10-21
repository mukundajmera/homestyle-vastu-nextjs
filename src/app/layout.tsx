import type { Metadata } from 'next';
import { Inter, Literata } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { getSiteOrigin, isPublicProduction } from '@/lib/site';

const isProduction = isPublicProduction();
const baseUrl = getSiteOrigin();
const bodyFont = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const headlineFont = Literata({ subsets: ['latin'], display: 'swap', variable: '--font-literata' });

export const metadata: Metadata = {
  title: {
    default: 'Homestyle Vastu - Vastu & Feng Shui Consultations',
    template: '%s | Homestyle Vastu'
  },
  description: 'Vastu Shastra and Feng Shui guidance with Sanjay Jain for homes, businesses, plots, construction and renovation, industrial spaces, and online floor-plan review.',
  keywords: ['Vastu Shastra', 'Feng Shui', 'consultation', 'residential Vastu', 'commercial Vastu', 'plot selection', 'construction Vastu', 'industrial Vastu', 'online floor-plan review', 'Sanjay Jain'],
  authors: [{ name: 'Sanjay Jain' }],
  creator: 'Homestyle Vastu',
  publisher: 'Homestyle Vastu',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(baseUrl),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Homestyle Vastu - Vastu & Feng Shui Consultations',
    description: 'Vastu and Feng Shui guidance for homes, businesses, plots, construction and renovation, industrial spaces, and online floor-plan review.',
    siteName: 'Homestyle Vastu',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Homestyle Vastu - Vastu & Feng Shui Consultations',
    description: 'Vastu and Feng Shui guidance for homes, businesses, plots, construction and renovation, industrial spaces, and online floor-plan review.',
  },
  robots: isProduction
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      }
    : {
        index: false,
        follow: false,
      },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Homestyle Vastu",
  "@id": `${baseUrl}/#business`,
  "url": baseUrl,
  "telephone": "+919828088678",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Shivam Apartment, Acharya Kriplani Marg, Anand Puri, Bees Dukan, Adarsh Nagar",
    "addressLocality": "Jaipur",
    "addressRegion": "Rajasthan",
    "postalCode": "302004",
    "addressCountry": "IN"
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
