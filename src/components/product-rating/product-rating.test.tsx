import {render, screen} from '@testing-library/react';
import ProductRating from './product-rating';

describe('Component: ProductRating', () => {
  const rating = 3;
  it('should render correctly', () => {
    render(<ProductRating rating={rating} />);

    expect(screen.getByText(rating)).toBeInTheDocument();
  });
});
