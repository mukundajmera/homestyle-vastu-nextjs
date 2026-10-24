import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { JourneyStepper } from '@/components/journey-stepper';

const steps = [
  { step: '01', title: 'Share your plans', text: 'Tell us about the property.' },
  { step: '02', title: 'Discuss guidance', text: 'Explore the questions you have.' },
  { step: '03', title: 'Choose a format', text: 'Decide how to continue.' },
];

describe('JourneyStepper', () => {
  it('renders every step and marks the first step as active', () => {
    render(<JourneyStepper steps={steps} />);

    expect(screen.getByRole('list', { name: 'Consultation steps' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Share your plans/ })).toHaveAttribute('aria-current', 'step');
    expect(screen.getByRole('button', { name: /Discuss guidance/ })).not.toHaveAttribute('aria-current');
    expect(screen.getByRole('heading', { name: 'Share your plans' })).toBeInTheDocument();
    expect(screen.getAllByText('Tell us about the property.').length).toBeGreaterThan(0);
  });

  it('changes active step by clicking a step or using the next and previous buttons', async () => {
    const user = userEvent.setup();
    render(<JourneyStepper steps={steps} />);

    await user.click(screen.getByRole('button', { name: /Choose a format/ }));
    expect(screen.getByRole('heading', { name: 'Choose a format' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Choose a format/ })).toHaveAttribute('aria-current', 'step');
    expect(screen.getByRole('button', { name: 'Next step' })).toBeDisabled();

    await user.click(screen.getByRole('button', { name: 'Previous' }));
    expect(screen.getByRole('heading', { name: 'Discuss guidance' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /Share your plans/ }));
    screen.getByRole('button', { name: /Choose a format/ }).focus();
    await user.keyboard('{Enter}');
    expect(screen.getByRole('heading', { name: 'Choose a format' })).toBeInTheDocument();
  });

  it('handles one step without enabling navigation beyond its bounds', () => {
    render(<JourneyStepper steps={[steps[0]]} />);

    expect(screen.getByRole('heading', { name: 'Share your plans' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next step' })).toBeDisabled();
  });
});
