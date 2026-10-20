import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<Home />);
    expect(screen.getByRole('heading', {
      level: 1,
      name: /Guidance for the spaces where you live and work/i,
    })).toBeInTheDocument();
  });

  it('renders the WhatsApp link', () => {
    render(<Home />);
    const whatsappLink = screen.getByRole('link', { name: /Message on WhatsApp/ });
    expect(whatsappLink).toBeInTheDocument();
    expect(whatsappLink).toHaveAttribute('href', expect.stringContaining('https://wa.me/919828088678'));
  });

  it('renders phone link in CTA', () => {
    render(<Home />);
    const phoneLink = screen.getByRole('link', { name: /Call \+91 98280 88678/ });
    expect(phoneLink).toBeInTheDocument();
    expect(phoneLink).toHaveAttribute('href', 'tel:+919828088678');
  });

  it('renders services preview cards', () => {
    render(<Home />);
    expect(screen.getByText('Residential Vastu & Feng Shui')).toBeInTheDocument();
    expect(screen.getByText('Commercial Vastu & Feng Shui')).toBeInTheDocument();
  });

  it('explains consultation formats without claiming a service area', () => {
    render(<Home />);
    expect(screen.getByText('On-site and online/remote consultation formats are available. Ask which may suit your property.')).toBeInTheDocument();
    expect(screen.queryByText(/worldwide|Jaipur area/i)).not.toBeInTheDocument();
  });

  it('provides keyboard-operable FAQ disclosures', () => {
    render(<Home />);
    expect(screen.getByText('Are on-site and online consultations available?').tagName).toBe('SUMMARY');
  });
});
