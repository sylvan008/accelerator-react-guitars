import {render, screen} from '@testing-library/react';
import FooterInformation from './footer-information';

describe('Component: FooterInformation', () => {
  it('should render correctly', () => {
    const aboutUsRegexp = /о нас/i;

    render(<FooterInformation />);

    expect(screen.getByText(aboutUsRegexp)).toBeInTheDocument();
  });
});
