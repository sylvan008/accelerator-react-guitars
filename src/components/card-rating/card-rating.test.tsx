import {cleanup, render, screen} from '@testing-library/react';
import CardRating from './card-rating';
import {TestId} from '../../utils/const/test-id';

describe('Component: CardRating', () => {
  const RATING_DEFAULT = 0;
  const RATING_START = 1;
  const RATING_END = 5;

  beforeEach(cleanup);

  it('should render correctly', () => {
    const ratingRegexp = /рейтинг/i;

    render(<CardRating rating={RATING_DEFAULT} />);

    expect(screen.getByText(ratingRegexp)).toBeInTheDocument();
    expect(screen.getAllByTestId(TestId.RatingEmpty)).toHaveLength(RATING_END);
  });

  for (let i = RATING_START; i <= RATING_END; i++) {
    it(`should render ${i} full star count`, () => {
      render(<CardRating rating={i} />);
      expect(screen.getAllByTestId(TestId.RatingFull)).toHaveLength(i);
    });
  }
});
