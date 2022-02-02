import {Redirect, Route, Router, Switch} from 'react-router-dom';
import {browserHistory} from '../../services/browser-history';
import {AppRoute} from '../../utils/const/app-route';
import PageCatalog from '../page-catalog/page-catalog';
import NotFound from '../not-found/not-found';

function App(): JSX.Element {
  const {search} = browserHistory.location;
  return (
    <Router history={browserHistory}>
      <Switch>
        <Redirect exact from="/" to={`${AppRoute.Catalog}${search.toString()}`} />
        <Route exact path={AppRoute.Catalog} component={PageCatalog} />
        <Route exact path={AppRoute.CatalogPage} component={PageCatalog} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
