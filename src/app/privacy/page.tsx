import { Metadata } from 'next';
import { ADDRESS, BRAND_NAME, PHONE_E164, WHATSAPP_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${BRAND_NAME} handles information submitted through its consultation form.`,
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: `Privacy Policy | ${BRAND_NAME}`,
    description: `How ${BRAND_NAME} handles information submitted through its consultation form.`,
    url: '/privacy',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Privacy Policy | ${BRAND_NAME}`,
    description: `How ${BRAND_NAME} handles information submitted through its consultation form.`,
  },
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16 md:py-24">
      <h1 className="mb-8 text-4xl font-headline font-bold">Privacy Policy</h1>

      <div className="prose prose-stone max-w-none space-y-6 font-body text-foreground/80">
        <p>Last updated: October 2026</p>

        <section className="space-y-4">
          <h2 className="text-2xl font-headline font-semibold text-foreground">Information you submit</h2>
          <p>
            If you use the consultation form, {BRAND_NAME} collects the details you choose to provide: your name, phone number, optional email address, city or location, property category, service interest, preferred consultation format, and inquiry message.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-headline font-semibold text-foreground">How the information is used and stored</h2>
          <p>
            This is a temporary preview site. Because a final data retention policy is still pending, please do not submit real inquiries or real personal data through the consultation form.
          </p>
          <p>
            The information is stored in the website&apos;s inquiry database so the practice can review your request and discuss possible next steps. The website and database are hosted by Hostinger.
          </p>
          <p>
            The consultation form does not send an automatic email confirmation or notification. If you provide an email address, it is stored with your inquiry; adding an address does not trigger an email.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-headline font-semibold text-foreground">WhatsApp</h2>
          <p>
            After your inquiry is saved, the website opens WhatsApp with a prefilled draft that names the service category you selected. The link does not include your property category, name, phone number, email, location, or free-text inquiry. The draft is not sent until you choose to press Send in WhatsApp; its own privacy terms apply to that conversation.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-headline font-semibold text-foreground">Your information</h2>
          <p>
            To ask about your submitted information or request a correction or deletion, contact {BRAND_NAME} by phone or WhatsApp. Please include enough context to identify the inquiry without sending sensitive documents.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-headline font-semibold text-foreground">Contact</h2>
          <address className="not-italic">
            {BRAND_NAME}<br />
            {ADDRESS.neighborhood}, {ADDRESS.locality}<br />
            {ADDRESS.region} {ADDRESS.postalCode}, {ADDRESS.country}<br />
            Phone: {PHONE_E164}; WhatsApp: {WHATSAPP_URL}
          </address>
        </section>
      </div>
    </div>
  );
}
