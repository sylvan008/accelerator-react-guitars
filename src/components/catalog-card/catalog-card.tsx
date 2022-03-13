import {MouseEvent} from 'react';
import {Link} from 'react-router-dom';
import {Guitar} from '../../types/guitar';
import {replaceImagePath, replaceRouteParam} from '../../utils/utils';
import {AppRoute, RouteParam} from '../../utils/const/app-route';
import {formatPrice} from '../../utils/format';
import CardRating from '../card-rating/card-rating';

type PropsType = {
  guitar: Guitar,
  isInCart: boolean,
  onBuyClick: (guitarId: number) => void,
}

function CatalogCard(props: PropsType): JSX.Element {
  const {guitar, isInCart, onBuyClick} = props;

  const buyClickHandler = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onBuyClick(guitar.id);
  };

  const addToCartButton = (
    <a
      className="button button--red button--mini button--add-to-cart"
      href="#"
      onClick={buyClickHandler}
    >
      Купить
    </a>
  );

  const cartLink = (
    <Link to={AppRoute.Cart} className="button button--red-border button--mini button--in-cart">
      В корзине
    </Link>
  );

  const actionElement = isInCart ? cartLink : addToCartButton;

  const {
    id,
    name,
    previewImg,
    price,
    rating,
  } = guitar;
  return (
    <div className="product-card">
      <img src={replaceImagePath(previewImg)} width="75" height="190" alt={name}/>
      <div className="product-card__info">
        <CardRating rating={rating} />
        <p className="product-card__title">{name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {formatPrice(price)}
        </p>
      </div>
      <div className="product-card__buttons">
        <Link
          to={replaceRouteParam(AppRoute.ProductPage, RouteParam.Id, id.toString())}
          className="button button--mini"
        >
          Подробнее
        </Link>
        {actionElement}
      </div>
    </div>
  );
}

export default CatalogCard;
