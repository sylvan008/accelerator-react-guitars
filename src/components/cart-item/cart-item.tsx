import {Guitar} from '../../types/guitar';
import {replaceImagePath} from '../../utils/utils';
import {GuitarDictionary} from '../../utils/const/locale';
import {formatPrice} from '../../utils/format';
import {ChangeEvent} from 'react';

const ITEMS_MIN = 1;
const ITEMS_MAX = 99;

type PropsType = {
  count: number,
  guitar: Guitar,
  onItemRemove: (guitarId: number) => void,
  onItemsCountChange: (guitarId: number, count: number) => void,
  onIncreaseQuantity: (guitarId: number) => void,
  onDecriesQuantity: (guitarId: number) => void,
};

function CartItem(props: PropsType): JSX.Element {
  const {
    count,
    guitar,
    onItemRemove,
    onItemsCountChange,
    onDecriesQuantity,
    onIncreaseQuantity,
  } = props;

  const {id, name, previewImg, price, stringCount, type, vendorCode} = guitar;

  const guitarFullName = `${GuitarDictionary[type]} ${name}`;

  const decriesQuantityHandler = () => onDecriesQuantity(id);
  const increaseQuantityHandler = () => {
    if (count >= ITEMS_MAX) {
      return;
    }
    onIncreaseQuantity(id);
  };
  const itemRemoveHandler = () => onItemRemove(id);

  const changeItemCountHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let newCount = parseInt(event.target.value, 10) || ITEMS_MIN;
    if (newCount > ITEMS_MAX) {
      newCount = ITEMS_MAX;
    }
    onItemsCountChange(id, newCount);
  };

  return (
    <div className="cart-item">
      <button
        className="cart-item__close-button button-cross"
        type="button"
        aria-label="Удалить"
        onClick={itemRemoveHandler}
      >
        <span className="button-cross__icon" />
        <span className="cart-item__close-button-interactive-area" />
      </button>
      <div className="cart-item__image">
        <img
          src={replaceImagePath(previewImg)}
          width="55"
          height="130"
          alt={guitarFullName}
        />
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{guitarFullName}</p>
        <p className="product-info__info">Артикул: {vendorCode}</p>
        <p className="product-info__info">{GuitarDictionary[type]}, {stringCount} струнная</p>
      </div>
      <div className="cart-item__price">{formatPrice(price)}</div>
      <div className="quantity cart-item__quantity">
        <button
          className="quantity__button"
          aria-label="Уменьшить количество"
          onClick={decriesQuantityHandler}
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus" />
          </svg>
        </button>
        <input
          value={count}
          className="quantity__input"
          type="number"
          placeholder="1"
          id="2-count"
          name="2-count"
          max={ITEMS_MAX}
          onChange={changeItemCountHandler}
        />
        <button
          className="quantity__button"
          aria-label="Увеличить количество"
          onClick={increaseQuantityHandler}
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus" />
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{formatPrice(price * count)}</div>
    </div>
  );
}

export default CartItem;
