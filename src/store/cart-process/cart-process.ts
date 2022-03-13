import {Cart} from '../../types/store';
import {createReducer} from '@reduxjs/toolkit';
import {addCartItem, addCoupon, removeCartItem} from '../action';
import {removeCartItemById} from '../../utils/utils';

const initialState: Cart = {
  items: [],
  coupon: null,
};

const cartProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(addCartItem, (state, action) => {
      state.items.push(action.payload);
    })
    .addCase(removeCartItem, (state, action) => {
      const productIndex = state.items.findIndex((element) => element === action.payload);
      state.items = state.items.splice(productIndex, 1);
    })
    .addCase(removeCartItem, (state, action) => {
      state.items = removeCartItemById(state.items, action.payload);
    })
    .addCase(addCoupon, (state, action) => {
      state.coupon = action.payload;
    });
});

export {
  cartProcess
};
