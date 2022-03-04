import {render, screen} from '@testing-library/react';
import CatalogList from './catalog-list';
import {createMockGuitar} from '../../utils/mock/guitar-mock';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

describe('Component: CatalogList', () => {
  const guitars = [
    createMockGuitar(),
    createMockGuitar(),
    createMockGuitar(),
  ];

  const history = createMemoryHistory();

  const fakeApp = (
    <Router history={history}>
      <CatalogList guitars={guitars} />
    </Router>
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
