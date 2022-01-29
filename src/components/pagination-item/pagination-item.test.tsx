import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import PaginationItem from './pagination-item';
import {TestId} from '../../utils/const/test-id';

describe('Component: PaginationItem', () => {
  const className = 'pagination__page--prev';
  const id = 'prev';
  const isActive = true;
  const pageNumber = 1;
  const linkText = pageNumber.toString();

  const history = createMemoryHistory();
  const fakeApp = (
    <Router history={history}>
      <PaginationItem
        className={className}
        id={id}
        isActive={isActive}
        linkText={linkText}
        pageNumber={pageNumber}
      />
    </Router>
  );

  it('should render correctly', () => {
    const roleLink = 'link';
    render(fakeApp);

    const paginationItem = screen.getByTestId(TestId.PaginationItem);
    const link = screen.getByRole(roleLink);

    expect(paginationItem).toBeInTheDocument();
    expect(link).toBeInTheDocument();
  });
});
