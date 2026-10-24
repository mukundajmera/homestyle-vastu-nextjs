import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { FormatToggle } from '@/components/format-toggle';
import { consultationFormats } from '@/lib/services-data';

describe('FormatToggle', () => {
  it('renders accessible options and shows the selected format details', () => {
    render(<FormatToggle formats={consultationFormats} />);

    expect(screen.getByRole('radiogroup', { name: 'Consultation format' })).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(2);
    expect(screen.getByRole('radio', { name: 'On-site' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('radio', { name: 'Online / remote' })).toHaveAttribute('aria-checked', 'false');
    expect(screen.getByRole('heading', { name: 'On-site consultation' })).toBeInTheDocument();
  });

  it('updates the selected option and details when the user selects another format', async () => {
    const user = userEvent.setup();
    render(<FormatToggle formats={consultationFormats} />);

    await user.click(screen.getByRole('radio', { name: 'Online / remote' }));

    expect(screen.getByRole('radio', { name: 'Online / remote' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('radio', { name: 'On-site' })).toHaveAttribute('aria-checked', 'false');
    expect(screen.getByRole('heading', { name: 'Online / remote consultation' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ask which format suits my property' })).toHaveAttribute('href', expect.stringContaining('online%20%2F%20remote'));
  });
});
