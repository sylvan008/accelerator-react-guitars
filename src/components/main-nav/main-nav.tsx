import {Link, matchPath, useLocation} from 'react-router-dom';
import {AppRoute} from '../../utils/const/app-route';
import {TestId} from '../../utils/const/test-id';

function checkPath(pathname: string, route: string, exact: boolean): boolean {
  const match = matchPath(
    pathname,
    {
      path: route,
      exact: false,
    },
  );
  return route === match?.path && match.isExact === exact;
}

function MainNav(): JSX.Element {
  const {pathname} = useLocation();
  const isCatalogPage = checkPath(pathname, AppRoute.CatalogPage, true);
  const isCatalog = checkPath(pathname, AppRoute.Catalog, true);

  const classNames = ['link', 'main-nav__link', isCatalogPage || isCatalog ? 'link--current' : '']
    .join(' ').trim();

  return (
    <nav className="main-nav" data-testid={TestId.MainNav}>
      <ul className="main-nav__list">
        <li>
          <Link className={classNames} to={AppRoute.Catalog}>Каталог</Link>
        </li>
        <li>
          <a className="link main-nav__link" href="#">Где купить?</a>
        </li>
        <li>
          <a className="link main-nav__link" href="#">О компании</a>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
