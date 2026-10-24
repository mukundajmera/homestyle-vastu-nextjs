import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { VastuDial } from '@/components/vastu-dial';

const directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];

// Each button's accessible name is its abbreviation plus the direction, for example "NE North-East".
const byDirection = (direction: string) => ({ name: new RegExp(`^\\S+ ${direction}$`) });

describe('VastuDial', () => {
  it('renders all eight accessible direction buttons and the default information', () => {
    render(<VastuDial />);

    directions.forEach((direction) => expect(screen.getByRole('button', byDirection(direction))).toBeInTheDocument());
    expect(screen.getByRole('button', byDirection('North-East'))).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('North-East side')).toBeInTheDocument();
  });

  it.each(directions)('selects and displays the %s direction', async (direction) => {
    const user = userEvent.setup();
    render(<VastuDial />);

    await user.click(screen.getByRole('button', byDirection(direction)));

    expect(screen.getByRole('button', byDirection(direction))).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText(`${direction} side`)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: `Ask about the ${direction} side` })).toBeInTheDocument();
  });
});
