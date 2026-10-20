import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: {
    default: 'Homestyle Vastu - Vastu & Feng Shui Consultations',
    template: '%s | Homestyle Vastu'
  },
  description: 'Vastu Shastra and Feng Shui consultations for homes and businesses with Sanjay Jain. Ask about residential or commercial guidance and available formats.',
  keywords: ['Vastu Shastra', 'Feng Shui', 'consultation', 'space planning', 'residential vastu', 'commercial vastu', 'Sanjay Jain'],
  authors: [{ name: 'Sanjay Jain' }],
  creator: 'Homestyle Vastu',
  publisher: 'Homestyle Vastu',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.fengshuihomestylevastu.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Homestyle Vastu - Vastu & Feng Shui Consultations',
    description: 'Vastu Shastra and Feng Shui consultations for homes and businesses with Sanjay Jain.',
    siteName: 'Homestyle Vastu',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Homestyle Vastu - Vastu & Feng Shui Consultations',
    description: 'Vastu Shastra and Feng Shui consultations for homes and businesses with Sanjay Jain.',
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Homestyle Vastu",
  "@id": "https://www.fengshuihomestylevastu.com",
  "url": "https://www.fengshuihomestylevastu.com",
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
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Residential Vastu Consultation"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Commercial Vastu Consultation"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Feng Shui Consultation"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Literata:ital,opsz,wght@0,7..72,200..900;1,7..72,200..900&display=swap" rel="stylesheet" />
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
