import {render, screen} from '@testing-library/react';
import FilterCheckbox from './filter-checkbox';
import {TestId} from '../../utils/const/test-id';

describe('Component: FilterCheckbox', () => {
  const name = 'guitar';
  const isChecked = false;
  const isDisabled = false;
  const label = 'гитара';
  const onChange = jest.fn();
  const value = 'guitar';

  beforeEach(() => {
    onChange.mockClear();
  });

  it('should render correctly', () => {
    render(
      <FilterCheckbox
        name={name}
        isChecked={isChecked}
        isDisabled={isDisabled}
        label={label}
        onChange={onChange}
        value={value}
      />,
    );

    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByTestId(TestId.FilterCheckbox)).toBeInTheDocument();
  });

  it('should call function onChange', () => {
    render(
      <FilterCheckbox
        name={name}
        isChecked={isChecked}
        isDisabled={isDisabled}
        label={label}
        onChange={onChange}
        value={value}
      />,
    );

    const checkbox = screen.getByTestId(TestId.FilterCheckbox);
    checkbox.click();
    expect(onChange).toBeCalledTimes(1);
  });
});
