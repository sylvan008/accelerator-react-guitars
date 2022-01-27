import {render, screen} from '@testing-library/react';
import {SortDirection, SortingLabel} from '../../utils/const/sorting';
import SortDirectionButton from './sort-direction-button';

describe('Component: SortDirectionButton', () => {
  const sortDirection = SortDirection.ASC;
  const isActive = true;
  const onClick = jest.fn();
  const label = SortingLabel[sortDirection];

  it('should render correctly', () => {
    render(
      <SortDirectionButton
        direction={sortDirection}
        isActive={isActive}
        onCLick={onClick}
      />);

    const sortDirectionButton = screen.getByLabelText(label);
    expect(sortDirectionButton).toBeInTheDocument();
  });

  it('should call onClick handler', () => {
    render(
      <SortDirectionButton
        direction={sortDirection}
        isActive={isActive}
        onCLick={onClick}
      />);

    const sortDirectionButton = screen.getByLabelText(label);
    sortDirectionButton.click();
    expect(onClick).toBeCalledTimes(1);
  });
});
