import {createApi} from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import {ApiRoute} from '../utils/const/app-route';
import {createMockGuitar} from '../utils/mock/guitar-mock';
import {loadGuitars} from './api-action';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from './root-reducer';
import {Action} from '@reduxjs/toolkit';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {setGuitars} from './action';

const OK = 200;

describe('Async action', () => {
  const api = createApi();
  const mockApi = new MockAdapter(api);

  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  const store = mockStore();

  beforeEach(store.clearActions);

  it('should dispatch setGuitars when when GET loadGuitars', async () => {
    const guitars = [
      createMockGuitar(),
      createMockGuitar(),
      createMockGuitar(),
    ];
    mockApi.onGet(ApiRoute.GetGuitars)
      .reply(OK, guitars);

    await store.dispatch(loadGuitars());

    expect(store.getActions()).toEqual([
      setGuitars(guitars),
    ]);
  });
});
