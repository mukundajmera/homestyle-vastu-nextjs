import { render, screen, within } from '@testing-library/react';
import { VastuDial } from '@/components/vastu-dial';

describe('accessible interactive controls', () => {
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
