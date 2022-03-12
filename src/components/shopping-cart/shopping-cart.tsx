import {Link} from 'react-router-dom';
import {AppRoute} from '../../utils/const/app-route';
import {useSelector} from 'react-redux';
import {getCartItemsCount} from '../../store/cart-process/selectors';

function ShoppingCart(): JSX.Element {
  const cartItemsCount = useSelector(getCartItemsCount);

  return (
    <Link className="header__cart-link" to={AppRoute.Cart} aria-label="Корзина">
      <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
        <use xlinkHref="#icon-basket" />
      </svg>
      <span className="visually-hidden">Перейти в корзину</span>
      <span className="header__cart-count">{cartItemsCount}</span>
    </Link>
  );
}

export default ShoppingCart;
