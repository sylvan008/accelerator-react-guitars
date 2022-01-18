import {combineReducers} from '@reduxjs/toolkit';
import {catalogProcess} from './catalog-process/catalog-process';

const NameSpace = ({
  Catalog: 'CATALOG',
} as const);

const rootReducer = combineReducers({
  [NameSpace.Catalog]: catalogProcess,
});

export type State = ReturnType<typeof rootReducer>;

export {
  NameSpace,
  rootReducer
};
