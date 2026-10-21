import { render, screen } from '@testing-library/react';
import PrivacyPage from '@/app/privacy/page';

describe('PrivacyPage', () => {
  it('accurately explains email handling and the minimal WhatsApp draft', () => {
    render(<PrivacyPage />);

    expect(screen.getByText(/does not send an automatic email confirmation or notification/i)).toBeInTheDocument();
    expect(screen.getByText(/names the service category you selected/i)).toBeInTheDocument();
    expect(screen.getByText(/does not include your property category, name, phone number, email, location, or free-text inquiry/i)).toBeInTheDocument();
  });
});
