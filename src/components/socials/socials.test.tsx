import {render, screen} from '@testing-library/react';
import Socials from './socials';

describe('Component: Socials', () => {
  const socialNames = ['facebook', 'twitter', 'instagram'];
  const socialsRegexp = new RegExp(socialNames.join('|'), 'i');

  it('should render correctly', () => {
    render(<Socials />);

    expect(screen.getAllByLabelText(socialsRegexp)).toHaveLength(socialNames.length);
  });
});
