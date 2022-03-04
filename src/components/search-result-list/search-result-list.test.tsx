import {render, screen} from '@testing-library/react';
import SearchResultList from './search-result-list';
import {createMockGuitar} from '../../utils/mock/guitar-mock';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

describe('Component: SearchResultList', () => {
  const searchResult = [
    createMockGuitar(),
    createMockGuitar(),
    createMockGuitar(),
  ];
  const nameRegexp = new RegExp(searchResult.map((guitar) => guitar.name).join('|'), 'i');

  const onResultClick = jest.fn();
  const history = createMemoryHistory();

  const fakeApp = (
    <Router history={history}>
      <SearchResultList searchResult={searchResult} onResultClick={onResultClick} />
    </Router>
  );

  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getAllByText(nameRegexp)).toHaveLength(searchResult.length);
  });
});
