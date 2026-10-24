import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '@testing-library/react';
import { VastuDial } from '@/components/vastu-dial';
import { vastuDirections } from '@/lib/vastu-directions';

const directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];

// Each button's accessible name is its abbreviation plus the direction, for example "NE North-East".
const byDirection = (direction: string) => ({ name: new RegExp(`^\\S+ ${direction}$`) });

function pointerEvent(type: string, init: { pointerType: string; clientX: number; clientY: number; pointerId?: number; button?: number }) {
  const event = new Event(type, { bubbles: true });
  Object.entries({ pointerId: 1, button: 0, ...init }).forEach(([key, value]) => Object.defineProperty(event, key, { value }));
  return event;
}

/** Returns the dial SVG with a 320x320 layout box and pointer-capture stubs (jsdom has no layout or capture). */
function dialSvg() {
  const svg = screen.getByText('N', { selector: 'text' }).closest('svg')!;
  jest.spyOn(svg, 'getBoundingClientRect').mockReturnValue({
    x: 0, y: 0, left: 0, top: 0, right: 320, bottom: 320, width: 320, height: 320, toJSON: () => ({}),
  });
  Object.assign(svg, {
    setPointerCapture: jest.fn(),
    releasePointerCapture: jest.fn(),
    hasPointerCapture: jest.fn(() => true),
  });
  return svg;
}

/** Sends a pointer event at a compass angle (0 = North, clockwise) and a distance from the centre. */
function sendAt(svg: SVGSVGElement, type: string, angle: number, pointerType = 'mouse', radius = 100) {
  const rad = (angle * Math.PI) / 180;
  const clientX = 160 + radius * Math.sin(rad);
  const clientY = 160 - radius * Math.cos(rad);
  fireEvent(svg, pointerEvent(type, { pointerType, clientX, clientY }));
}

const needleAngle = (svg: SVGSVGElement) => svg.querySelector('g.dial-needle')?.getAttribute('transform');

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

  it('does not move the needle or preview a direction when a mouse only hovers', () => {
    render(<VastuDial />);
    const svg = dialSvg();

    sendAt(svg, 'pointermove', 90);

    expect(needleAngle(svg)).toBe('rotate(45 160 160)');
    expect(screen.getByText('North-East side')).toBeInTheDocument();
    expect(screen.queryByText(/Previewing/)).not.toBeInTheDocument();
  });

  it('turns the needle while dragging and locks the nearest direction on release', () => {
    render(<VastuDial />);
    const svg = dialSvg();

    sendAt(svg, 'pointerdown', 45);
    sendAt(svg, 'pointermove', 70);

    expect(needleAngle(svg)).toBe('rotate(70 160 160)');
    expect(screen.getByText('Previewing East. Release to lock this direction.')).toBeInTheDocument();

    sendAt(svg, 'pointerup', 70);

    expect(screen.getByText('East side')).toBeInTheDocument();
    expect(screen.getByRole('button', byDirection('East'))).toHaveAttribute('aria-pressed', 'true');
  });

  it('limits a drag to 45 degrees either side of the locked direction', () => {
    render(<VastuDial />);
    const svg = dialSvg();

    sendAt(svg, 'pointerdown', 45);
    sendAt(svg, 'pointermove', 200);
    expect(needleAngle(svg)).toBe('rotate(90 160 160)');

    sendAt(svg, 'pointermove', 250);
    expect(needleAngle(svg)).toBe('rotate(0 160 160)');

    sendAt(svg, 'pointerup', 250);
    expect(screen.getByRole('button', byDirection('North'))).toHaveAttribute('aria-pressed', 'true');
  });

  it('locks the direction under a tap that does not drag', () => {
    render(<VastuDial />);
    const svg = dialSvg();

    sendAt(svg, 'pointerdown', 180);
    sendAt(svg, 'pointerup', 180);

    expect(screen.getByText('South side')).toBeInTheDocument();
    expect(screen.getByRole('button', byDirection('South'))).toHaveAttribute('aria-pressed', 'true');
  });

  it('returns to the locked direction when a drag is cancelled', () => {
    render(<VastuDial />);
    const svg = dialSvg();

    sendAt(svg, 'pointerdown', 45);
    sendAt(svg, 'pointermove', 70);
    sendAt(svg, 'pointercancel', 70);

    expect(needleAngle(svg)).toBe('rotate(45 160 160)');
    expect(screen.getByText('North-East side')).toBeInTheDocument();
    expect(screen.getByRole('button', byDirection('North-East'))).toHaveAttribute('aria-pressed', 'true');
  });

  it('drags on touch the same way as with a mouse', () => {
    render(<VastuDial />);
    const svg = dialSvg();

    sendAt(svg, 'pointerdown', 45, 'touch');
    sendAt(svg, 'pointermove', 70, 'touch');
    expect(screen.getByText('Previewing East. Release to lock this direction.')).toBeInTheDocument();

    sendAt(svg, 'pointerup', 70, 'touch');
    expect(screen.getByRole('button', byDirection('East'))).toHaveAttribute('aria-pressed', 'true');
  });

  it('moves focus with arrow keys and locks with Enter', async () => {
    const user = userEvent.setup();
    render(<VastuDial />);
    const northEast = screen.getByRole('button', byDirection('North-East'));
    northEast.focus();

    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('button', byDirection('East'))).toHaveFocus();
    expect(screen.getByRole('button', byDirection('East'))).toHaveAttribute('aria-pressed', 'false');
    await user.keyboard('{Enter}');
    expect(screen.getByRole('button', byDirection('East'))).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('East side')).toBeInTheDocument();
  });

  it('exposes eight unique directions at 45 degree intervals with traditional notes', () => {
    expect(vastuDirections).toHaveLength(8);
    expect(vastuDirections.map(({ angle }) => angle)).toEqual([0, 45, 90, 135, 180, 225, 270, 315]);
    expect(new Set(vastuDirections.map(({ label }) => label)).size).toBe(8);
    vastuDirections.forEach(({ note }) => expect(note).toContain('traditional'));
  });
});
