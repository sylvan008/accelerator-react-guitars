import {combineReducers} from '@reduxjs/toolkit';
import {catalogProcess} from './catalog-process/catalog-process';
import {appProcess} from './app-process/app-process';
import {productProcess} from './product-process/product-process';
import {cartProcess} from './cart-process/cart-process';

const NameSpace = ({
  Cart: 'CART',
  Catalog: 'CATALOG',
  Product: 'PRODUCT',
  App: 'APP',
} as const);

const rootReducer = combineReducers({
  [NameSpace.Catalog]: catalogProcess,
  [NameSpace.Cart]: cartProcess,
  [NameSpace.Product]: productProcess,
  [NameSpace.App]: appProcess,
});

export type State = ReturnType<typeof rootReducer>;

export {
  NameSpace,
  rootReducer
};
