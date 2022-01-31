import {render, screen} from '@testing-library/react';
import CatalogFilter from './catalog-filter';
import {PriceBounds} from '../../types/store';
import {GuitarKind, stringsCounts} from '../../utils/const/filter';

describe('Component: CatalogFilter', () => {
  const priceBounds = [0, 0] as PriceBounds;
  const priceMinSearch = priceBounds[0];
  const priceMaxSearch = priceBounds[1];
  const searchGuitarString = [stringsCounts[0]];
  const searchGuitarTypes = [GuitarKind.Acoustic];

  const setSearchParamsMock = jest.fn();

  it('should render correctly', () => {
    const filterRegexp = /фильтр/i;

    render(
      <CatalogFilter
        priceBounds={priceBounds}
        priceMinSearch={priceMinSearch}
        priceMaxSearch={priceMaxSearch}
        searchGuitarString={searchGuitarString}
        searchGuitarTypes={searchGuitarTypes}
        onSearchParamsSet={setSearchParamsMock}
      />,
    );

    expect(screen.getByText(filterRegexp)).toBeInTheDocument();
  });
});
