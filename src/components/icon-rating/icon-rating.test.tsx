import {render, screen} from '@testing-library/react';
import IconRating from './icon-rating';
import {TestId} from '../../utils/const/test-id';

describe('Component: IconRating', () => {
  let isFullStar = false;

  it('should render correctly empty star', () => {
    render(<IconRating isFullStar={isFullStar} />);

    expect(screen.getByTestId(TestId.RatingEmpty)).toBeInTheDocument();
  });

  it('should render correctly full star', () => {
    isFullStar = true;

    render(<IconRating isFullStar={isFullStar} />);

    expect(screen.getByTestId(TestId.RatingFull)).toBeInTheDocument();
  });
});
