import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {NameSpace} from '../../store/root-reducer';
import {getMockStore} from '../../utils/mock/helpers';
import App from './app';

const mockStore = getMockStore();

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
