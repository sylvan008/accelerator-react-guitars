import {GuitarType} from './guitar';

export type GuitarStringCountType = '4-strings' | '6-strings' | '7-strings' | '12-strings';

export type GuitarKindFilter = {
  type: GuitarType,
  label: string,
};

export type GuitarStringFilter = {
  type: GuitarStringCountType,
  label: string,
};
