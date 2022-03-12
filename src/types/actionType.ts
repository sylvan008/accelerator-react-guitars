import {Action, ThunkAction, ThunkDispatch} from '@reduxjs/toolkit';
import {State} from '../store/root-reducer';
import {AxiosInstance} from 'axios';

export enum ActionType {
  AddCoupon = 'cart/add-coupon',
  AddCartItem = 'cart/add-cart-item',
  AddCartItemCount = 'cart/add-cart-item-count',
  RemoveCartItem = 'cart/remove-cart-item',
  SetLoadDataError = 'app/set_load_data_error',
  SetGuitars = 'catalog/set_guitars',
  SetPriceBounds = 'catalog/set_price_bounds',
  SetCatalogLoad = 'catalog/set_catalog_load',
  SetSortType = 'sort/set_sort_type',
  SetOrder = 'sort/set_order',
  SetGuitar = 'product/set_guitar',
  SetComments = 'product/set_comments'
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
