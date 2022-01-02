import {combineReducers} from '@reduxjs/toolkit';
import {catalogProcess} from './catalog-process/catalog-process';
import {sortProcess} from './sort-process/sort-process';

const NameSpace = ({
  Catalog: 'CATALOG',
  Sort: 'SORT',
} as const);

const rootReducer = combineReducers({
  [NameSpace.Catalog]: catalogProcess,
  [NameSpace.Sort]: sortProcess,
});

export type State = ReturnType<typeof rootReducer>;

export {
  NameSpace,
  rootReducer
};
