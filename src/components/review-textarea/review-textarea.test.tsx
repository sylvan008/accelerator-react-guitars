import {render, screen} from '@testing-library/react';
import ReviewTextarea from './review-textarea';

describe('Component: ReviewTextarea', () => {
  const errorRegexp = /заполните поле/i;
  const label = 'Комментарий';
  const id = 'comment';
  const value = 'какой то комментарий';
  const onChange = jest.fn();
  let isError = false;

  beforeEach(() => {
    isError = false;
  });

  it('should render correctly', () => {
    render(
      <ReviewTextarea
        label={label}
        name={id}
        value={value}
        isError={isError}
        id={id}
        onChange={onChange}
      />,
    );

    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText(value)).toBeInTheDocument();
    expect(screen.queryByText(errorRegexp)).not.toBeInTheDocument();
  });

  it('should show error message', () => {
    isError = true;

    render(
      <ReviewTextarea
        label={label}
        name={id}
        value={value}
        isError={isError}
        id={id}
        onChange={onChange}
      />,
    );

    expect(screen.getByText(errorRegexp)).toBeInTheDocument();
  });
});
