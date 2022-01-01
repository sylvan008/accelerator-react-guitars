import {createAction} from '@reduxjs/toolkit';
import {ActionType} from '../types/actionType';
import {Guitar} from '../types/guitar';

const setGuitars = createAction(
  ActionType.SetGuitars,
  (guitars: Guitar[]) => ({
    payload: guitars,
  }),
);

const setPriceBounds = createAction(ActionType.SetPriceBounds);

export {
  setGuitars,
  setPriceBounds
};
