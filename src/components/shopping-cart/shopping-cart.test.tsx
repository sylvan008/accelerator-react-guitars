import {render, screen} from '@testing-library/react';
import ShoppingCart from './shopping-cart';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {NameSpace} from '../../store/root-reducer';
import {getMockStore} from '../../utils/mock/helpers';
import {createMemoryHistory} from 'history';

describe('Component: ShoppingCart', () => {
  const mockStore = getMockStore();
  const store = mockStore({
    [NameSpace.Cart]: {
      items: [],
    },
  });

  const history = createMemoryHistory();

  const fakeApp = (
    <Provider store={store}>
      <Router history={history}>
        <ShoppingCart />
      </Router>
    </Provider>
  );
  it('should render correctly', () => {
    const labelRegexp = /корзина/i;
    render(fakeApp);

    expect(screen.getByLabelText(labelRegexp)).toBeInTheDocument();
  });
});
