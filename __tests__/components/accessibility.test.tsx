import userEvent from '@testing-library/user-event';
import { render, screen, within } from '@testing-library/react';
import { JourneyStepper } from '@/components/journey-stepper';
import { VastuDial } from '@/components/vastu-dial';

const steps = [
  { step: '01', title: 'Start a conversation', text: 'Discuss the property.' },
  { step: '02', title: 'Share the details', text: 'Share the project details.' },
];

describe('accessible interactive controls', () => {
  it('uses high contrast text for each journey step number state', async () => {
    const user = userEvent.setup();
    render(<JourneyStepper steps={steps} />);

    expect(screen.getByText('01', { selector: 'span' })).toHaveClass('bg-primary', 'text-primary-foreground');
    expect(screen.getByText('02', { selector: 'span' })).toHaveClass('bg-secondary', 'text-foreground');

    await user.click(screen.getByRole('button', { name: 'Share the details' }));
    expect(screen.getByText('01', { selector: 'span' })).toHaveClass('bg-sage', 'text-white');
    expect(screen.getByText('02', { selector: 'span' })).toHaveClass('bg-primary', 'text-primary-foreground');
  });

  it('includes each compass button visible abbreviation in its accessible name', () => {
    const { container } = render(<VastuDial />);
    const northButton = screen.getByRole('button', { name: 'N North' });
    const northEastButton = screen.getByRole('button', { name: 'NE North-East' });

    expect(within(northButton).getByText('N')).toBeInTheDocument();
    expect(northButton).toHaveAccessibleName(/N North/);
    expect(northButton).toHaveAttribute('tabindex', '-1');
    expect(northEastButton).toHaveAttribute('tabindex', '0');
    expect(container.querySelectorAll('[aria-live="polite"]')).toHaveLength(1);
  });
});
