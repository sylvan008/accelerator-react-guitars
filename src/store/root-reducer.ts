import {combineReducers} from '@reduxjs/toolkit';
import {catalogProcess} from './catalog-process/catalog-process';
import {appProcess} from './app-process/app-process';
import {productProcess} from './product-process/product-process';

const NameSpace = ({
  Catalog: 'CATALOG',
  Product: 'PRODUCT',
  App: 'APP',
} as const);

const rootReducer = combineReducers({
  [NameSpace.Catalog]: catalogProcess,
  [NameSpace.Product]: productProcess,
  [NameSpace.App]: appProcess,
});

export type State = ReturnType<typeof rootReducer>;

export {
  NameSpace,
  rootReducer
};
