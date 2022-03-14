import {createAction} from '@reduxjs/toolkit';
import {ActionType} from '../types/actionType';
import {Guitar} from '../types/guitar';
import {Order, SortType} from '../types/sort';
import {ReviewServer} from '../types/review';
import {CartItem} from '../types/store';

const setGuitars = createAction(
  ActionType.SetGuitars,
  (guitars: Guitar[]) => ({
    payload: guitars,
  }),
);

const setGuitar = createAction(
  ActionType.SetGuitar,
  (guitar: Guitar) => ({
    payload: guitar,
  }),
);

const setPriceBounds = createAction(ActionType.SetPriceBounds);

const setCatalogLoad = createAction(ActionType.SetCatalogLoad);

const setSortType = createAction(
  ActionType.SetSortType,
  (sortType: SortType) => ({
    payload: sortType,
  }),
);

const setOrder = createAction(
  ActionType.SetOrder,
  (orderDirection: Order) => ({
    payload: orderDirection,
  }),
);

const setLoadDataError = createAction(ActionType.SetLoadDataError);

const setComments = createAction(
  ActionType.SetComments,
  (reviews: ReviewServer[]) => ({
    payload: reviews,
  }),
);

const addCartItem = createAction(
  ActionType.AddCartItem,
  (cartItem: CartItem) => ({
    payload: cartItem,
  }),
);

const addCartItems = createAction(
  ActionType.AddCartItems,
  (cartItem: CartItem[]) => ({
    payload: cartItem,
  }),
);

const addAppliedCoupon = createAction(
  ActionType.AddAppliedCoupon,
  (coupon: string) => ({
    payload: coupon,
  }),
);

const addDiscount = createAction(
  ActionType.AddDiscount,
  (discount: number) => ({
    payload: discount,
  }),
);

const removeCartItem = createAction(
  ActionType.RemoveCartItem,
  (guitarId: number) => ({
    payload: guitarId,
  }),
);

const removeCartItemAll = createAction(
  ActionType.RemoveCartItemAll,
  (guitarId: number) => ({
    payload: guitarId,
  }),
);

export {
  addAppliedCoupon,
  addCartItem,
  addCartItems,
  removeCartItem,
  removeCartItemAll,
  addDiscount,
  setGuitar,
  setGuitars,
  setCatalogLoad,
  setPriceBounds,
  setSortType,
  setOrder,
  setLoadDataError,
  setComments
};
