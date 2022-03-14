import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import {TestId} from '../../utils/const/test-id';
import {Provider} from 'react-redux';
import MainHeader from './main-header';
import {NameSpace} from '../../store/root-reducer';
import {getMockStore} from '../../utils/mock/helpers';

describe('Component: MainHeader', () => {
  const history = createMemoryHistory();
  const mockStore = getMockStore();
  const store = mockStore({
    [NameSpace.Catalog]: {
      guitars: [],
    },
    [NameSpace.Cart]: {
      items: [],
    },
  });

  const fakeApp = (
    <Provider store={store}>
      <Router history={history}>
        <MainHeader />
      </Router>
    </Provider>
  );

  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByTestId(TestId.MainHeader)).toBeInTheDocument();
  });
});
