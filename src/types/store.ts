import {Guitar, GuitarStringCount, GuitarType} from './guitar';
import {Order, SortType} from './sort';
import {ReviewServer} from './review';

type MinValue = number;
type MaxValue = number;

export type PriceBounds = [MinValue, MaxValue];

export type AppState = {
  isLoadDataError: boolean,
};

export type Catalog = {
  guitars: Guitar[],
  guitar: Guitar | null,
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

export type Product = {
  guitar: Guitar | null,
  comments: ReviewServer[],
};

export type CartItem = {
  guitarId: number,
  count: number
}

export type Cart = {
  items: CartItem[],
  coupon: string | null,
};
