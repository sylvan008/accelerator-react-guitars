import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../../store/root-reducer';
import {Action} from '@reduxjs/toolkit';

function getRandomIntegerNumber(minValue = 0, maxValue = 1) {
  if (minValue === maxValue) {
    return minValue;
  }

  let min = minValue;
  let max = maxValue;

  if (min > max) {
    [min, max] = [max, min];
  }

  return min + Math.floor(Math.random() * (max - min  + 1));
}

function getMockStore() {
  const middlewares = [thunk];
  return configureMockStore<
    State,
    Action,
    ThunkDispatch<State, unknown, Action>
    >(middlewares);
}

export {
  getMockStore,
  getRandomIntegerNumber
};
