import {createAction} from '@reduxjs/toolkit';
import {ActionType} from '../types/actionType';
import {Guitar} from '../types/guitar';
import {Order, SortType} from '../types/sort';

const setGuitars = createAction(
  ActionType.SetGuitars,
  (guitars: Guitar[]) => ({
    payload: guitars,
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

export {
  setGuitars,
  setCatalogLoad,
  setPriceBounds,
  setSortType,
  setOrder
};
