import {SortingDirection, SortingType} from '../utils/const/sorting';

export type SortType = Lowercase<keyof typeof SortingType> | null;

export type SortItem = {
  type: SortType,
  label: string,
}

export type Direction = keyof typeof SortingDirection | null;
