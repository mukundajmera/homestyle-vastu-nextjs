import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Homestyle Vastu handles information submitted through its consultation form.',
  alternates: { canonical: '/privacy' },
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
            If you use the consultation form, Homestyle Vastu collects the details you choose to provide: your name, phone number, optional email address, city or location, property category, service interest, preferred consultation format, and inquiry message.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-headline font-semibold text-foreground">How the information is used and stored</h2>
          <p>
            The information is stored in the website&apos;s inquiry database and used to respond to your request and discuss possible next steps. The website and database are hosted by Hostinger.
          </p>
          <p>
            The consultation form does not currently send email notifications. If you provide an email address, it is stored with your inquiry so it can be used to respond to your request.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-headline font-semibold text-foreground">WhatsApp</h2>
          <p>
            After a successful form submission, the website opens WhatsApp with a short message about the service you selected. Your name, phone number, email, location, and inquiry message are not placed in that link. WhatsApp receives information only if you choose to send a message there; its own privacy terms apply to that conversation.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-headline font-semibold text-foreground">Your information</h2>
          <p>
            To ask about your submitted information or request a correction or deletion, contact Homestyle Vastu by phone or WhatsApp. Please include enough context to identify the inquiry without sending sensitive documents.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-headline font-semibold text-foreground">Contact</h2>
          <address className="not-italic">
            Homestyle Vastu<br />
            Shivam Apartment, Acharya Kriplani Marg<br />
            Anand Puri, Bees Dukan, Adarsh Nagar<br />
            Jaipur, Rajasthan 302004<br />
            Phone and WhatsApp: +91 98280 88678
          </address>
        </section>
      </div>
    </div>
  );
}
