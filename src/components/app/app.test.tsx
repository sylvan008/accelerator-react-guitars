import thunk, {ThunkDispatch} from 'redux-thunk';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action} from '@reduxjs/toolkit';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {NameSpace, State} from '../../store/root-reducer';
import App from './app';

const middlewares = [thunk];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, unknown, Action>
>(middlewares);

const store = mockStore({
  [NameSpace.Catalog as string]: {
    guitars: [],
    priceBounds: [0, 0],
    isCatalogLoad: true,
  },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('App routing', () => {
  it('should render catalog page', () => {
    const catalogRegexp = /каталог гитар/i;

    render(fakeApp);

    expect(screen.getByText(catalogRegexp)).toBeInTheDocument();
  });
});
