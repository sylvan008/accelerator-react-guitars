import React, {useEffect, useRef} from 'react';
import {guitarKindFilterItems, guitarStringsFilterItems} from '../../utils/const/filter';
import {useGuitarTypesFilters} from '../../hooks/use-guitar-types-filters';
import {usePriceValueFilter} from '../../hooks/use-price-value-filter';
import {SearchRecord} from '../../types/search-query';
import {SearchParam} from '../../utils/const/searchParam';
import FilterCheckbox from '../filter-checkbox/filter-checkbox';

type PropsType = {
  setSearchParams: (params: SearchRecord) => void,
};

function CatalogFilter(props: PropsType): JSX.Element {
  const {setSearchParams} = props;
  const inputMinPriceRef = useRef<HTMLInputElement>(null);
  const inputMaxPriceRef = useRef<HTMLInputElement>(null);

  const [
    priceMinBound,
    priceMaxBound,
    onMinPriceUpdate,
    onMaxPriceUpdate,
    onPriceMinChange,
    onPriceMaxChange,
  ] = usePriceValueFilter(inputMinPriceRef, inputMaxPriceRef);

  const [
    checkedGuitarTypes,
    checkedGuitarStrings,
    guitarStringsSet,
    onGuitarTypeChange,
    onGuitarStringChange,
  ] = useGuitarTypesFilters();

  useEffect(() => {
    setSearchParams({
      [SearchParam.Type]: checkedGuitarTypes.join(' '),
      [SearchParam.Strings]: checkedGuitarStrings.join(' '),
    });
  }, [checkedGuitarTypes, checkedGuitarStrings, setSearchParams]);

  const isEmptyGuitarStringsSet = guitarStringsSet.size === 0;

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input
              type="number"
              placeholder={priceMinBound.toString()}
              id="priceMin"
              name="от"
              ref={inputMinPriceRef}
              defaultValue={priceMinBound}
              onKeyPress={onPriceMinChange}
              onBlur={onMinPriceUpdate}
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input
              type="number"
              placeholder={priceMaxBound.toString()}
              id="priceMax"
              name="до"
              ref={inputMaxPriceRef}
              defaultValue={priceMaxBound}
              onKeyPress={onPriceMaxChange}
              onBlur={onMaxPriceUpdate}
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>

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
        <legend className="catalog-filter__block-title">Количество струн</legend>

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
