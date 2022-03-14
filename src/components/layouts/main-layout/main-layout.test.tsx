import {render, screen} from '@testing-library/react';
import MainLayout from './main-layout';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {getMockStore} from '../../../utils/mock/helpers';
import {Provider} from 'react-redux';
import {NameSpace} from '../../../store/root-reducer';

describe('Component: MainLayout', () => {
  const content = 'content';
  const history = createMemoryHistory();
  const mockStore = getMockStore();
  const store = mockStore({
    [NameSpace.Catalog]: {
      guitars: [],
      priceBounds: [0, 0],
      isCatalogLoad: true,
    },
    [NameSpace.Cart]: {
      items: [],
    },
  });

  const fakeApp = (
    <Provider store={store}>
      <Router history={history}>
        <MainLayout>
          <p>{content}</p>
        </MainLayout>
      </Router>
    </Provider>
  );

  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(content)).toBeInTheDocument();
  });
});
