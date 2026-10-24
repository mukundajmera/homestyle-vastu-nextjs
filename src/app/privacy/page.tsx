import { Metadata } from 'next';
import { ADDRESS, BRAND_NAME, PERSON_NAME, PHONE_E164, SITE_ORIGIN, WHATSAPP_URL } from '@/lib/site';

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

const sectionHeadingClass = 'text-2xl font-headline font-semibold text-foreground';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16 md:py-24">
      <h1 className="mb-8 text-4xl font-headline font-bold">Privacy Policy — {BRAND_NAME}</h1>

      <div className="prose prose-stone max-w-none space-y-6 font-body text-foreground/80">
        <p>Version v2.0</p>

        <section className="space-y-4">
          <h2 className={sectionHeadingClass}>1. Who we are</h2>
          <p>
            I&apos;m {PERSON_NAME}, and I run {BRAND_NAME}, a Vastu and Feng Shui consultation practice in Jaipur, Rajasthan. This policy explains how I handle information you provide through{' '}
            <a href={SITE_ORIGIN}>fengshuihomestylevastu.com</a>.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className={sectionHeadingClass}>2. Information we collect</h2>
          <p>
            When you submit the contact form, I collect your full name, phone number, city or location, property type, service interest, and preferred consultation format (on-site or online/remote). You may also provide an email address and inquiry text of up to 1,000 characters.
          </p>
          <p>
            The form records your consent tick and its timestamp, and the privacy policy version you accepted. It also creates an anonymous submission ID and a hashed payload fingerprint, used only to prevent duplicate submissions.
          </p>
          <p>
            To limit spam, the form uses a hidden honeypot field and a one-way hash of your phone number for a 15-minute rate limit.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className={sectionHeadingClass}>3. How we use it</h2>
          <p>I use your information to reply to your enquiry and arrange the consultation you ask for. I do not send email or SMS notifications.</p>
        </section>

        <section className="space-y-4">
          <h2 className={sectionHeadingClass}>4. Legal basis and consent</h2>
          <p>
            I rely on your consent under India&apos;s Digital Personal Data Protection Act, 2023. You give consent by ticking the consent box on the form. The form records the policy version you accepted.
          </p>
          <p>You can withdraw your consent using the contact details in section 8. This stops further contact about your enquiry.</p>
        </section>

        <section className="space-y-4">
          <h2 className={sectionHeadingClass}>5. Storage and security</h2>
          <p>I store enquiries in a MySQL database hosted by Hostinger, in a table named <code>leads</code>. Access is limited to me.</p>
          <p>The website uses HTTPS and server-side validation. The website does not take payment data.</p>
        </section>

        <section className="space-y-4">
          <h2 className={sectionHeadingClass}>6. Retention</h2>
          <p>
            I keep each enquiry for as long as needed to respond to it and keep a record of the consultation, then delete it. I delete it sooner if you request deletion or when the purpose ends.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className={sectionHeadingClass}>7. Sharing</h2>
          <p>
            I do not share your information with third parties, except Hostinger as the website hosting and database provider, and only as needed to run the site. I do not sell your information.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className={sectionHeadingClass}>8. Your rights and how to use them</h2>
          <p>
            Under the Digital Personal Data Protection Act, 2023, you can request access to, correction of, or erasure of your information. You can also withdraw consent, which stops further contact, and raise a grievance with me first.
          </p>
          <p>To make a request or raise a grievance, call <a href={`tel:${PHONE_E164}`}>{PHONE_E164}</a> or <a href={WHATSAPP_URL}>message me on WhatsApp</a>, or write to:</p>
          <address className="not-italic">
            <strong>{BRAND_NAME}</strong><br />
            {ADDRESS.street}<br />
            {ADDRESS.locality}, {ADDRESS.region} {ADDRESS.postalCode}, {ADDRESS.country}
          </address>
        </section>

        <section className="space-y-4">
          <h2 className={sectionHeadingClass}>9. Children</h2>
          <p>The service is for adults aged 18 or over. I do not knowingly collect personal data from children.</p>
        </section>

        <section className="space-y-4">
          <h2 className={sectionHeadingClass}>10. Cookies and tracking</h2>
          <p>
            I do not use analytics or advertising cookies. Phone and WhatsApp links open third-party apps only if you click them. I do not embed maps or external sites.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className={sectionHeadingClass}>11. Changes to this policy</h2>
          <p>When I change this policy, I change its version. The version shown when you submit the form is the one you accept.</p>
          <p>Effective from 25 October 2026.</p>
        </section>

        <section className="space-y-4">
          <h2 className={sectionHeadingClass}>12. Contact</h2>
          <p>For privacy questions, requests, or grievances, call <a href={`tel:${PHONE_E164}`}>{PHONE_E164}</a> or <a href={WHATSAPP_URL}>message me on WhatsApp</a>, or write to:</p>
          <address className="not-italic">
            {ADDRESS.street}<br />
            {ADDRESS.locality}, {ADDRESS.region} {ADDRESS.postalCode}, {ADDRESS.country}
          </address>
        </section>
      </div>
    </div>
  );
}
