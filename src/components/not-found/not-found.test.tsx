import {cleanup, render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Route, Router, Switch} from 'react-router-dom';
import {AppRoute} from '../../utils/const/app-route';
import NotFound from './not-found';

describe('Component: NotFound', () => {
  const NON_EXIST_PAGE = '/non-exist';
  const ROLE_LINK = 'link';
  const notFoundRegExp = /ничего не найдено!/i;
  const mainPageRegExp = /главная страница/i;


  const history = createMemoryHistory();
  const fakeApp = (
    <Router history={history}>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <h1>Главная страница</h1>
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );

  beforeEach(() => {
    cleanup();
  });

  it('should render correctly', () => {
    render(fakeApp);
    expect(screen.queryByText(notFoundRegExp)).not.toBeInTheDocument();

    history.push(NON_EXIST_PAGE);
    expect(screen.getByText(notFoundRegExp)).toBeInTheDocument();
    expect(screen.getByRole(ROLE_LINK)).toBeInTheDocument();
  });

  it('should go tho the main page', () => {
    render(fakeApp);

    history.push(NON_EXIST_PAGE);
    const link = screen.getByRole(ROLE_LINK);
    link.click();

    expect(screen.getByText(mainPageRegExp)).toBeInTheDocument();
    expect(screen.queryByText(notFoundRegExp)).not.toBeInTheDocument();
  });
});
