import {Cart} from '../../types/store';
import {createReducer} from '@reduxjs/toolkit';
import {addCartItem, addCartItemCount, addCoupon, removeCartItem} from '../action';
import {removeCartItemById} from '../../utils/utils';

const initialState: Cart = {
  items: [],
  coupon: null,
};

const cartProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(addCartItem, (state, action) => {
      state.items = [
        ...removeCartItemById(state.items, action.payload.guitarId),
        action.payload,
      ];
    })
    .addCase(addCartItemCount, (state, action) => {
      const oldItem = state.items.find((item) => item.guitarId === action.payload.guitarId);
      if (oldItem) {
        state.items = [
          ...removeCartItemById(state.items, action.payload.guitarId),
          {
            ...oldItem,
            count: oldItem.count + action.payload.count,
          },
        ];
      } else {
        state.items = [
          ...state.items,
          action.payload,
        ];
      }
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
