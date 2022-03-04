import {render, screen} from '@testing-library/react';
import ReviewRatingInput from './review-rating-input';

describe('Component: ReviewRatingInput', () => {
  const name = 'star-1';
  const title = 'title-star-1';
  const value = '5';
  const onChange = jest.fn();
  const isChecked = false;

  it('should render correctly', () => {
    render(
      <ReviewRatingInput
        isChecked={isChecked}
        name={name}
        title={title}
        value={value}
        onChange={onChange}
      />,
    );

    expect(screen.getByTitle(title)).toBeInTheDocument();
    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
  });
});
