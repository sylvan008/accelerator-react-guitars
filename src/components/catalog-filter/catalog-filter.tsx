import {useEffect, useRef} from 'react';
import {guitarKindFilterItems, guitarStringsFilterItems} from '../../utils/const/filter';
import {useGuitarTypesFilters} from '../../hooks/use-guitar-types-filters';
import {usePriceValueFilter} from '../../hooks/use-price-value-filter';
import {SearchRecord} from '../../types/search-query';
import {SearchParam} from '../../utils/const/searchParam';
import {GuitarStringCountType} from '../../types/filter';
import {GuitarType} from '../../types/guitar';
import FilterCheckbox from '../filter-checkbox/filter-checkbox';
import {PriceBounds} from '../../types/store';

type PropsType = {
  searchGuitarTypes: GuitarType[],
  searchGuitarString: GuitarStringCountType[],
  priceBounds: PriceBounds,
  priceMinSearch: number,
  priceMaxSearch: number,
  onSearchParamsSet: (params: SearchRecord) => void,
};

function CatalogFilter(props: PropsType): JSX.Element {
  const {
    searchGuitarTypes,
    searchGuitarString,
    priceBounds,
    priceMinSearch,
    priceMaxSearch,
    onSearchParamsSet,
  } = props;

  const inputMinPriceRef = useRef<HTMLInputElement>(null);
  const inputMaxPriceRef = useRef<HTMLInputElement>(null);

  const [
    priceMin,
    priceMax,
    onMinPriceUpdate,
    onMaxPriceUpdate,
    onPriceMinChange,
    onPriceMaxChange,
  ] = usePriceValueFilter(
    inputMinPriceRef,
    inputMaxPriceRef,
    priceBounds,
    priceMinSearch,
    priceMaxSearch,
  );

  const [
    checkedGuitarTypes,
    checkedGuitarStrings,
    guitarStringsSet,
    onGuitarTypeChange,
    onGuitarStringChange,
  ] = useGuitarTypesFilters(searchGuitarTypes, searchGuitarString);

  useEffect(() => {
    onSearchParamsSet({
      [SearchParam.Type]: checkedGuitarTypes.join(' '),
      [SearchParam.Strings]: checkedGuitarStrings.join(' '),
    });
  }, [checkedGuitarTypes, checkedGuitarStrings, onSearchParamsSet]);

  useEffect(() => {
    onSearchParamsSet({
      [SearchParam.PriceLte]: priceMin.toString(),
      [SearchParam.PriceGte]: priceMax.toString(),
    });
  }, [priceMin, priceMax, onSearchParamsSet]);

  const [priceMinBound, priceMaxBound] = priceBounds;
  const isEmptyGuitarStringsSet = guitarStringsSet.size === 0;

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">????????????</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">????????, ???</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">?????????????????????? ????????</label>
            <input
              type="number"
              placeholder={priceMinBound.toString()}
              id="priceMin"
              name="????"
              ref={inputMinPriceRef}
              defaultValue={priceMin}
              onKeyPress={onPriceMinChange}
              onBlur={onMinPriceUpdate}
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">???????????????????????? ????????</label>
            <input
              type="number"
              placeholder={priceMaxBound.toString()}
              id="priceMax"
              name="????"
              ref={inputMaxPriceRef}
              defaultValue={priceMax}
              onKeyPress={onPriceMaxChange}
              onBlur={onMaxPriceUpdate}
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">?????? ??????????</legend>

        {guitarKindFilterItems.map((guitarKindItem) => {
          const {label, type} = guitarKindItem;
          return (
            <FilterCheckbox
              isChecked={checkedGuitarTypes.includes(type)}
              key={type}
              label={label}
              name={type}
              onChange={onGuitarTypeChange}
              value={type}
            />
          );
        })}

      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">???????????????????? ??????????</legend>

        {guitarStringsFilterItems.map((guitarsStringItem) => {
          const {label, type, value} = guitarsStringItem;

          return (
            <FilterCheckbox
              isChecked={checkedGuitarStrings.includes(value)}
              isDisabled={!isEmptyGuitarStringsSet && !guitarStringsSet.has(value)}
              key={type}
              label={label}
              name={type}
              onChange={onGuitarStringChange}
              value={value}
            />
          );
        })}

      </fieldset>
    </form>
  );
}

export default CatalogFilter;
