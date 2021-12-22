import React, {ChangeEvent, useState, Dispatch, useEffect, useMemo} from 'react';
import {guitarKindFilterItems, GuitarStringOptions, guitarStringsFilterItems} from '../../utils/const/filter';
import {GuitarType} from '../../types/guitar';
import {GuitarStringCountType} from '../../types/filter';
import FilterCheckbox from '../filter-checkbox/filter-checkbox';

type LocalState = GuitarType[] | string[];

function CatalogFilter(): JSX.Element {
  const [checkedGuitarTypes, setCheckedGuitarTypes] = useState<GuitarType[]>([]);
  const [checkedGuitarStrings, setCheckedGuitarStrings] = useState<GuitarStringCountType[]>([]);

  const guitarStringsSet = useMemo<Set<GuitarStringCountType>>(
    () => new Set(checkedGuitarTypes.flatMap((guitarType) => GuitarStringOptions[guitarType])),
    [checkedGuitarTypes],
  );
  const isEmptyGuitarStringsSet = guitarStringsSet.size === 0;

  useEffect(() => {
    const filterStringsTypes = (checkedStrings: GuitarStringCountType[]): GuitarStringCountType[] =>
      checkedStrings.filter((stringsType) => guitarStringsSet.has(stringsType));

    setCheckedGuitarStrings((prevState) => filterStringsTypes(prevState));
  }, [guitarStringsSet]);

  const onFilterTypeChange = <S extends LocalState, U extends Dispatch<S>>(state: S, setState: U) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const {checked, value}: {checked: boolean, value: unknown} = event.target;

      const newState = checked
        ? [...state, value] as S
        : state.filter((type) => type !== value) as S;

      setState(newState);
    };

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input type="number" placeholder="1 000" id="priceMin" name="от"/>
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input type="number" placeholder="30 000" id="priceMax" name="до"/>
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
              onChange={onFilterTypeChange(checkedGuitarTypes, setCheckedGuitarTypes)}
              value={type}
            />
          );
        })}

      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>

        {guitarStringsFilterItems.map((guitarsStringItem) => {
          const {label, type} = guitarsStringItem;

          return (
            <FilterCheckbox
              isChecked={checkedGuitarStrings.includes(type)}
              isDisabled={!isEmptyGuitarStringsSet && !guitarStringsSet.has(type)}
              key={type}
              label={label}
              name={type}
              onChange={onFilterTypeChange(checkedGuitarStrings, setCheckedGuitarStrings)}
              value={type}
            />
          );
        })}

      </fieldset>
    </form>
  );
}

export default CatalogFilter;
