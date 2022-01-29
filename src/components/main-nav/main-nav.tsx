import {Link} from 'react-router-dom';
import {AppRoute} from '../../utils/const/app-route';
import {TestId} from '../../utils/const/test-id';

function MainNav(): JSX.Element {
  return (
    <nav className="main-nav" data-testid={TestId.MainNav}>
      <ul className="main-nav__list">
        <li>
          <Link className="link main-nav__link link--current" to={AppRoute.Catalog}>Каталог</Link>
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
