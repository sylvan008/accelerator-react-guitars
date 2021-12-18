import {Redirect, Route, Router} from 'react-router-dom';
import {browserHistory} from '../../services/browser-history';
import {AppRoute} from '../../utils/const/app-route';
import PageCatalog from '../page-catalog/page-catalog';

function App(): JSX.Element {
  return (
    <Router history={browserHistory}>
      <Redirect from="/" to={AppRoute.Catalog} />
      <Route exact path={AppRoute.Catalog}>
        <PageCatalog />
      </Route>
    </Router>
  );
}

export default App;
