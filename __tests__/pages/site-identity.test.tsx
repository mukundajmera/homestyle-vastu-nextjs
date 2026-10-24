import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { render, screen, within } from '@testing-library/react';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import ContactPage from '@/app/contact/page';
import { GET as getLlms } from '@/app/llms.txt/route';
import { jsonLd, metadata } from '@/app/layout';
import { metadata as homeMetadata } from '@/app/page';
import { metadata as servicesMetadata } from '@/app/services/page';
import { metadata as aboutMetadata } from '@/app/about/page';
import { metadata as contactMetadata } from '@/app/contact/page';
import PrivacyPage from '@/app/privacy/page';
import { metadata as privacyMetadata } from '@/app/privacy/page';
import TermsPage from '@/app/terms/page';
import { ADDRESS, BRAND_NAME } from '@/lib/site';

const thisTestFile = __filename;

function listFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    return statSync(path).isDirectory() ? listFiles(path) : [path];
  });
}

describe('site identity', () => {
  it('uses BRAND_NAME in the header, footer, JSON-LD, layout siteName, and llms.txt first line', async () => {
    render(<><Header /><Footer /></>);
    expect(within(screen.getByRole('banner')).getByText(BRAND_NAME)).toBeInTheDocument();
    expect(within(screen.getByRole('contentinfo')).getByText(BRAND_NAME)).toBeInTheDocument();
    expect(jsonLd.name).toBe(BRAND_NAME);
    expect(metadata.openGraph?.siteName).toBe(BRAND_NAME);
    const response = getLlms();
    expect(String(response.body).split('\n')[0]).toBe(BRAND_NAME);
  });

  it('returns llms.txt as UTF-8 plain text beginning with BRAND_NAME', async () => {
    const response = getLlms();
    expect(response.headers).toMatchObject({ 'Content-Type': 'text/plain; charset=utf-8' });
    expect(String(response.body).startsWith(`${BRAND_NAME}\n`)).toBe(true);
  });

  it('includes the full street in JSON-LD and llms.txt', () => {
    expect(jsonLd.address.streetAddress).toBe(ADDRESS.street);
    expect(String(getLlms().body)).toContain(ADDRESS.street);
  });

  it('shows the full street on contact, privacy, terms, and footer', () => {
    const contact = render(<ContactPage />);
    expect(contact.container.querySelector('address')).toHaveTextContent(ADDRESS.street);
    contact.unmount();

    const privacy = render(<PrivacyPage />);
    expect(privacy.container.querySelectorAll('address').length).toBeGreaterThan(0);
    expect(Array.from(privacy.container.querySelectorAll('address')).every((address) => address.textContent?.includes(ADDRESS.street))).toBe(true);
    privacy.unmount();

    const terms = render(<TermsPage />);
    expect(terms.container.querySelector('address')).toHaveTextContent(ADDRESS.street);
    terms.unmount();

    const footer = render(<Footer />);
    expect(footer.container.querySelector('address')).toHaveTextContent(ADDRESS.street);
  });

  it('keeps every explicit page title under about 60 characters including the brand template', () => {
    const titles = [homeMetadata, servicesMetadata, aboutMetadata, contactMetadata, privacyMetadata];
    for (const pageMetadata of titles) {
      expect(typeof pageMetadata.title).toBe('string');
      expect(`${pageMetadata.title} | ${BRAND_NAME}`.length).toBeLessThan(60);
    }
    const defaultTitle = metadata.title && typeof metadata.title === 'object'
      ? (metadata.title as { default?: string }).default ?? ''
      : '';
    expect(defaultTitle.length).toBeLessThan(60);
  });

  it('contains none of the retired brand, address, or unverified terms in src and tests', () => {
    const roots = [join(process.cwd(), 'src'), join(process.cwd(), '__tests__')];
    const prohibited = /consultancy|homestyle\s+vastu|openingHours|sameAs/i;
    const matches: string[] = [];
    for (const root of roots) {
      for (const file of listFiles(root)) {
        if (file === thisTestFile) continue;
        const content = readFileSync(file, 'utf8');
        if (prohibited.test(content)) matches.push(relative(process.cwd(), file));
      }
    }
    expect(matches).toEqual([]);
  });
});
