import {createAction} from '@reduxjs/toolkit';
import {ActionType} from '../types/actionType';
import {Guitar} from '../types/guitar';
import {PriceBounds} from '../types/store';

const setGuitars = createAction(
  ActionType.SetGuitars,
  (guitars: Guitar[]) => ({
    payload: guitars,
  }),
);

const setPriceBounds = createAction(
  ActionType.SetPriceBounds,
  (priceBounds: PriceBounds) => ({
    payload: priceBounds,
  }),
);

export {
  setGuitars,
  setPriceBounds
};
