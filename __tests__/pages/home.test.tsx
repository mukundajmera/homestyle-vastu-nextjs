import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import userEvent from '@testing-library/user-event';
import { render, screen, within } from '@testing-library/react';
import Home from '@/app/page';
import { Footer } from '@/components/footer';
import { PropertyExplorer } from '@/components/property-explorer';
import { PERSON_NAME } from '@/lib/site';

const journeySteps = [
  { title: 'Send your enquiry', text: 'Tell us the property type (home, shop, office, plot or factory), its area in Jaipur, and the decision you are weighing.' },
  { title: 'Share the layout', text: 'Send a floor plan with the main compass directions marked, plus any drawings you have. Businesses should show entry, work areas and staff spaces.' },
  { title: 'Choose on-site or online', text: 'An on-site visit walks through the property with you. An online floor-plan review suits properties outside Jaipur or a plan you only need checked.' },
  { title: 'Agree the next step', text: 'Go through what was observed, then decide what to change and what your architect, engineer or legal adviser should confirm.' },
];

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<Home />);
    expect(screen.getByRole('heading', {
      level: 1,
      name: /Guidance for the spaces where you live and work/i,
    })).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`Talk with ${PERSON_NAME} about a home, workplace, plot, planned build`))).toBeInTheDocument();
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

  it('renders the property explorer and switches between property types', async () => {
    const user = userEvent.setup();
    render(<Home />);
    expect(screen.getAllByText('Residential Vastu & Feng Shui').length).toBeGreaterThan(0);

    await user.click(screen.getByRole('tab', { name: 'Business' }));
    expect(screen.getAllByText('Commercial Vastu & Feng Shui').length).toBeGreaterThan(0);
    expect(screen.getByRole('tab', { name: 'Business' })).toHaveAttribute('aria-selected', 'true');
    const panel = screen.getByRole('tabpanel');
    expect(within(panel).getByRole('heading', { name: 'Commercial Vastu & Feng Shui' })).toBeInTheDocument();
    expect(within(panel).getByText(/Commercial consultations can cover offices, retail spaces/)).toBeInTheDocument();
    expect(within(panel).getByText('The business type, the space you use and the decision you are weighing.')).toBeInTheDocument();
  });

  it('renders all six service titles, lead lines, and descriptions before a tab is clicked', () => {
    render(<Home />);

    for (const title of [
      'Residential Vastu & Feng Shui',
      'Commercial Vastu & Feng Shui',
      'Plot & Land Selection',
      'Construction & Renovation',
      'Industrial & Factory Vastu',
      'Online Floor-Plan Review',
    ]) {
      expect(screen.getAllByText(title).length).toBeGreaterThan(0);
    }
    expect(screen.getByText('Guidance for homes, apartments and residential plots.')).toBeInTheDocument();
    expect(screen.getByText(/Discuss Vastu and Feng Shui questions about where you live/)).toBeInTheDocument();
    expect(screen.getByText('Offices, retail spaces, hotels, hospitals and restaurants.')).toBeInTheDocument();
    expect(screen.getByText(/Commercial consultations can cover offices, retail spaces/)).toBeInTheDocument();
    expect(screen.getByText('Think it through before you commit.')).toBeInTheDocument();
    expect(screen.getByText(/Talk through the Vastu considerations of a plot or site/)).toBeInTheDocument();
    expect(screen.getByText('For a planned build or a renovation.')).toBeInTheDocument();
    expect(screen.getByText(/Discuss a new build or renovation/)).toBeInTheDocument();
    expect(screen.getByText('Layout and Vastu for industrial and factory properties.')).toBeInTheDocument();
    expect(screen.getByText(/Discuss the layout and Vastu considerations of an industrial/)).toBeInTheDocument();
    expect(screen.getByText('Share a layout remotely.')).toBeInTheDocument();
    expect(screen.getByText(/Share your layout remotely and discuss what information/)).toBeInTheDocument();
  });

  it('includes all six service titles in server-rendered HTML', () => {
    const markup = renderToStaticMarkup(<PropertyExplorer />);

    const decodedMarkup = markup.replaceAll('&amp;', '&');
    for (const title of [
      'Residential Vastu & Feng Shui',
      'Commercial Vastu & Feng Shui',
      'Plot & Land Selection',
      'Construction & Renovation',
      'Industrial & Factory Vastu',
      'Online Floor-Plan Review',
    ]) {
      expect(decodedMarkup).toContain(title);
    }
  });

  it('renders all four journey step titles and texts on the page', () => {
    render(<Home />);

    for (const { title, text } of journeySteps) {
      expect(screen.getByRole('heading', { level: 3, name: title })).toBeInTheDocument();
      expect(screen.getAllByText(text)).toHaveLength(1);
    }
  });

  it('gives the footer privacy link a minimum 44px touch target', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveClass('min-h-11');
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
