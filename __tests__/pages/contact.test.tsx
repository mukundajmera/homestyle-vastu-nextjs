import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactPage from '@/app/contact/page';

describe('Contact Page', () => {
  it('renders contact options and address', () => {
    render(<ContactPage />);
    
    // Check WhatsApp link
    const whatsappLink = screen.getByRole('link', { name: /Message on WhatsApp/i });
    expect(whatsappLink).toBeInTheDocument();
    expect(whatsappLink).toHaveAttribute(
      'href',
      `https://wa.me/919828088678?text=${encodeURIComponent("Hello, I would like to ask about a consultation. My property is residential/commercial and I am interested in an on-site/online consultation.")}`
    );
    
    // Check Phone link
    const phoneLink = screen.getByRole('link', { name: /\+91 98280 88678/i });
    expect(phoneLink).toBeInTheDocument();
    expect(phoneLink).toHaveAttribute('href', 'tel:+919828088678');
    
    // Check Address
    expect(screen.getByText(/Shivam Apartment, Acharya Kriplani Marg/)).toBeInTheDocument();
    expect(screen.getByText(/Jaipur, Rajasthan 302004/)).toBeInTheDocument();
    expect(screen.queryByText(/business hours/i)).not.toBeInTheDocument();
  });
});
