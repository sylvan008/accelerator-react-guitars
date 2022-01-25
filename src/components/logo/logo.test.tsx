import {cleanup, render, screen} from '@testing-library/react';
import Logo from './logo';
import {Route, Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import { AppRoute } from '../../utils/const/app-route';

describe('Component: Logo', () => {
  const role = 'link';
  const somePagePath = '/some-page';
  const mainPageText = 'main page';
  const history = createMemoryHistory();

  const mockApp = (
    <Router history={history}>
      <Route exact path={AppRoute.Main}>
        <Logo />
        <h1>{mainPageText}</h1>
      </Route>
      <Route exact path={somePagePath}>
        <Logo />
      </Route>
    </Router>
  );

  beforeEach(cleanup);

  it('should render correctly', () => {
    const altTextRegexp = /логотип/i;
    render(mockApp);

    expect(screen.getByRole(role)).toBeInTheDocument();
    expect(screen.getByAltText(altTextRegexp)).toBeInTheDocument();
  });

  it('should go to the main page', () => {
    render(mockApp);

    history.push(somePagePath);
    const logoElement = screen.getByRole(role);
    logoElement.click();

    expect(screen.getByText(mainPageText)).toBeInTheDocument();
  });
});
