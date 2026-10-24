import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import userEvent from '@testing-library/user-event';
import { render, screen, within } from '@testing-library/react';
import Home from '@/app/page';
import { Footer } from '@/components/footer';
import { JourneyStepper } from '@/components/journey-stepper';
import { PropertyExplorer } from '@/components/property-explorer';
import { PERSON_NAME } from '@/lib/site';

const journeySteps = [
  { step: '01', title: 'Start a conversation', text: 'Message or call and say what you are asking about: a home, business, plot, build, renovation, factory or floor plan.' },
  { step: '02', title: 'Share the details', text: 'Tell us the property type and project stage, and what guidance you are looking for.' },
  { step: '03', title: 'Choose a format', text: 'Ask whether an on-site or an online/remote consultation may suit your property.' },
  { step: '04', title: 'Agree next steps', text: `Discuss your questions with ${PERSON_NAME} and decide how you would like to continue.` },
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

  it('includes all six service titles and four step titles in server-rendered HTML', () => {
    const markup = renderToStaticMarkup(
      <>
        <PropertyExplorer />
        <JourneyStepper steps={journeySteps} />
      </>
    );

    const decodedMarkup = markup.replaceAll('&amp;', '&');
    for (const title of [
      'Residential Vastu & Feng Shui',
      'Commercial Vastu & Feng Shui',
      'Plot & Land Selection',
      'Construction & Renovation',
      'Industrial & Factory Vastu',
      'Online Floor-Plan Review',
      ...journeySteps.map(({ title: stepTitle }) => stepTitle),
    ]) {
      expect(decodedMarkup).toContain(title);
    }
  });

  it('renders all four journey step titles and texts before a step is clicked', () => {
    render(<Home />);

    for (const [title, text] of [
      ['Start a conversation', 'Message or call and say what you are asking about: a home, business, plot, build, renovation, factory or floor plan.'],
      ['Share the details', 'Tell us the property type and project stage, and what guidance you are looking for.'],
      ['Choose a format', 'Ask whether an on-site or an online/remote consultation may suit your property.'],
      ['Agree next steps', `Discuss your questions with ${PERSON_NAME} and decide how you would like to continue.`],
    ]) {
      expect(screen.getAllByText(title).length).toBeGreaterThan(0);
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
