function ShoppingCart(): JSX.Element {
  return (
    <a className="header__cart-link" href="#" aria-label="Корзина">
      <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
        <use xlinkHref="#icon-basket" />
      </svg>
      <span className="visually-hidden">Перейти в корзину</span>
      <span className="header__cart-count">2</span>
    </a>
  );
}

export default ShoppingCart;
