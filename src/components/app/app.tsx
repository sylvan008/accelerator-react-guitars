import {Redirect, Route, Router} from 'react-router-dom';
import {browserHistory} from '../../services/browser-history';
import {AppRoute} from '../../utils/const/app-route';
import PageCatalog from '../page-catalog/page-catalog';

function App(): JSX.Element {
  const {search} = browserHistory.location;
  return (
    <Router history={browserHistory}>
      <Redirect exact from="/" to={`${AppRoute.Catalog}${search.toString()}`} />
      <Route exact path={AppRoute.Catalog} component={PageCatalog} />
    </Router>
  );
}

export default App;
