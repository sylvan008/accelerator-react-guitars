import {render, screen} from '@testing-library/react';
import SearchResultList from './search-result-list';
import {createMockGuitar} from '../../utils/mock/guitar-mock';

describe('Component: SearchResultList', () => {
  const searchResult = [
    createMockGuitar(),
    createMockGuitar(),
    createMockGuitar(),
  ];
  const nameRegexp = new RegExp(searchResult.map((guitar) => guitar.name).join('|'), 'i');

  it('should render correctly', () => {
    render(<SearchResultList searchResult={searchResult} />);

    expect(screen.getAllByText(nameRegexp)).toHaveLength(searchResult.length);
  });
});
