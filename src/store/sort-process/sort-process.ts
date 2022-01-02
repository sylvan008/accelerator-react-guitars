import {Sort} from '../../types/store';
import {createReducer} from '@reduxjs/toolkit';
import {setOrder, setSortType} from '../action';

const initialState: Sort = {
  sort: null,
  order: null,
};

const sortProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(setSortType, (state, action) => {
      state.sort = action.payload;
    })
    .addCase(setOrder, (state, action) => {
      state.order = action.payload;
    });
});

export {
  sortProcess
};
