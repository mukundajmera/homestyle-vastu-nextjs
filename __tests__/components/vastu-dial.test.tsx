import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '@testing-library/react';
import { VastuDial } from '@/components/vastu-dial';

const directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];

// Each button's accessible name is its abbreviation plus the direction, for example "NE North-East".
const byDirection = (direction: string) => ({ name: new RegExp(`^\\S+ ${direction}$`) });

/** Returns the dial SVG with a 320x320 layout box, so click coordinates map to SVG units. */
function dialSvg() {
  const svg = screen.getByText('N', { selector: 'text' }).closest('svg')!;
  jest.spyOn(svg, 'getBoundingClientRect').mockReturnValue({
    x: 0, y: 0, left: 0, top: 0, right: 320, bottom: 320, width: 320, height: 320, toJSON: () => ({}),
  });
  return svg;
}

/** Clicks the dial at a compass angle (0 = North, clockwise) and a distance from the centre. */
function clickAt(svg: SVGSVGElement, angle: number, radius = 100) {
  const rad = (angle * Math.PI) / 180;
  fireEvent.click(svg, { clientX: 160 + radius * Math.sin(rad), clientY: 160 - radius * Math.cos(rad) });
}

const needleTransform = (svg: SVGSVGElement) => svg.querySelector('g[aria-hidden="true"]')?.getAttribute('style') ?? '';

describe('VastuDial', () => {
  it('renders all eight accessible direction buttons and the default information', () => {
    render(<VastuDial />);

    directions.forEach((direction) => expect(screen.getByRole('button', byDirection(direction))).toBeInTheDocument());
    expect(screen.getByRole('button', byDirection('North-East'))).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('North-East side')).toBeInTheDocument();
  });

  it.each(directions)('selects and displays the %s direction from its button', async (direction) => {
    const user = userEvent.setup();
    render(<VastuDial />);

    await user.click(screen.getByRole('button', byDirection(direction)));

    expect(screen.getByRole('button', byDirection(direction))).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText(`${direction} side`)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: `Ask about the ${direction} side` })).toBeInTheDocument();
  });

  it('does not move the needle when the pointer only hovers over the dial', () => {
    render(<VastuDial />);
    const svg = dialSvg();
    const before = needleTransform(svg);

    fireEvent.pointerMove(svg, { clientX: 260, clientY: 80 });
    fireEvent.mouseMove(svg, { clientX: 260, clientY: 80 });

    expect(needleTransform(svg)).toBe(before);
    expect(screen.getByText('North-East side')).toBeInTheDocument();
  });

  it('selects the nearest direction when the dial is clicked or tapped', () => {
    render(<VastuDial />);
    const svg = dialSvg();

    clickAt(svg, 180);

    expect(screen.getByText('South side')).toBeInTheDocument();
    expect(screen.getByRole('button', byDirection('South'))).toHaveAttribute('aria-pressed', 'true');
    expect(needleTransform(svg)).toContain('rotate(180deg)');
  });

  it('ignores clicks in the hub of the dial', () => {
    render(<VastuDial />);
    const svg = dialSvg();

    clickAt(svg, 90, 5);

    expect(screen.getByText('North-East side')).toBeInTheDocument();
  });

  it('moves between directions with the arrow keys', () => {
    render(<VastuDial />);

    fireEvent.keyDown(screen.getByRole('button', byDirection('North-East')), { key: 'ArrowRight' });

    expect(screen.getByRole('button', byDirection('East'))).toHaveFocus();
  });
});
