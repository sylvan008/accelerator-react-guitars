import {NameSpace, State} from '../root-reducer';
import {createSelector} from '@reduxjs/toolkit';

const getCartItems = (state: State) => state[NameSpace.Cart].items;
const getCartItemsCount = (state: State) => state[NameSpace.Cart].items.length;
const getCartUniqItems = createSelector(
  [getCartItems],
  (items) => new Set(items),
);

export {
  getCartItems,
  getCartItemsCount,
  getCartUniqItems
};
