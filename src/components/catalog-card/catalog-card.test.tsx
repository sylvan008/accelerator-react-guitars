import {render, screen} from '@testing-library/react';
import CatalogCard from './catalog-card';
import {createMockGuitar} from '../../utils/mock/guitar-mock';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';

describe('Component: CatalogCard', () => {
  const guitarMock = createMockGuitar();

  const history = createMemoryHistory();
  const fakeApp = (
    <Router history={history}>
      <CatalogCard guitar={guitarMock} />
    </Router>
  );

  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(guitarMock.name)).toBeInTheDocument();
  });
});
