import {Catalog} from '../../types/store';
import {createReducer} from '@reduxjs/toolkit';
import {setCatalogLoad, setGuitar, setGuitars, setPriceBounds} from '../action';
import {getMinMaxPriceValue} from '../../utils/utils';

const initialState: Catalog  = {
  guitars: [],
  priceBounds: [0, 0],
  isCatalogLoad: false,
  guitar: null,
};

const catalogProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(setGuitars, (state, action) => {
      state.guitars = action.payload;
    })
    .addCase(setPriceBounds, (state) => {
      state.priceBounds = getMinMaxPriceValue(state.guitars);
    })
    .addCase(setCatalogLoad, (state) => {
      state.isCatalogLoad = true;
    })
    .addCase(setGuitar, (state, action) => {
      state.guitar = action.payload;
    });
});

export {
  catalogProcess
};
