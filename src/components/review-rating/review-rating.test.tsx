import {render, screen} from '@testing-library/react';
import ReviewRating from './review-rating';

describe('Component: ReviewRating', () => {
  it('should render correctly', () => {
    const ratingRegexp = /рейтинг:/i;
    const rating = 5;
    render(<ReviewRating rating={rating} />);

    expect(screen.getByText(ratingRegexp)).toBeInTheDocument();
    expect(screen.getByText(rating)).toBeInTheDocument();
  });
});
