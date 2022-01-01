import {Catalog} from '../../types/store';
import {createReducer} from '@reduxjs/toolkit';
import {setGuitars, setPriceBounds} from '../action';
import {getMinMaxPriceValue} from '../../utils/utils';

const initialState: Catalog  = {
  guitars: [],
  priceBounds: [0, 0],
};

const catalogProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(setGuitars, (state, action) => {
      state.guitars = action.payload;
    })
    .addCase(setPriceBounds, (state) => {
      state.priceBounds = getMinMaxPriceValue(state.guitars);
    });
});

export {
  catalogProcess
};
