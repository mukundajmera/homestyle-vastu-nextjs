import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from '@/components/header';

// Mock matchMedia for Radix UI Sheet component
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Header', () => {
  it('renders the new navigation links', () => {
    render(<Header />);
    const desktopNav = screen.getAllByRole('navigation')[0];
    expect(desktopNav).toBeInTheDocument();

    // Check for specific new routes
    expect(screen.getByText('Home')).toHaveAttribute('href', '/');
    expect(screen.getByText('Services')).toHaveAttribute('href', '/services');
    expect(screen.getByText('About')).toHaveAttribute('href', '/about');
    expect(screen.getByText('Contact')).toHaveAttribute('href', '/contact');
  });

  it('does not render the old AI Harmonizer link', () => {
    render(<Header />);
    expect(screen.queryByText('AI Harmonizer')).not.toBeInTheDocument();
  });

  it('marks the current page in the desktop navigation', () => {
    render(<Header />);

    expect(screen.getAllByRole('link', { name: 'Home' })[0]).toHaveAttribute('aria-current', 'page');
  });
});
