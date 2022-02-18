import {createAction} from '@reduxjs/toolkit';
import {ActionType} from '../types/actionType';
import {Guitar} from '../types/guitar';
import {Order, SortType} from '../types/sort';
import {ReviewServer} from '../types/review';

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

export {
  setGuitar,
  setGuitars,
  setCatalogLoad,
  setPriceBounds,
  setSortType,
  setOrder,
  setLoadDataError,
  setComments
};
