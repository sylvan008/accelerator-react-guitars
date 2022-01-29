import {render, screen} from '@testing-library/react';
import {SortDirection, sortingItems, SortingType} from '../../utils/const/sorting';
import CatalogSort from './catalog-sort';

describe('Component: CatalogSort', () => {
  const activeDirection = SortDirection.ASC;
  const activeType = SortingType.Price;
  const onSortDirectionChange = jest.fn();
  const onSortTypeChange = jest.fn();

  it('should render correctly', () => {
    const sortRegexp = /сортировать/i;
    const sortingLabels = sortingItems.map((item) => item.label);
    const sortTypeRegexp = new RegExp(sortingLabels.join('|'), 'i');

    render(
      <CatalogSort
        activeDirection={activeDirection}
        activeType={activeType}
        onSortDirectionChange={onSortDirectionChange}
        onSortTypeChange={onSortTypeChange}
        sortingItems={sortingItems}
      />,
    );

    expect(screen.getByText(sortRegexp)).toBeInTheDocument();
    expect(screen.getAllByText(sortTypeRegexp)).toHaveLength(sortingLabels.length);
  });
});
