import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import {getMockStore} from '../../utils/mock/helpers';
import {NameSpace} from '../../store/root-reducer';
import Search from './search';

describe('Component: Search', () => {
  const history = createMemoryHistory();
  const mockStore = getMockStore();
  const store = mockStore({
    [NameSpace.Catalog as string]: {
      guitars: [],
    },
  });

  const fakeApp = (
    <Provider store={store}>
      <Router history={history}>
        <Search />
      </Router>
    </Provider>
  );

  it('should render correctly', () => {
    const searchRegExp = /начать поиск/i;

    render(fakeApp);

    expect(screen.getByText(searchRegExp)).toBeInTheDocument();
  });
});
