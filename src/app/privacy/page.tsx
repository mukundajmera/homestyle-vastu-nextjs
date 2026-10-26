import { Metadata } from 'next';
import { ADDRESS, BRAND_NAME, PERSON_NAME, PHONE_E164, SITE_ORIGIN, WHATSAPP_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Read how ${BRAND_NAME} collects, uses, stores and protects enquiry information, and how to exercise your privacy rights.`,
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

const sections = [
  ['who-we-are', 'Who is responsible for your information?'],
  ['information-we-collect', 'What information do we collect?'],
  ['why-we-use-information', 'Why do we use it?'],
  ['consent-and-law', 'Consent and applicable law'],
  ['service-providers', 'Who may process your information?'],
  ['retention-and-security', 'How long do we keep it, and how do we protect it?'],
  ['your-rights', 'Your choices and privacy rights'],
  ['children', 'Children'],
  ['cookies-and-links', 'Cookies, security checks and links'],
  ['changes-and-contact', 'Changes and contact'],
] as const;

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16 md:py-24">
      <h1 className="mb-4 text-4xl font-headline font-bold">Privacy Policy</h1>
      <p className="mb-8 text-sm text-foreground/70">Last updated: 27 October 2026</p>

      <aside aria-label="Privacy summary" className="mb-10 rounded-lg border border-border bg-secondary/60 p-5">
        <h2 className="mb-2 font-headline text-xl font-semibold text-foreground">In short</h2>
        <p className="leading-relaxed text-foreground/80">
          We use the details you choose to share to respond to your Vastu or Feng Shui enquiry and arrange a consultation. We keep enquiry records for up to 12 months after our last meaningful contact, use service providers to run the site and deliver notifications, and do not sell your information. You can ask a privacy question, withdraw consent, correct details or request erasure by contacting Sanjay Jain.
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
        <p>
          This policy explains how {PERSON_NAME}, trading as {BRAND_NAME}, handles personal information when you visit{' '}
          <a href={SITE_ORIGIN}>{SITE_ORIGIN.replace('https://www.', '')}</a>, send an enquiry, or arrange a consultation. We aim to handle digital personal data in line with India&apos;s Digital Personal Data Protection Act, 2023 and rules in force, and applicable requirements of the Information Technology Act, 2000.
        </p>

        <section id="who-we-are" className="scroll-mt-24 space-y-4">
          <h2 className={sectionHeadingClass}>1. Who is responsible for your information?</h2>
          <p>{PERSON_NAME} is the person responsible for enquiry information collected through this website. The practice is based in Jaipur, Rajasthan, India.</p>
          <address className="not-italic">
            {BRAND_NAME}<br />{ADDRESS.street}<br />{ADDRESS.locality}, {ADDRESS.region} {ADDRESS.postalCode}, {ADDRESS.country}
          </address>
        </section>

        <section id="information-we-collect" className="scroll-mt-24 space-y-4">
          <h2 className={sectionHeadingClass}>2. What information do we collect?</h2>
          <p>If you submit the consultation form, it asks for your name, phone number, email address, city or location, the service you need help with, and your consent to be contacted. A message about your property is optional and may be up to 1,000 characters.</p>
          <p>The form also processes a submission identifier, the time and policy version of your consent, and a fingerprint used to identify a repeated submission. To limit abuse, the service checks a one-way hash of the phone number for a short-lived rate limit. The form includes a hidden anti-spam field.</p>
          <p>Cloudflare Turnstile checks whether a form submission is likely to be automated. It receives the security-check token and technical request information needed to perform that check. Do not include sensitive personal information in the enquiry message.</p>
        </section>

        <section id="why-we-use-information" className="scroll-mt-24 space-y-4">
          <h2 className={sectionHeadingClass}>3. Why do we use it?</h2>
          <p>We use enquiry details to understand what guidance you are seeking, contact you about that enquiry, discuss and arrange a consultation, and keep the related consultation record. We use consent records to document your choice and technical anti-spam information to protect the form and reduce duplicate or abusive submissions.</p>
          <p>The details in your enquiry are sent by email to the consultant as a lead notification. The form does not take payments.</p>
        </section>

        <section id="consent-and-law" className="scroll-mt-24 space-y-4">
          <h2 className={sectionHeadingClass}>4. Consent and applicable law</h2>
          <p>The form asks you to actively agree that we may contact you about your enquiry. We record that choice, its time and the notice version shown. We use the information for the purposes explained here and handle it under applicable Indian data-protection and information-technology requirements, including the Digital Personal Data Protection Act, 2023 and applicable rules.</p>
          <p>You may withdraw your consent at any time using the contact details below. Withdrawal will not affect processing already carried out, and we may retain information where it is still needed for a lawful purpose or required by law.</p>
        </section>

        <section id="service-providers" className="scroll-mt-24 space-y-4">
          <h2 className={sectionHeadingClass}>5. Who may process your information?</h2>
          <p>We do not sell your personal information. We use service providers only as needed to operate the website and handle enquiries. These may include Hostinger for website hosting and MySQL database services, Resend for email delivery, and Cloudflare for Turnstile security checks.</p>
          <p>These providers may process information on systems in India or other countries, depending on their service and configuration. Where information is processed internationally, we will do so subject to applicable Indian law and any required safeguards. We may also disclose information if the law requires it or to protect rights, safety and the security of the service.</p>
          <p>WhatsApp is opened only if you choose to follow a WhatsApp link. That conversation is handled by WhatsApp under its own terms and privacy practices. Website form details are not placed in the WhatsApp link; the optional hand-off message describes only the service category.</p>
        </section>

        <section id="retention-and-security" className="scroll-mt-24 space-y-4">
          <h2 className={sectionHeadingClass}>6. How long do we keep it, and how do we protect it?</h2>
          <p>We keep enquiry and consultation records, including related email notification copies, for up to 12 months after our last meaningful contact about the enquiry or consultation. We then delete them, unless a longer period is reasonably needed to complete an agreed service, resolve a dispute, or meet a legal requirement. A short-lived rate-limit hash expires after 15 minutes. Copies held in routine backups may remain until those backups are overwritten.</p>
          <p>We use measures such as HTTPS, server-side input checks, restricted database access and anti-spam controls to help protect information. No online service can promise absolute security; if we become aware of a personal-data breach affecting your information, we will take the steps required by applicable law.</p>
        </section>

        <section id="your-rights" className="scroll-mt-24 space-y-4">
          <h2 className={sectionHeadingClass}>7. Your choices and privacy rights</h2>
          <p>Subject to applicable law, you may ask us to confirm and provide information about your personal data, correct or complete inaccurate details, request erasure, or withdraw consent. You may also raise a grievance about how your information is handled. We will respond and take action as required by applicable law.</p>
          <p>To make a request, contact {PERSON_NAME} at <a href={`tel:${PHONE_E164}`}>{PHONE_E164}</a> or <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">message us on WhatsApp</a>. Please identify the enquiry and the action you want us to take; we may ask for enough information to verify that the request relates to you. We will not ask you to send passwords or payment credentials.</p>
        </section>

        <section id="children" className="scroll-mt-24 space-y-4">
          <h2 className={sectionHeadingClass}>8. Children</h2>
          <p>This website and consultation service are intended for adults. We do not knowingly seek or collect personal data from anyone under 18. A parent or guardian who believes a child has sent us information can contact us to request its deletion.</p>
        </section>

        <section id="cookies-and-links" className="scroll-mt-24 space-y-4">
          <h2 className={sectionHeadingClass}>9. Cookies, security checks and links</h2>
          <p>The site does not currently use analytics or advertising cookies. Cloudflare Turnstile is a third-party security check and may process technical information or use necessary browser storage to prevent abuse. Your browser may also keep standard technical data needed to load and secure the website.</p>
          <p>Phone, map, WhatsApp and Instagram links take you to services operated by third parties only when you select them. Their own privacy notices and terms apply once you leave this site. We do not embed those services in the enquiry form.</p>
        </section>

        <section id="changes-and-contact" className="scroll-mt-24 space-y-4">
          <h2 className={sectionHeadingClass}>10. Changes and contact</h2>
          <p>We may update this policy when our practices or applicable requirements change. The latest version and update date will appear on this page. The privacy notice shown when you submit a form is recorded with your consent.</p>
          <p>For a privacy request, question or grievance, contact {PERSON_NAME} by calling <a href={`tel:${PHONE_E164}`}>{PHONE_E164}</a> or <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">sending a WhatsApp message</a>, or write to:</p>
          <address className="not-italic">
            {BRAND_NAME}<br />{ADDRESS.street}<br />{ADDRESS.locality}, {ADDRESS.region} {ADDRESS.postalCode}, {ADDRESS.country}
          </address>
        </section>
      </div>
    </div>
  );
}
