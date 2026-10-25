import { render, screen } from '@testing-library/react';
import type { Metadata } from 'next';
import AboutPage, { metadata as aboutMetadata } from '@/app/about/page';
import ServicesPage, { metadata as servicesMetadata } from '@/app/services/page';
import ContactPage, { metadata as contactMetadata } from '@/app/contact/page';
import { PERSON_NAME } from '@/lib/site';

function expectValidMetadata(metadata: Metadata) {
  expect(typeof metadata.title).toBe('string');
  expect(metadata.title).toBeTruthy();
  expect(typeof metadata.description).toBe('string');
  expect((metadata.description as string).length).toBeGreaterThanOrEqual(50);
  expect((metadata.description as string).length).toBeLessThanOrEqual(170);
}

function expectSingleH1() {
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
}

describe('About page', () => {
  it('renders one main heading, contact CTA, and valid metadata', () => {
    render(<AboutPage />);
    expectSingleH1();
    expect(screen.getByRole('heading', { level: 1, name: PERSON_NAME })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Get in Touch' })).toHaveAttribute('href', '/contact');
    expectValidMetadata(aboutMetadata);
  });
});

describe('Services page', () => {
  it('renders one main heading, contact and WhatsApp CTAs, and valid metadata', () => {
    render(<ServicesPage />);
    expectSingleH1();
    expect(screen.getByRole('heading', { level: 1, name: 'Make your space work for you' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Go to contact page/ })).toHaveAttribute('href', '/contact');
    expect(screen.getByRole('link', { name: 'Inquire via WhatsApp' })).toHaveAttribute('href', expect.stringContaining('https://wa.me/'));
    expectValidMetadata(servicesMetadata);
  });
});

describe('Contact page', () => {
  it('renders one main heading, WhatsApp CTA, and valid metadata', () => {
    render(<ContactPage />);
    expectSingleH1();
    expect(screen.getByRole('heading', { level: 1, name: 'Contact Us' })).toBeInTheDocument();
    const whatsapp = screen.getByRole('link', { name: 'Message on WhatsApp' });
    expect(whatsapp).toHaveAttribute('href', expect.stringContaining('https://wa.me/919828088678'));
    expectValidMetadata(contactMetadata);
  });
});
