import {SortDirection, SortingType} from '../utils/const/sorting';

export type SortType = Lowercase<keyof typeof SortingType> | null;

export type SortItem = {
  type: SortType,
  label: string,
};

export type Order = keyof typeof SortDirection | null;

export type Direction = keyof typeof SortDirection | null;
