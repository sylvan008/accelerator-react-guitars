import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {getMockStore} from '../../utils/mock/helpers';
import {NameSpace} from '../../store/root-reducer';
import {Provider} from 'react-redux';
import {Route, Router} from 'react-router-dom';
import {AppRoute} from '../../utils/const/app-route';
import {createMockGuitar} from '../../utils/mock/guitar-mock';
import PageCatalog from './page-catalog';

describe('Component: PageCatalog', () => {
  const history = createMemoryHistory();
  const mockStore = getMockStore();
  const store = mockStore({
    [NameSpace.Catalog]: {
      guitars: [
        createMockGuitar(),
        createMockGuitar(),
        createMockGuitar(),
      ],
      priceBounds: [1000, 30000],
      isCatalogLoad: true,
    },
  });

  const fakeApp = (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/">
          <PageCatalog />
        </Route>
        <Route path={AppRoute.Catalog}>
          <PageCatalog />
        </Route>
      </Router>
    </Provider>
  );

  it('should render correctly', () => {
    const pageTitleRegexp = /каталог гитар/i;

    render(fakeApp);

    expect(screen.getByText(pageTitleRegexp)).toBeInTheDocument();
  });
});
