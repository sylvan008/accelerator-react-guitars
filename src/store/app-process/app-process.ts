import {createReducer} from '@reduxjs/toolkit';
import {AppState} from '../../types/store';
import {setLoadDataError} from '../action';

const initialState: AppState = {
  isLoadDataError: false,
};

const appProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(setLoadDataError, (state) => {
      state.isLoadDataError = true;
    });
});

export {
  appProcess
};
