import {render, screen} from '@testing-library/react';
import CatalogList from './catalog-list';
import {createMockGuitar} from '../../utils/mock/guitar-mock';

describe('Component: CatalogList', () => {
  const guitars = [
    createMockGuitar(),
    createMockGuitar(),
    createMockGuitar(),
  ];

  it('should render correctly', () => {
    const guitarNamesRegexp = new RegExp(guitars
      .map((guitar) => guitar.name)
      .join('|'),
    'i',
    );
    render(<CatalogList guitars={guitars} />);

    expect(screen.getAllByText(guitarNamesRegexp)).toHaveLength(guitars.length);
  });
});
