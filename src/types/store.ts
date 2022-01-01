import {Guitar} from './guitar';

type MinValue = number;
type MaxValue = number;

export type PriceBounds = [MinValue, MaxValue];

export type Catalog = {
  guitars: Guitar[],
  priceBounds: PriceBounds,
  isCatalogLoad: boolean,
};
