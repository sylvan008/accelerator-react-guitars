import {TestId} from '../../utils/const/test-id';
import Logo from '../logo/logo';
import MainNav from '../main-nav/main-nav';
import Search from '../search/search';
import ShoppingCart from '../shopping-cart/shopping-cart';

function MainHeader(): JSX.Element {
  return (
    <header className="header" id="header" data-testid={TestId.MainHeader}>
      <div className="container header__wrapper">
        <Logo className="header__logo" />
        <MainNav />
        <Search />
        <ShoppingCart />
      </div>
    </header>
  );
}

export default MainHeader;
