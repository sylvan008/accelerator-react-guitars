import {Action, ThunkAction, ThunkDispatch} from '@reduxjs/toolkit';
import {State} from '../store/root-reducer';
import {AxiosInstance} from 'axios';

export enum ActionType {
  SetGuitars = 'catalog/set_guitars',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
