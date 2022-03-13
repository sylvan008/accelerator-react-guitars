import {NameSpace, State} from '../root-reducer';
import {createSelector} from '@reduxjs/toolkit';
import {getGuitars} from '../catalog-process/selectors';

const getCartItems = (state: State) => state[NameSpace.Cart].items;
const getCartItemsCount = (state: State) => state[NameSpace.Cart].items.length;
const getDiscount = (state: State) => state[NameSpace.Cart].discount;
const getAppliedCoupon = (state: State) => state[NameSpace.Cart].appliedCoupon;
const getCartUniqItems = createSelector(
  [getCartItems],
  (items) => new Set(items),
);
const getGuitarsFromCart = createSelector(
  [getCartUniqItems, getGuitars],
  (guitarIds, guitars) => guitars.filter((guitar) => guitarIds.has(guitar.id)),
);
const getItemCount = createSelector(
  [getCartItems],
  (items) => {
    const itemCount: Record<string, number> = {};
    items.forEach((item) => {
      if (!itemCount[item]) {
        itemCount[item] = 1;
      } else {
        itemCount[item] += 1;
      }
    });
    return itemCount;
  },
);

export {
  getAppliedCoupon,
  getCartItems,
  getCartItemsCount,
  getCartUniqItems,
  getDiscount,
  getGuitarsFromCart,
  getItemCount
};
