import {render, screen} from '@testing-library/react';
import {TestId} from '../../utils/const/test-id';
import {IconSize} from '../../types/icon';
import Rating from './rating';

describe('Component: Rating', () => {
  const ratingRegexp = /рейтинг:/i;
  const ratingCount = 5;
  const rating = 3;
  const className = 'review__rating-panel';
  const iconSizes: IconSize = [16, 16];
  it('should render correctly', () => {
    render(<Rating rating={rating} className={className} iconSizes={iconSizes} />);

    expect(screen.getByText(rating)).toBeInTheDocument();
    expect(screen.getByText(ratingRegexp)).toBeInTheDocument();
    expect(screen.getAllByTestId(TestId.RatingFull)).toHaveLength(rating);
    expect(screen.getAllByTestId(TestId.RatingEmpty)).toHaveLength(ratingCount - rating);
  });
});
