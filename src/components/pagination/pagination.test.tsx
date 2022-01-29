import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import Pagination from './pagination';
import {cleanup, render, screen} from '@testing-library/react';
import {TestId} from '../../utils/const/test-id';

describe('Component: Pagination', () => {
  const history = createMemoryHistory();

  const additionalControls = 2;
  const totalPages = 5;
  const step = 2;
  let pageNumber = 1;

  const createFakeApp = (page: number, total: number, paginationStep: number) => (
    <Router history={history}>
      <Pagination pageNumber={page} totalPages={total} step={paginationStep} />
    </Router>
  );

  beforeEach(cleanup);

  it('should render correctly', () => {
    const linkRole = 'link';
    render(createFakeApp(pageNumber, totalPages, step));

    expect(screen.getByTestId(TestId.Pagination)).toBeInTheDocument();
    expect(screen.getAllByRole(linkRole)).toHaveLength(4);

    cleanup();
    pageNumber = 3;
    render(createFakeApp(pageNumber, totalPages, step));
    expect(screen.getAllByRole(linkRole)).toHaveLength(step * 2 + 1 + additionalControls);
  });
});
