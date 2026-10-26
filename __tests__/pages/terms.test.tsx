import { render, screen, within } from '@testing-library/react';
import TermsPage, { metadata } from '@/app/terms/page';

describe('Terms of Use page', () => {
  it('renders one main heading, a dated summary and linked contents', () => {
    const { container } = render(<TermsPage />);

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 1, name: 'Terms of Use' })).toBeInTheDocument();
    expect(screen.getByText('Last updated: 27 October 2026')).toBeInTheDocument();
    expect(screen.getByLabelText('Terms summary')).toHaveTextContent(/results vary and cannot be promised/i);

    const contents = within(screen.getByRole('navigation', { name: 'On this page' }));
    const links = contents.getAllByRole('link');
    expect(links).toHaveLength(10);
    links.forEach((link) => {
      const targetId = link.getAttribute('href')?.slice(1);
      expect(targetId).toBeTruthy();
      expect(container.querySelector(`#${targetId}`)).toBeInTheDocument();
    });
  });

  it('covers consultation scope, written fees, cancellation, reports and legal limits', () => {
    render(<TermsPage />);

    expect(screen.getByText(/Guidance is offered in good faith, based on classical Vastu and Feng Shui principles/)).toBeInTheDocument();
    expect(screen.getByText(/structural, engineering, architectural, building-code, legal, medical, financial/)).toBeInTheDocument();
    expect(screen.getByText(/the fees and any payment timing, and the rescheduling or cancellation arrangements/)).toBeInTheDocument();
    expect(screen.getByText(/remain the intellectual property/)).toBeInTheDocument();
    expect(screen.getByText(/courts with jurisdiction in Jaipur, Rajasthan/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('href', '/privacy');
    expect(screen.getAllByRole('link', { name: /WhatsApp/ }).length).toBeGreaterThan(0);
  });

  it('has canonical metadata for the terms route', () => {
    expect(metadata.alternates).toEqual({ canonical: '/terms' });
    expect((metadata.description as string).length).toBeGreaterThanOrEqual(50);
    expect((metadata.description as string).length).toBeLessThanOrEqual(170);
  });
});
