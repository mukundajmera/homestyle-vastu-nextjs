import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { PropertyExplorer } from '@/components/property-explorer';

describe('PropertyExplorer keyboard navigation', () => {
  it.each([
    ['ArrowDown', 'Homes', 'Business'],
    ['ArrowUp', 'Business', 'Homes'],
    ['ArrowRight', 'Homes', 'Business'],
    ['ArrowLeft', 'Business', 'Homes'],
    ['Home', 'Plots', 'Homes'],
    ['End', 'Homes', 'Floor plan'],
  ])('moves focus and selection with %s', async (key, startName, nextName) => {
    const user = userEvent.setup();
    render(<PropertyExplorer />);
    await user.click(screen.getByRole('tab', { name: startName }));
    await user.keyboard(`{${key}}`);

    const nextTab = screen.getByRole('tab', { name: nextName });
    expect(nextTab).toHaveAttribute('aria-selected', 'true');
    expect(document.activeElement).toBe(nextTab);
  });
});
