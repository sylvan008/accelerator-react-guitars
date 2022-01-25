import {render, screen} from '@testing-library/react';
import FooterAboutUs from './footer-about-us';

describe('Component: FooterAboutUs', () => {
  it('should render correctly', () => {
    const aboutUsRegexp = /о нас/i;

    render(<FooterAboutUs />);

    expect(screen.getByText(aboutUsRegexp)).toBeInTheDocument();
  });
});
