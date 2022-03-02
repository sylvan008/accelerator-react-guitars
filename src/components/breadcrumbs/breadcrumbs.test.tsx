import {render, screen} from '@testing-library/react';
import {PageName} from '../../hooks/use-breadcrumbs';
import Breadcrumbs from './breadcrumbs';
import {Route, Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

describe('Component: Breadcrumbs', () => {
  const history = createMemoryHistory();
  const fakeApp = (breadcrumbs: JSX.Element) => (
    <Router history={history}>
      <Route path="/">
        {breadcrumbs}
      </Route>
    </Router>
  );

  it('should render correctly', () => {
    render(fakeApp(<Breadcrumbs pageName={PageName.Main} />));

    const rootLink = screen.getAllByRole('link')[0];

    expect(rootLink).toBeInTheDocument();
  });
});
