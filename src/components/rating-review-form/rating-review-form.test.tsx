import {render, screen} from '@testing-library/react';
import RatingReviewForm from './rating-review-form';

describe('Component: RatingReviewForm', () => {
  const inputCount = 5;
  const valueRegexp = /[1-5]/;
  const errorRegexp = /поставьте оценку/i;
  const rating = 4;
  const name = 'rating';
  const onChange = jest.fn();
  let isInvalid = false;

  it('should render correctly', () => {
    render(
      <RatingReviewForm
        isInvalid={isInvalid}
        rating={rating}
        name={name}
        onChange={onChange}
      />,
    );

    expect(screen.getAllByDisplayValue(valueRegexp)).toHaveLength(inputCount);
    expect(screen.queryByText(errorRegexp)).not.toBeInTheDocument();
  });

  it('should show error message', () => {
    isInvalid = true;
    render(
      <RatingReviewForm
        isInvalid={isInvalid}
        rating={rating}
        name={name}
        onChange={onChange}
      />,
    );

    expect(screen.getByText(errorRegexp)).toBeInTheDocument();
  });
});
