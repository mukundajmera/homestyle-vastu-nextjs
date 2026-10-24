import { render, screen } from '@testing-library/react';
import TermsPage, { metadata } from '@/app/terms/page';

describe('Terms of Use page', () => {
  it('renders one main heading and the advisory disclaimer', () => {
    render(<TermsPage />);

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 1, name: 'Terms of Use and Disclaimer' })).toBeInTheDocument();
    expect(screen.getByText(/It is advisory only/)).toBeInTheDocument();
    expect(screen.getByText(/governed by the laws of India/)).toBeInTheDocument();
  });

  it('links to the privacy policy and contact details', () => {
    render(<TermsPage />);

    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('href', '/privacy');
    expect(screen.getAllByRole('link', { name: /WhatsApp/ }).length).toBeGreaterThan(0);
  });

  it('has valid metadata', () => {
    expect(metadata.title).toBeTruthy();
    expect(metadata.alternates).toEqual({ canonical: '/terms' });
    expect((metadata.description as string).length).toBeGreaterThanOrEqual(50);
    expect((metadata.description as string).length).toBeLessThanOrEqual(170);
  });
});
