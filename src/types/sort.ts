import {SortingDirection} from '../utils/const/sorting';

export type SortType = 'price' | 'rating' | null;

export type SortItem = {
  type: SortType,
  label: string,
}

export type Direction = keyof typeof SortingDirection | null;
