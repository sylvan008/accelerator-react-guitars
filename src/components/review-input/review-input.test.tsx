import {render, screen} from '@testing-library/react';
import ReviewInput from './review-input';

describe('Component: ReviewInput', () => {
  const errorRegexp = /заполните поле/i;
  const label = 'Имя пользователя';
  const id = 'userName';
  const value = 'Petrovich';
  const onChange = jest.fn();
  let isError = false;

  beforeEach(() => {
    isError = false;
  });

  it('should render correctly', () => {
    render(
      <ReviewInput
        label={label}
        name={id}
        value={value}
        isError={isError}
        id={id}
        onChange={onChange}
      />,
    );

    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
    expect(screen.queryByText(errorRegexp)).not.toBeInTheDocument();
  });

  it('should show error message', () => {
    isError = true;

    render(
      <ReviewInput
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
