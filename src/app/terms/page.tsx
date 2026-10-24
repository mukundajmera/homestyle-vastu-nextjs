import { Metadata } from 'next';
import { ADDRESS, BRAND_NAME, PERSON_NAME, PHONE_E164, SITE_ORIGIN, WHATSAPP_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of Use and Disclaimer',
  description: `Terms of use for the ${BRAND_NAME} website, and the advisory nature of Vastu and Feng Shui guidance.`,
  alternates: { canonical: '/terms' },
  openGraph: {
    title: `Terms of Use and Disclaimer | ${BRAND_NAME}`,
    description: `Terms of use for the ${BRAND_NAME} website, and the advisory nature of Vastu and Feng Shui guidance.`,
    url: '/terms',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Terms of Use and Disclaimer | ${BRAND_NAME}`,
    description: `Terms of use for the ${BRAND_NAME} website, and the advisory nature of Vastu and Feng Shui guidance.`,
  },
};

const sectionHeadingClass = 'text-2xl font-headline font-semibold text-foreground';

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16 md:py-24">
      <h1 className="mb-8 text-4xl font-headline font-bold">Terms of Use and Disclaimer</h1>
      <div className="prose prose-stone max-w-none space-y-6 font-body text-foreground/80">
        <p>Version v1.0. Effective from 25 October 2026.</p>

        <section className="space-y-4">
          <h2 className={sectionHeadingClass}>1. Who we are</h2>
          <p>
            I am {PERSON_NAME}. I run {BRAND_NAME}, a Vastu and Feng Shui consultation practice in Jaipur, Rajasthan. These terms apply to the website at{' '}
            <a href={SITE_ORIGIN}>fengshuihomestylevastu.com</a>. By using the website, you agree to these terms. If you do not agree, please do not use the website.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className={sectionHeadingClass}>2. What the website is for</h2>
          <p>
            The website describes my services and invites you to request a consultation. It gives general information about Vastu Shastra and Feng Shui. It is not a substitute for a consultation.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className={sectionHeadingClass}>3. Nature of the guidance</h2>
          <p>
            Vastu Shastra and Feng Shui are traditional systems of guidance about the arrangement of space. The guidance I give reflects those traditions and my own experience. It is advisory only.
          </p>
          <p>
            The guidance is not structural, engineering, architectural, legal, financial, medical, or tax advice. It does not promise any particular outcome for health, wealth, career, relationships, or property. Before you act on any guidance that involves construction, repairs, or money, please consult a qualified professional.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className={sectionHeadingClass}>4. Information on this website</h2>
          <p>
            I try to keep the information on this website accurate and up to date, but I do not guarantee that it is complete or current. Descriptions of services, locations, and contact details may change without notice.
          </p>
          <p>
            Example floor plans, compass diagrams, and illustrations on the website are for explanation only. They are not drawings of any property.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className={sectionHeadingClass}>5. Consultations and fees</h2>
          <p>
            Submitting the contact form does not create a consultation or a paid engagement. A consultation begins only after we agree the service, the format (on-site or online), and the fees in writing. Any refund or cancellation terms are agreed at the same time.
          </p>
          <p>
            You can contact me by phone at <a href={`tel:${PHONE_E164}`}>{PHONE_E164}</a> or on <a href={WHATSAPP_URL}>WhatsApp</a>.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className={sectionHeadingClass}>6. Acceptable use</h2>
          <p>You agree to use the website lawfully and not to:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>submit false, misleading, or someone else&apos;s personal information;</li>
            <li>submit the form automatically or in bulk;</li>
            <li>attempt to break, overload, or gain unauthorised access to the website or its data;</li>
            <li>copy or reuse the website&apos;s text, images, or layout without written permission, except for personal, non-commercial reference.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className={sectionHeadingClass}>7. Intellectual property</h2>
          <p>
            The text, images, and design of this website belong to me or to the people who licensed them to me. Nothing in these terms transfers any of those rights to you.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className={sectionHeadingClass}>8. Links and contact methods</h2>
          <p>
            The website links to phone and WhatsApp. These open third-party apps only if you choose to use them, and their own terms then apply. I am not responsible for other websites or apps.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className={sectionHeadingClass}>9. Personal information</h2>
          <p>
            How I collect and use personal information submitted through the form is set out in the{' '}
            <a href="/privacy">Privacy Policy</a>. Please read it before you submit the form.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className={sectionHeadingClass}>10. Disclaimer and limitation of liability</h2>
          <p>
            The website is provided as it is, without warranties of any kind, to the extent permitted by law. I am not liable for any loss or damage arising from your use of the website or from reliance on its content, except where the law does not allow that to be excluded.
          </p>
          <p>
            Nothing in these terms limits liability that cannot be limited under the law of India.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className={sectionHeadingClass}>11. Changes to these terms</h2>
          <p>
            I may update these terms. When I do, I change the version number and the effective date shown at the top of this page. Your continued use of the website after that means you accept the updated terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className={sectionHeadingClass}>12. Governing law and disputes</h2>
          <p>
            These terms are governed by the laws of India. Courts in Jaipur, Rajasthan, have jurisdiction over any dispute arising from them, subject to any mandatory rights you have under the law.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className={sectionHeadingClass}>13. Contact</h2>
          <p>
            For questions about these terms, call <a href={`tel:${PHONE_E164}`}>{PHONE_E164}</a> or <a href={WHATSAPP_URL}>message me on WhatsApp</a>, or write to:
          </p>
          <address className="not-italic">
            {BRAND_NAME}<br />
            {ADDRESS.neighborhood}, {ADDRESS.locality}, {ADDRESS.region} {ADDRESS.postalCode}, {ADDRESS.country}
          </address>
        </section>
      </div>
    </div>
  );
}
