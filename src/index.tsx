import React from 'react';
import ReactDOM from 'react-dom';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {createApi} from './services/api';
import {rootReducer} from './store/root-reducer';
import {loadGuitars} from './store/api-action';
import App from './components/app/app';
import {setPriceBounds} from './store/action';

const api = createApi();
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    },
  }),
});

store.dispatch(loadGuitars())
  .then(() => store.dispatch(setPriceBounds()));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
