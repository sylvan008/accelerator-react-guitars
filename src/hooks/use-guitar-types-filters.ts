import {ChangeEvent, Dispatch, useEffect, useMemo, useState} from 'react';
import {GuitarType} from '../types/guitar';
import {GuitarStringCountType} from '../types/filter';
import {GuitarStringOption} from '../utils/const/filter';

type LocalState = GuitarType[] | string[];
type HookChangeEvent = (event: ChangeEvent<HTMLInputElement>) => void;

type ReturnType = [
  checkedGuitarTypes: GuitarType[],
  checkedGuitarStrings: GuitarStringCountType[],
  guitarStringsSet: Set<GuitarStringCountType>,
  onGuitarTypeChange: HookChangeEvent,
  onGuitarStringChange: HookChangeEvent,
];

function useGuitarTypesFilters(searchGuitarTypes: GuitarType[], searchGuitarString: GuitarStringCountType[]): ReturnType {
  const [checkedGuitarTypes, setCheckedGuitarTypes] = useState<GuitarType[]>(searchGuitarTypes);
  const [checkedGuitarStrings, setCheckedGuitarStrings] = useState<GuitarStringCountType[]>(searchGuitarString);

  const guitarStringsSet = useMemo<Set<GuitarStringCountType>>(
    () => new Set(checkedGuitarTypes.flatMap((guitarType) => GuitarStringOption[guitarType])),
    [checkedGuitarTypes],
  );

  useEffect(() => {
    if (guitarStringsSet.size === 0) {
      return;
    }
    const filterStringsTypes = (checkedStrings: GuitarStringCountType[]): GuitarStringCountType[] =>
      checkedStrings.filter((stringsType) => guitarStringsSet.has(stringsType));

    setCheckedGuitarStrings((prevState) => filterStringsTypes(prevState));
  }, [guitarStringsSet]);

  const createFilterTypeChange = <S extends LocalState, U extends Dispatch<S>>(state: S, setState: U) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const {checked, value}: {checked: boolean, value: unknown} = event.target;

      const newState = checked
        ? [...state, value] as S
        : state.filter((type:unknown) => type !== value) as S;

      setState(newState);
    };

  const onGuitarTypeChange = createFilterTypeChange(checkedGuitarTypes, setCheckedGuitarTypes);
  const onGuitarStringChange = createFilterTypeChange(checkedGuitarStrings, setCheckedGuitarStrings);

  return [
    checkedGuitarTypes,
    checkedGuitarStrings,
    guitarStringsSet,
    onGuitarTypeChange,
    onGuitarStringChange,
  ];
}

export {
  useGuitarTypesFilters
};
