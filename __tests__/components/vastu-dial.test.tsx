import userEvent from '@testing-library/user-event';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { VastuDial } from '@/components/vastu-dial';
import { vastuDirections } from '@/lib/vastu-directions';

const directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];

// Each button's accessible name is its abbreviation plus the direction, for example "NE North-East".
const byDirection = (direction: string) => ({ name: new RegExp(`^\\S+ ${direction}$`) });

function pointerEvent(type: string, init: { pointerType: string; clientX: number; clientY: number }) {
  const event = new Event(type, { bubbles: true });
  Object.entries(init).forEach(([key, value]) => Object.defineProperty(event, key, { value }));
  return event;
}

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

  it('previews the direction under a mouse pointer without moving keyboard focus', async () => {
    const originalRaf = window.requestAnimationFrame;
    const callbacks: FrameRequestCallback[] = [];
    window.requestAnimationFrame = jest.fn((callback: FrameRequestCallback) => {
      callbacks.push(callback);
      return callbacks.length;
    });
    window.cancelAnimationFrame = jest.fn();
    render(<VastuDial />);
    const northEast = screen.getByRole('button', byDirection('North-East'));
    northEast.focus();
    const svg = screen.getByText('N', { selector: 'text' }).closest('svg')!;
    jest.spyOn(svg, 'getBoundingClientRect').mockReturnValue({
      x: 0, y: 0, left: 0, top: 0, right: 320, bottom: 320, width: 320, height: 320, toJSON: () => ({}),
    });

    fireEvent(svg, pointerEvent('pointermove', { pointerType: 'mouse', clientX: 310, clientY: 160 }));
    act(() => callbacks.splice(0).forEach((callback) => callback(16)));

    expect(screen.getByText('East side')).toBeInTheDocument();
    expect(screen.getByText('Previewing East. Click or tap to lock this direction.')).toBeInTheDocument();
    expect(northEast).toHaveFocus();
    expect(northEast).toHaveAttribute('aria-pressed', 'true');
    window.requestAnimationFrame = originalRaf;
  });

  it('locks the direction at a clicked point and keeps it after pointer leave', async () => {
    const originalRaf = window.requestAnimationFrame;
    window.requestAnimationFrame = jest.fn((callback: FrameRequestCallback) => {
      callback(16);
      return 1;
    });
    window.cancelAnimationFrame = jest.fn();
    render(<VastuDial />);
    const svg = screen.getByText('N', { selector: 'text' }).closest('svg')!;
    jest.spyOn(svg, 'getBoundingClientRect').mockReturnValue({
      x: 0, y: 0, left: 0, top: 0, right: 320, bottom: 320, width: 320, height: 320, toJSON: () => ({}),
    });

    fireEvent.click(svg, { clientX: 310, clientY: 160 });
    expect(screen.getByText('East side')).toBeInTheDocument();
    expect(screen.getByRole('button', byDirection('East'))).toHaveAttribute('aria-pressed', 'true');
    fireEvent.pointerLeave(svg);

    expect(screen.getByText('East side')).toBeInTheDocument();
    expect(screen.getByText('Selected East. Move over the compass to preview another direction.')).toBeInTheDocument();
    window.requestAnimationFrame = originalRaf;
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

  it('does not show a preview for touch pointer movement', () => {
    render(<VastuDial />);
    const svg = screen.getByText('N', { selector: 'text' }).closest('svg')!;
    jest.spyOn(svg, 'getBoundingClientRect').mockReturnValue({
      x: 0, y: 0, left: 0, top: 0, right: 320, bottom: 320, width: 320, height: 320, toJSON: () => ({}),
    });

    fireEvent(svg, pointerEvent('pointermove', { pointerType: 'touch', clientX: 310, clientY: 160 }));

    expect(screen.getByText('North-East side')).toBeInTheDocument();
    expect(screen.queryByText('Previewing East. Click or tap to lock this direction.')).not.toBeInTheDocument();
  });

  it('locks a direction on touch without entering preview mode', () => {
    render(<VastuDial />);
    const svg = screen.getByText('N', { selector: 'text' }).closest('svg')!;
    jest.spyOn(svg, 'getBoundingClientRect').mockReturnValue({
      x: 0, y: 0, left: 0, top: 0, right: 320, bottom: 320, width: 320, height: 320, toJSON: () => ({}),
    });

    fireEvent(svg, pointerEvent('pointerup', { pointerType: 'touch', clientX: 310, clientY: 160 }));

    expect(screen.getByText('East side')).toBeInTheDocument();
    expect(screen.getByText('Selected East. Move over the compass to preview another direction.')).toBeInTheDocument();
    expect(screen.getByRole('button', byDirection('East'))).toHaveAttribute('aria-pressed', 'true');
  });

  it('exposes eight unique directions at 45 degree intervals with traditional notes', () => {
    expect(vastuDirections).toHaveLength(8);
    expect(vastuDirections.map(({ angle }) => angle)).toEqual([0, 45, 90, 135, 180, 225, 270, 315]);
    expect(new Set(vastuDirections.map(({ label }) => label)).size).toBe(8);
    vastuDirections.forEach(({ note }) => expect(note).toContain('traditional'));
  });
});
