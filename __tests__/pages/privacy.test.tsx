import { render, screen } from '@testing-library/react';
import PrivacyPage from '@/app/privacy/page';

describe('PrivacyPage', () => {
  it('renders the approved policy sections in order without draft language', () => {
    const { container } = render(<PrivacyPage />);

    expect(screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent)).toEqual([
      '1. Who we are',
      '2. Information we collect',
      '3. How we use it',
      '4. Legal basis and consent',
      '5. Storage and security',
      '6. Retention',
      '7. Sharing',
      '8. Your rights and how to use them',
      '9. Children',
      '10. Cookies and tracking',
      '11. Changes to this policy',
      '12. Contact',
    ]);

    const pageText = container.textContent ?? '';
    expect(pageText).toContain('Effective from 25 October 2026');
    expect(pageText).not.toContain('[OWNER');
    expect(pageText.toLowerCase()).not.toContain('preview');
    expect(pageText).not.toContain('Owner decisions');
    expect(pageText).not.toContain('Data Protection Board');
  });
});
