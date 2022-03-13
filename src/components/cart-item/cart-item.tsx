import {Guitar} from '../../types/guitar';
import {replaceImagePath} from '../../utils/utils';
import {GuitarDictionary} from '../../utils/const/locale';
import {formatPrice} from '../../utils/format';
import {useDispatch} from 'react-redux';
import {addCartItem, addCartItems, removeCartItem} from '../../store/action';
import {ChangeEvent} from 'react';

type PropsType = {
  count: number,
  guitar: Guitar,
  onItemRemove: (itemId: number) => void,
};

function CartItem(props: PropsType): JSX.Element {
  const {count, guitar, onItemRemove} = props;
  const dispatch = useDispatch();

  const {id, name, previewImg, price, stringCount, type, vendorCode} = guitar;

  const guitarFullName = `${GuitarDictionary[type]} ${name}`;

  const onDecriesQuantity = () => dispatch(removeCartItem(id));
  const onIncreaseQuantity = () => dispatch(addCartItem(id));
  const onItemsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newCount = parseInt(event.target.value, 10);
    const items = new Array(newCount).fill(id);
    dispatch(addCartItems(items));
  };
  const itemRemoveHandler = () => {
    onItemRemove(id);
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
          onClick={onDecriesQuantity}
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
          max="99"
          onChange={onItemsChange}
        />
        <button
          className="quantity__button"
          aria-label="Увеличить количество"
          onClick={onIncreaseQuantity}
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
