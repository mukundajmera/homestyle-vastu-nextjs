import { consultationFormats, propertyServices } from '@/lib/services-data';
import { ADDRESS, BRAND_NAME, PERSON_NAME, PERSON_TITLE, PHONE_E164, SITE_ORIGIN, WHATSAPP_URL } from '@/lib/site';

export function GET() {
  const address = `${ADDRESS.neighborhood}, ${ADDRESS.locality}, ${ADDRESS.region} ${ADDRESS.postalCode}, ${ADDRESS.country}`;
  const content = [
    BRAND_NAME,
    '',
    `${BRAND_NAME} provides Vastu and Feng Shui consultation guidance for homes, businesses, plots, construction, renovation, industrial properties, and online floor-plan review.`,
    '',
    `Person: ${PERSON_NAME}`,
    `Title: ${PERSON_TITLE}`,
    `Address: ${address}`,
    `Phone: ${PHONE_E164}`,
    `WhatsApp: ${WHATSAPP_URL}`,
    `Website: ${SITE_ORIGIN}`,
    '',
    'Consultation formats:',
    ...consultationFormats.map(({ title, text }) => `- ${title}: ${text}`),
    '',
    'Services:',
    ...propertyServices.map(({ title }) => `- ${title}`),
    '',
    'Pages:',
    `- ${SITE_ORIGIN}/services`,
    `- ${SITE_ORIGIN}/about`,
    `- ${SITE_ORIGIN}/contact`,
    '',
  ].join('\n');

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
