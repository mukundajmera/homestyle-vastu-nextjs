import { render, screen, within } from '@testing-library/react';
import PrivacyPage, { metadata } from '@/app/privacy/page';
import { Footer } from '@/components/footer';

describe('PrivacyPage', () => {
  it('presents a dated, plain-language summary and a linked contents list', () => {
    const { container } = render(<PrivacyPage />);

    expect(screen.getByRole('heading', { level: 1, name: 'Privacy Policy' })).toBeInTheDocument();
    expect(screen.getByText('Last updated: 27 October 2026')).toBeInTheDocument();
    expect(screen.getByLabelText('Privacy summary')).toHaveTextContent('do not sell your information');

    const contents = within(screen.getByRole('navigation', { name: 'On this page' }));
    const links = contents.getAllByRole('link');
    expect(links).toHaveLength(10);
    links.forEach((link) => {
      const targetId = link.getAttribute('href')?.slice(1);
      expect(targetId).toBeTruthy();
      expect(container.querySelector(`#${targetId}`)).toBeInTheDocument();
    });
  });

  it('explains the actual enquiry data flow, retention, rights and security checks', () => {
    const { container } = render(<PrivacyPage />);
    const pageText = container.textContent ?? '';

    for (const expected of [
      'Digital Personal Data Protection Act, 2023',
      'Information Technology Act, 2000',
      'name, phone number, email address, city or location, the service you need help with',
      'Cloudflare Turnstile',
      'Resend',
      'Hostinger',
      'up to 12 months',
      'withdraw your consent',
      'request erasure',
      'does not currently use analytics or advertising cookies',
    ]) {
      expect(pageText.toLowerCase()).toContain(expected.toLowerCase());
    }

    expect(pageText).not.toContain('Effective from 25 October 2026');
    expect(pageText).not.toContain('[OWNER');
  });

  it('keeps canonical metadata and footer legal links aligned with the routes', () => {
    expect(metadata.alternates).toEqual({ canonical: '/privacy' });
    expect((metadata.description as string).length).toBeGreaterThanOrEqual(50);
    expect((metadata.description as string).length).toBeLessThanOrEqual(170);

    render(<Footer />);
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('href', '/privacy');
    expect(screen.getByRole('link', { name: 'Terms of Use' })).toHaveAttribute('href', '/terms');
  });
});
