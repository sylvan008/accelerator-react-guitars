import {render, screen} from '@testing-library/react';
import CatalogCard from './catalog-card';
import {createMockGuitar} from '../../utils/mock/guitar-mock';

describe('Component: CatalogCard', () => {
  const guitarMock = createMockGuitar();

  it('should render correctly', () => {
    render(<CatalogCard guitar={guitarMock} />);

    expect(screen.getByText(guitarMock.name)).toBeInTheDocument();
  });
});
