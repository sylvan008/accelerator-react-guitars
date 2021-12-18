import {Catalog} from '../../types/store';
import {createReducer} from '@reduxjs/toolkit';
import {setGuitars} from '../action';

const initialState: Catalog  = {
  guitars: [],
};

const catalogProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(setGuitars, (state, action) => {
      state.guitars = action.payload;
    });
});

export {
  catalogProcess
};
