import {render, screen} from '@testing-library/react';
import FooterContacts from './footer-contacts';

describe('Component: FooterContacts', () => {
  it('should render correctly', () => {
    const contactsRegexp = /контакты/i;

    render(<FooterContacts />);

    expect(screen.getByText(contactsRegexp)).toBeInTheDocument();
  });
});
