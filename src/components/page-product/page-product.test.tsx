import {render, screen} from '@testing-library/react';
import {getMockStore} from '../../utils/mock/helpers';
import {NameSpace} from '../../store/root-reducer';
import {createMockGuitar} from '../../utils/mock/guitar-mock';
import {createMockReview} from '../../utils/mock/comment-mock';
import {Provider} from 'react-redux';
import {generatePath, Route, Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import PageProduct from './page-product';
import {AppRoute} from '../../utils/const/app-route';

describe('Component: PageProduct', () => {
  const addToCartRegexp = /добавить в корзину/i;
  const priceRegexp = /^цена/i;
  const guitarId = 1;
  const guitar = createMockGuitar();
  const routePath = generatePath(AppRoute.ProductPage, {id: guitarId});
  const comments = new Array(3).fill('')
    .map(createMockReview)
    .map((review) => ({...review, createAt: review.createAt.toString()}));

  const mockStore = getMockStore();
  const store = mockStore({
    [NameSpace.Catalog]: {
      guitars: [],
      priceBounds: [0, 0],
      isCatalogLoad: true,
    },
    [NameSpace.Product]: {
      guitar,
      comments,
    },
  });
  const history = createMemoryHistory();

  const fakeApp = (
    <Provider store={store}>
      <Router history={history}>
        <Route path={AppRoute.ProductPage}>
          <PageProduct />
        </Route>
      </Router>
    </Provider>
  );

  it('should render correctly', () => {
    const pageRegexp = /товар/i;
    render(fakeApp);
    history.push(routePath);

    expect(screen.getByText(pageRegexp)).toBeInTheDocument();
    expect(screen.getAllByText(guitar.name)[0]).toBeInTheDocument();
    expect(screen.getByText(priceRegexp)).toBeInTheDocument();
    expect(screen.getByText(addToCartRegexp)).toBeInTheDocument();
  });
});
