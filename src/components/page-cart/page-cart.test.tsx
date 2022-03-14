import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {getMockStore} from '../../utils/mock/helpers';
import {NameSpace} from '../../store/root-reducer';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import PageCart from './page-cart';

describe('Component: PageCart', () => {
  const history = createMemoryHistory();
  const mockStore = getMockStore();
  const store = mockStore({
    [NameSpace.Catalog]: {
      guitars: [],
      priceBounds: [1000, 30000],
      isCatalogLoad: true,
    },
    [NameSpace.Cart]: {
      items: [],
    },
  });

  const fakeApp = (
    <Provider store={store}>
      <Router history={history}>
        <PageCart />
      </Router>
    </Provider>
  );

  it('should render correctly', () => {
    const pageTitleRegexp = /Промокод на скидку/i;
    const inputPlaceholderRegexp = /Введите промокод/i;

    render(fakeApp);

    expect(screen.getByText(pageTitleRegexp)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(inputPlaceholderRegexp)).toBeInTheDocument();
  });
});
