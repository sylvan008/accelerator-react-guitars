import {GuitarKind, stringsCounts} from '../utils/const/filter';

export type GuitarStringCount = typeof stringsCounts[number];

export type GuitarType = Lowercase<keyof typeof GuitarKind>;

export type Guitar = {
  id: number,
  name: string,
  vendorCode: string,
  type: GuitarType,
  description: string,
  previewImg: string,
  stringCount: number,
  rating: number,
  price: number,
};
