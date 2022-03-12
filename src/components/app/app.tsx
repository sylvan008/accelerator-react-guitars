import {Redirect, Route, Router, Switch} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {browserHistory} from '../../services/browser-history';
import {AppRoute} from '../../utils/const/app-route';
import {getIsLoadDataError} from '../../store/app-process/selectors';
import PageCatalog from '../page-catalog/page-catalog';
import NotFound from '../not-found/not-found';
import PageProduct from '../page-product/page-product';
import PageCart from '../page-cart';
import ServerUnavailable from '../server-unavailable/server-unavailable';
import ErrorBoundary from '../error-boundary/error-boundary';

function App(): JSX.Element {
  const {search} = browserHistory.location;
  const isLoadDataError = useSelector(getIsLoadDataError);

  if (isLoadDataError) {
    return <ServerUnavailable />;
  }

  return (
    <ErrorBoundary>
      <Router history={browserHistory}>
        <Switch>
          <Redirect exact from="/" to={`${AppRoute.Catalog}${search.toString()}`} />
          <Route exact path={AppRoute.Catalog} component={PageCatalog} />
          <Route exact path={AppRoute.CatalogPage} component={PageCatalog} />
          <Route exact path={AppRoute.ProductPage} component={PageProduct} />
          <Route exact path={AppRoute.Cart} component={PageCart} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
