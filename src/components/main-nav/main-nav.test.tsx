import {cleanup, render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Route, Router} from 'react-router-dom';
import {TestId} from '../../utils/const/test-id';
import MainNav from './main-nav';
import {AppRoute} from '../../utils/const/app-route';

describe('Component: MainNav', () => {
  const catalogText = 'каталог товаров';
  const catalogRegExp = /каталог/i;
  const history = createMemoryHistory();

  const fakeApp = (
    <Router history={history}>
      <Route path={AppRoute.Main}>
        <MainNav />
      </Route>
      <Route path={AppRoute.Catalog}>
        <MainNav />
        <h1>{catalogText}</h1>
      </Route>
    </Router>
  );

  beforeEach(cleanup);

  it('should render correctly', () => {
    const roleLink = 'link';
    render(fakeApp);

    expect(screen.getByTestId(TestId.MainNav)).toBeInTheDocument();
    expect(screen.getAllByRole(roleLink)).toHaveLength(3);
  });

  it('should go to the catalog page', () => {
    render(fakeApp);

    const catalogLink = screen.getByText(catalogRegExp);
    expect(catalogLink).toBeInTheDocument();

    catalogLink.click();
    expect(screen.getByText(catalogText)).toBeInTheDocument();
  });
});
