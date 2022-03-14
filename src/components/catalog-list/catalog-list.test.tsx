import {render, screen} from '@testing-library/react';
import CatalogList from './catalog-list';
import {createMockGuitar} from '../../utils/mock/guitar-mock';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {getMockStore} from '../../utils/mock/helpers';
import {NameSpace} from '../../store/root-reducer';
import {Provider} from 'react-redux';

describe('Component: CatalogList', () => {
  const mockStore = getMockStore();

  const store = mockStore({
    [NameSpace.Cart]: {
      items: [],
    },
  });

  const guitars = [
    createMockGuitar(),
    createMockGuitar(),
    createMockGuitar(),
  ];
  const history = createMemoryHistory();

  const onBuyClick = jest.fn();

  const fakeApp = (
    <Provider store={store}>
      <Router history={history}>
        <CatalogList guitars={guitars} onBuyClick={onBuyClick} />
      </Router>
    </Provider>
  );

  it('should render correctly', () => {
    const guitarNamesRegexp = new RegExp(guitars
      .map((guitar) => guitar.name)
      .join('|'),
    'i',
    );
    render(fakeApp);

    expect(screen.getAllByText(guitarNamesRegexp)).toHaveLength(guitars.length);
  });
});
