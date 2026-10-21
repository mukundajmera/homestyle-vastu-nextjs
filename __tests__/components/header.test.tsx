import userEvent from '@testing-library/user-event';
import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
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
  it('can open and close the mobile menu via keyboard', async () => {
    // Resize window to trigger mobile view
    global.innerWidth = 500;
    global.dispatchEvent(new Event('resize'));

    render(<Header />);
    const user = userEvent.setup();

    // Toggle button should be available in mobile view
    const toggleButton = screen.getByRole('button', { name: /Toggle Menu/i });
    expect(toggleButton).toBeInTheDocument();

    // Tab to button and hit Enter
    toggleButton.focus();
    expect(toggleButton).toHaveFocus();
    await user.keyboard('{Enter}');

    // The dialog/sheet should open
    const dialog = await screen.findByRole('dialog', { name: /Navigation Menu/i });
    expect(dialog).toBeInTheDocument();

    // The close button should be focusable
    const closeButton = screen.getByRole('button', { name: /Close/i });
    expect(closeButton).toBeInTheDocument();

    // Press Escape to close the menu
    await user.keyboard('{Escape}');

    // Dialog should be gone (or hidden by radix, which removes it from DOM)
    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: /Navigation Menu/i })).not.toBeInTheDocument();
      expect(toggleButton).toHaveFocus();
    });
  });

  it('closes the mobile menu after a navigation link is selected', async () => {
    global.innerWidth = 500;
    global.dispatchEvent(new Event('resize'));

    render(<Header />);
    const user = userEvent.setup();
    const toggleButton = screen.getByRole('button', { name: /Toggle Menu/i });
    await user.click(toggleButton);

    const dialog = await screen.findByRole('dialog', { name: /Navigation Menu/i });
    const servicesLink = within(dialog).getByRole('link', { name: 'Services' });
    expect(servicesLink).toHaveAttribute('href', '/services');
    await user.click(servicesLink);

    await waitFor(() => expect(screen.queryByRole('dialog', { name: /Navigation Menu/i })).not.toBeInTheDocument());
  });
});
