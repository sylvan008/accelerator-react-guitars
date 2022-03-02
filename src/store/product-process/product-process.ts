import {createReducer} from '@reduxjs/toolkit';
import {setGuitar, setComments} from '../action';
import {Product} from '../../types/store';

const initialState: Product = {
  guitar: null,
  comments: [],
};

const productProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(setGuitar, (state, action) => {
      state.guitar = action.payload;
    })
    .addCase(setComments, (state, action) => {
      state.comments = action.payload;
    });
});

export {
  productProcess
};
