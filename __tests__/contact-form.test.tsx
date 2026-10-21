import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from '@/components/contact-form';

const mockFetch = jest.fn();

beforeAll(() => {
  global.fetch = mockFetch;
  Object.defineProperty(window.crypto, 'randomUUID', {
    configurable: true,
    value: jest.fn(() => 'c9a64604-e2ca-4b4b-8f1b-e2d7d6eb27a4'),
  });
});

afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
  jest.useRealTimers();
});

describe('ContactForm', () => {
  it('renders the form and the approved service choices', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /What guidance are you looking for/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Plot or land selection/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /New construction or renovation/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Industrial or factory Vastu/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Online floor-plan review/i })).toBeInTheDocument();
  });

  it('announces required-field errors and does not send an incomplete form', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole('button', { name: /Submit & Discuss/i }));

    expect(await screen.findByText('Name must be at least 2 characters')).toBeInTheDocument();
    expect(screen.getByText('Invalid phone number format')).toBeInTheDocument();
    expect(screen.getByText('City/Location is required')).toBeInTheDocument();
    expect(screen.getByText('Please select a property category')).toBeInTheDocument();
    expect(screen.getByText('Please select a service')).toBeInTheDocument();
    expect(screen.getByText('Please select a consultation format')).toBeInTheDocument();
    expect(screen.getByText('Please consent to being contacted about this inquiry')).toBeInTheDocument();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it.each([
    { phone: '123456789', message: 'Invalid phone number format' },
    { phone: '1234567890123456', message: 'Phone number must not exceed 15 digits' },
    { phone: '+91 98280 8867a', message: 'Invalid phone number format' },
  ])('rejects malformed phone input ($phone) before submitting', async ({ phone, message }) => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/Name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/Phone Number/i), phone);
    await user.type(screen.getByLabelText(/City\/Location/i), 'Jaipur');
    await user.selectOptions(screen.getByRole('combobox', { name: /What guidance are you looking for/i }), 'general_vastu');
    await user.selectOptions(screen.getByRole('combobox', { name: /Property Category/i }), 'home');
    await user.click(screen.getByRole('radio', { name: /Online \/ Remote/i }));
    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('button', { name: /Submit & Discuss/i }));

    expect(await screen.findByText(message)).toBeInTheDocument();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('saves the questionnaire, explains the WhatsApp handoff, and excludes personal details from its link', async () => {
    jest.useFakeTimers();
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, dbSuccess: true }),
    });
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/Name/i), 'John Doe');
    await user.type(screen.getByLabelText(/Phone Number/i), '+91 98280 88678');
    await user.type(screen.getByLabelText(/City\/Location/i), 'Jaipur');
    await user.selectOptions(screen.getByRole('combobox', { name: /What guidance are you looking for/i }), 'floor_plan_review');
    await user.selectOptions(screen.getByRole('combobox', { name: /Property Category/i }), 'home');
    await user.click(screen.getByRole('radio', { name: /Online \/ Remote/i }));
    await user.click(screen.getByRole('checkbox'));
    await user.type(screen.getByPlaceholderText(/review the floor plan for a new office space/i), 'Review my new floor plan');
    await user.click(screen.getByRole('button', { name: /Submit & Discuss/i }));

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
    const request = JSON.parse(mockFetch.mock.calls[0][1].body as string);
    expect(request).toMatchObject({
      submissionId: 'c9a64604-e2ca-4b4b-8f1b-e2d7d6eb27a4',
      name: 'John Doe',
      phone: '919828088678',
      location: 'Jaipur',
      type: 'home',
      serviceInterest: 'floor_plan_review',
      format: 'online',
      consent: true,
    });
    expect(request.consentTimestamp).toBeUndefined();
    expect(request.privacyPolicyVersion).toBeUndefined();

    expect(await screen.findByRole('status')).toHaveTextContent('Your inquiry has been saved');
    const whatsappLink = screen.getByRole('link', { name: 'Continue to WhatsApp now' });
    expect(whatsappLink).toHaveAttribute('href', expect.stringContaining('wa.me/919828088678'));
    const whatsappMessage = decodeURIComponent((whatsappLink.getAttribute('href') ?? '').split('?text=')[1] ?? '');
    expect(whatsappMessage).toContain('online floor-plan review');
    expect(whatsappMessage).not.toContain('home');
    expect(whatsappMessage).not.toContain('John Doe');
    expect(whatsappMessage).not.toContain('98280');
    expect(whatsappMessage).not.toContain('Jaipur');
    expect(whatsappMessage).not.toContain('Review my new floor plan');
    expect(jest.getTimerCount()).toBe(1);
  });

  it('shows a screen-reader alert and does not offer WhatsApp if persistence fails', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ error: 'We could not save your inquiry.' }),
    });

    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText(/Name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/Phone Number/i), '9876543210');
    await user.type(screen.getByLabelText(/City\/Location/i), 'Jaipur');
    await user.selectOptions(screen.getByRole('combobox', { name: /What guidance are you looking for/i }), 'general_vastu');
    await user.selectOptions(screen.getByRole('combobox', { name: /Property Category/i }), 'home');
    await user.click(screen.getByRole('radio', { name: /Online \/ Remote/i }));
    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('button', { name: /Submit & Discuss/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent('We could not save your inquiry');
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Continue to WhatsApp now' })).not.toBeInTheDocument();
  });
});
