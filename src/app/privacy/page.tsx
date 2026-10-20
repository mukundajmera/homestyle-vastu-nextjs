import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Homestyle Vastu website and consultations.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
      <h1 className="text-4xl font-headline font-bold mb-8">Privacy Policy</h1>

      <div className="prose prose-stone max-w-none text-foreground/80 space-y-6 font-body">
        <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>

        <section className="space-y-4">
          <h2 className="text-2xl font-headline font-semibold text-foreground">1. Information We Collect</h2>
          <p>
            When you use our website or contact us for a consultation, we may collect personal information such as your name, phone number, email address, location, and details about your inquiry. This information is collected to facilitate communication and understand your consultation needs.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-headline font-semibold text-foreground">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Respond to your inquiries and provide information about our services.</li>
            <li>Coordinate and perform residential or commercial consultations.</li>
            <li>Maintain records of our communications and services provided to you.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-headline font-semibold text-foreground">3. Information Sharing</h2>
          <p>
            We do not sell your personal information. We only share your information with necessary service providers (such as hosting and email services) to operate our business or as required by law.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-headline font-semibold text-foreground">4. Contact Options</h2>
          <p>
            By submitting our contact form, you consent to being contacted regarding your inquiry via the phone number, email, or WhatsApp details you provided.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-headline font-semibold text-foreground">5. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or your personal information, please contact us at:
          </p>
          <address className="not-italic">
            Homestyle Vastu<br />
            Shivam Apartment, Acharya Kriplani Marg<br />
            Anand Puri, Bees Dukan, Adarsh Nagar<br />
            Jaipur, Rajasthan 302004<br />
            Phone: +91 98280 88678
          </address>
        </section>
      </div>
    </div>
  );
}
