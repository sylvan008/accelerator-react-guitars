import {GuitarType} from './guitar';
import {stringsCounts} from '../utils/const/filter';

export type GuitarStringCountType = typeof stringsCounts[number];

export type GuitarKindFilter = {
  type: GuitarType,
  label: string,
};

export type GuitarStringFilter = {
  type: string,
  label: string,
  value: GuitarStringCountType
};
