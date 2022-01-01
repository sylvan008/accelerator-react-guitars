import {GuitarKindFilter, GuitarStringCountType, GuitarStringFilter} from '../../types/filter';
import {GuitarStringCount} from '../../types/guitar';

const STRINGS = '-strings';
const createStingsCountType = (count: GuitarStringCount) => `${count}${STRINGS}` as GuitarStringCountType;

const stringsCounts = ([4, 6, 7, 12] as const);

const GuitarKind = ({
  Acoustic: 'acoustic',
  Electric: 'electric',
  Ukulele: 'ukulele',
} as const);

const guitarKindFilterItems: GuitarKindFilter[] = [
  {
    type: GuitarKind.Acoustic,
    label: 'Акустические гитары',
  },
  {
    type: GuitarKind.Electric,
    label: 'Электрогитары',
  },
  {
    type: GuitarKind.Ukulele,
    label: 'Укулеле',
  },
];

const guitarStringsFilterItems: GuitarStringFilter[] = (
  stringsCounts.map((stringCount) => ({
    type: createStingsCountType(stringCount),
    label: stringCount.toString(),
  }))
);

const GuitarStringOptions = ({
  [GuitarKind.Acoustic]: ([6, 7, 12] as GuitarStringCount[]).map((stringCount) => createStingsCountType(stringCount)),
  [GuitarKind.Electric]: ([4, 6, 7] as GuitarStringCount[]).map((stringCount) => createStingsCountType(stringCount)),
  [GuitarKind.Ukulele]: ([4] as GuitarStringCount[]).map((stringCount) => createStingsCountType(stringCount)),
} as const);

export {
  GuitarKind,
  guitarKindFilterItems,
  GuitarStringOptions,
  guitarStringsFilterItems,
  stringsCounts
};