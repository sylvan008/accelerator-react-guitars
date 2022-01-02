import {Guitar, GuitarStringCount, GuitarType} from './guitar';
import {Order, SortType} from './sort';

type MinValue = number;
type MaxValue = number;

export type PriceBounds = [MinValue, MaxValue];

export type Catalog = {
  guitars: Guitar[],
  priceBounds: PriceBounds,
  isCatalogLoad: boolean,
};

export type Filter = {
  name: string | null,
  price: PriceBounds | null,
  type: GuitarType | null,
  strings: GuitarStringCount | null,
};

export type Sort = {
  sort: SortType,
  order: Order,
};
