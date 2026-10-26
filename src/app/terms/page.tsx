import { Metadata } from 'next';
import { ADDRESS, BRAND_NAME, PERSON_NAME, PHONE_E164, SITE_ORIGIN, WHATSAPP_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: `Terms for using the ${BRAND_NAME} website and receiving Vastu and Feng Shui consultation guidance.`,
  alternates: { canonical: '/terms' },
  openGraph: {
    title: `Terms of Use | ${BRAND_NAME}`,
    description: `Terms for using the ${BRAND_NAME} website and receiving Vastu and Feng Shui consultation guidance.`,
    url: '/terms',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Terms of Use | ${BRAND_NAME}`,
    description: `Terms for using the ${BRAND_NAME} website and receiving Vastu and Feng Shui consultation guidance.`,
  },
};

const sectionHeadingClass = 'text-2xl font-headline font-semibold text-foreground';

const sections = [
  ['about-these-terms', 'About these terms'],
  ['consultation-guidance', 'Consultation guidance'],
  ['your-information', 'Information you provide'],
  ['booking-and-fees', 'Bookings, fees and changes'],
  ['reports-and-materials', 'Reports and materials'],
  ['website-use', 'Using this website'],
  ['third-party-services', 'Third-party links and services'],
  ['liability', 'Responsibility and liability'],
  ['changes-and-law', 'Changes and governing law'],
  ['contact', 'Contact'],
] as const;

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16 md:py-24">
      <h1 className="mb-4 text-4xl font-headline font-bold">Terms of Use</h1>
      <p className="mb-8 text-sm text-foreground/70">Last updated: 27 October 2026</p>

      <aside aria-label="Terms summary" className="mb-10 rounded-lg border border-border bg-secondary/60 p-5">
        <h2 className="mb-2 font-headline text-xl font-semibold text-foreground">In short</h2>
        <p className="leading-relaxed text-foreground/80">
          Vastu and Feng Shui consultations provide thoughtful, traditional-knowledge guidance based on the information you share. Results vary and cannot be promised. We agree the service, format, fees and cancellation arrangements with you in writing before work begins. Please use the site lawfully and consult qualified professionals for technical or regulated advice.
        </p>
      </aside>

      <nav aria-label="On this page" className="mb-10 rounded-lg border border-border p-5">
        <h2 className="mb-3 font-headline text-xl font-semibold text-foreground">On this page</h2>
        <ol className="list-decimal space-y-1 pl-5">
          {sections.map(([id, title]) => (
            <li key={id}><a className="underline underline-offset-2" href={`#${id}`}>{title}</a></li>
          ))}
        </ol>
      </nav>

      <div className="prose prose-stone max-w-none space-y-8 font-body text-foreground/80">
        <section id="about-these-terms" className="scroll-mt-24 space-y-4">
          <h2 className={sectionHeadingClass}>1. About these terms</h2>
          <p>These terms apply when you use <a href={SITE_ORIGIN}>{SITE_ORIGIN.replace('https://www.', '')}</a> or ask {PERSON_NAME}, of {BRAND_NAME}, for a consultation. By using the website, you agree to these terms. If you do not agree, please do not use the site.</p>
          <p>The website provides information about consultation services and a way to send an enquiry. Sending an enquiry does not itself create a booking or paid engagement.</p>
        </section>

        <section id="consultation-guidance" className="scroll-mt-24 space-y-4">
          <h2 className={sectionHeadingClass}>2. Consultation guidance</h2>
          <p>Guidance is offered in good faith, based on classical Vastu and Feng Shui principles and the details you provide about your property and goals. Every property and circumstance is different, so results vary and cannot be promised.</p>
          <p>The guidance is advisory and reflects traditional knowledge. It is not a substitute for structural, engineering, architectural, building-code, legal, medical, financial or other regulated professional advice. Please consult a suitably qualified professional before making construction, safety, health, legal or financial decisions.</p>
          <p>Examples, illustrations and general information on this website are for explanation only and are not a technical plan or an assessment of your property.</p>
        </section>

        <section id="your-information" className="scroll-mt-24 space-y-4">
          <h2 className={sectionHeadingClass}>3. Information you provide</h2>
          <p>Please make sure that contact details, plans, measurements, photographs and other information you choose to share are accurate and that you have permission to share them. Our guidance depends on the information available; missing or inaccurate details may affect its usefulness.</p>
          <p>How enquiry information is handled is explained in our <a href="/privacy">Privacy Policy</a>.</p>
        </section>

        <section id="booking-and-fees" className="scroll-mt-24 space-y-4">
          <h2 className={sectionHeadingClass}>4. Bookings, fees and changes</h2>
          <p>Before work begins, we will agree with you in writing what the consultation includes, whether it will be on-site or online, the fees and any payment timing, and the rescheduling or cancellation arrangements. Any travel or additional-work charges will also be agreed in writing before they are incurred.</p>
          <p>A booking is confirmed when we have agreed those details in writing. Please contact us as early as possible to reschedule or cancel. Any applicable refund or cancellation rights under Indian law continue to apply.</p>
          <p>For enquiries, call <a href={`tel:${PHONE_E164}`}>{PHONE_E164}</a> or <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">message us on WhatsApp</a>.</p>
        </section>

        <section id="reports-and-materials" className="scroll-mt-24 space-y-4">
          <h2 className={sectionHeadingClass}>5. Reports and materials</h2>
          <p>Unless agreed otherwise in writing, original consultation reports, diagrams and written recommendations prepared for you remain the intellectual property of {PERSON_NAME} or their respective rights holders. Once agreed fees are paid, you may use your report for your own personal or business property decisions.</p>
          <p>Please do not publish, sell, alter or distribute a report or consultation material, or use it for another property or client, without written permission. This does not affect rights that cannot be restricted by law.</p>
        </section>

        <section id="website-use" className="scroll-mt-24 space-y-4">
          <h2 className={sectionHeadingClass}>6. Using this website</h2>
          <p>Use the website lawfully and respectfully. You must not submit false or unauthorised personal information, send bulk or automated submissions, interfere with the site, attempt unauthorised access, introduce malicious code, or copy and reuse site content for commercial purposes without permission.</p>
          <p>We aim to keep site information useful and current, but it may change and is provided for general information. We may temporarily suspend or change parts of the site for maintenance, security or operational reasons.</p>
        </section>

        <section id="third-party-services" className="scroll-mt-24 space-y-4">
          <h2 className={sectionHeadingClass}>7. Third-party links and services</h2>
          <p>This website may link to services such as WhatsApp, Instagram, phone diallers or map providers. You choose whether to open those services. They are operated by third parties under their own terms and privacy practices, and we do not control their content or availability.</p>
        </section>

        <section id="liability" className="scroll-mt-24 space-y-4">
          <h2 className={sectionHeadingClass}>8. Responsibility and liability</h2>
          <p>To the extent permitted by Indian law, we are not responsible for loss arising from reliance on general website information, decisions made without obtaining appropriate professional advice, or events beyond our reasonable control. Nothing here removes responsibility for a service we have expressly agreed to provide.</p>
          <p>Where the law permits, liability connected with this website or a consultation is limited to the fees paid for the relevant service. This limit does not apply to liability that cannot lawfully be excluded or limited, including any mandatory consumer rights or remedies.</p>
        </section>

        <section id="changes-and-law" className="scroll-mt-24 space-y-4">
          <h2 className={sectionHeadingClass}>9. Changes and governing law</h2>
          <p>We may update these terms from time to time. The latest version and its update date will appear on this page. Updated terms apply to future use of the website and to a consultation only where agreed or permitted by law.</p>
          <p>These terms are governed by the laws of India. Subject to applicable law and any mandatory forum rights, courts with jurisdiction in Jaipur, Rajasthan will hear disputes relating to these terms or the website.</p>
        </section>

        <section id="contact" className="scroll-mt-24 space-y-4">
          <h2 className={sectionHeadingClass}>10. Contact</h2>
          <p>For questions about these terms or a consultation, contact {PERSON_NAME} by calling <a href={`tel:${PHONE_E164}`}>{PHONE_E164}</a> or <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">sending a WhatsApp message</a>, or write to:</p>
          <address className="not-italic">
            {BRAND_NAME}<br />{ADDRESS.street}<br />{ADDRESS.locality}, {ADDRESS.region} {ADDRESS.postalCode}, {ADDRESS.country}
          </address>
        </section>
      </div>
    </div>
  );
}
