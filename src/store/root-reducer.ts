import {combineReducers} from '@reduxjs/toolkit';
import {catalogProcess} from './catalog-process/catalog-process';
import {appProcess} from './app-process/app-process';

const NameSpace = ({
  Catalog: 'CATALOG',
  App: 'APP',
} as const);

const rootReducer = combineReducers({
  [NameSpace.Catalog]: catalogProcess,
  [NameSpace.App]: appProcess,
});

export type State = ReturnType<typeof rootReducer>;

export {
  NameSpace,
  rootReducer
};
