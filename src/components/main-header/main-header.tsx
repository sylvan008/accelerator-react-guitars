import Logo from '../logo/logo';
import MainNav from '../main-nav/main-nav';
import Search from '../search/search';
import ShoppingCart from '../shopping-cart/shopping-cart';

function MainHeader(): JSX.Element {
  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Logo />
        <MainNav />
        <Search />
        <ShoppingCart />
      </div>
    </header>
  );
}

export default MainHeader;
