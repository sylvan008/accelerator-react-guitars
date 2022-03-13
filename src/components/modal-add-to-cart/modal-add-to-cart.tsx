import {Guitar} from '../../types/guitar';
import {formatPrice} from '../../utils/format';
import {replaceImagePath} from '../../utils/utils';
import {GuitarDictionary} from '../../utils/const/locale';
import ModalWindow from '../modal-window/modal-window';

type PropsType = {
  guitar: Guitar,
  onClose: () => void,
  onCartItemAdd: () => void,
};

function ModalAddToCart(props: PropsType): JSX.Element {
  const {guitar, onCartItemAdd, onClose} = props;
  const {name, previewImg, price, stringCount, type, vendorCode} = guitar;
  return (
    <ModalWindow onClose={onClose}>
      <>
        <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
        <div className="modal__info">
          <img
            className="modal__img"
            src={replaceImagePath(previewImg)}
            width="67"
            height="137"
            alt={name}
          />
          <div className="modal__info-wrapper">
            <h3 className="modal__product-name title title--little title--uppercase">Гитара {name}</h3>
            <p className="modal__product-params modal__product-params--margin-11">Артикул: {vendorCode}</p>
            <p className="modal__product-params">{GuitarDictionary[type]}, {stringCount} струнная</p>
            <p className="modal__price-wrapper">
              <span className="modal__price">Цена:</span>
              <span className="modal__price">{formatPrice(price)}</span>
            </p>
          </div>
        </div>
        <div className="modal__button-container">
          <button
            type="button"
            className="button button--red button--big modal__button modal__button--add"
            onClick={onCartItemAdd}
          >
            Добавить в корзину
          </button>
        </div>
      </>
    </ModalWindow>
  );
}

export default ModalAddToCart;
