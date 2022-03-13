import {createReducer} from '@reduxjs/toolkit';
import {Cart} from '../../types/store';
import {addAppliedCoupon, addCartItem, addCartItems, addDiscount, removeCartItem, removeCartItemAll} from '../action';
import {removeCartItemById} from '../../utils/utils';

const initialState: Cart = {
  appliedCoupon: '',
  items: [],
  discount: 0,
};

const cartProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(addAppliedCoupon, (state, action) => {
      state.appliedCoupon = action.payload;
    })
    .addCase(addCartItem, (state, action) => {
      state.items.push(action.payload);
    })
    .addCase(addCartItems, (state, action) => {
      const updatedItemId = action.payload[0];
      const filteredItems = removeCartItemById(state.items, updatedItemId);
      state.items = filteredItems.concat(action.payload);
    })
    .addCase(removeCartItem, (state, action) => {
      const productIndex = state.items.findIndex((element) => element === action.payload);
      const copyItems = state.items.slice();
      copyItems.splice(productIndex, 1);
      state.items = copyItems;
    })
    .addCase(removeCartItemAll, (state, action) => {
      state.items = removeCartItemById(state.items, action.payload);
    })
    .addCase(addDiscount, (state, action) => {
      state.discount = action.payload;
    });
});

export {
  cartProcess
};
