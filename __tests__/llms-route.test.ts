import { GET } from '@/app/llms.txt/route';
import { PHONE_E164, SITE_ORIGIN, WHATSAPP_URL } from '@/lib/site';

describe('llms.txt route', () => {
  it('publishes the recommended title, summary, links, and contact details', async () => {
    const response = GET();
    // The jest.setup Response mock keeps the body as a string; a real Response needs text().
    const content = typeof response.body === 'string' ? response.body : await response.text();
    const lines = content.split('\n');
    const origin = SITE_ORIGIN.replace(/\./g, '\\.');
    const links = content.match(new RegExp(`\\[[^\\]]+\\]\\(${origin}/[a-z-]+\\)`, 'g')) ?? [];

    expect(lines[0]).toMatch(/^# /);
    expect(lines.some((line) => line.startsWith('> '))).toBe(true);
    expect(links.length).toBeGreaterThanOrEqual(3);
    expect(content).toContain(PHONE_E164);
    expect(content).toContain(WHATSAPP_URL);
  });
});
