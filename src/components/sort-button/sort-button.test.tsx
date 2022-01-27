import {render, screen} from '@testing-library/react';
import {SortingType} from '../../utils/const/sorting';
import SortButton from './sort-button';

describe('Component: SortButton', () => {
  const sortItem = {
    label: 'по цене',
    type: SortingType.Price,
  };
  const isActive = false;
  const onClick = jest.fn();

  it('should render correctly', () => {
    render(
      <SortButton
        isActive={isActive}
        sortItem={sortItem}
        onClick={onClick}
      />);

    expect(screen.getByText(sortItem.label)).toBeInTheDocument();
  });

  it('should call click handler', () => {
    render(
      <SortButton
        isActive={isActive}
        sortItem={sortItem}
        onClick={onClick}
      />);

    const sortButton = screen.getByText(sortItem.label);
    sortButton.click();
    expect(onClick).toBeCalledTimes(1);
  });
});
