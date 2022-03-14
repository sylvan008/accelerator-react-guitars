import {Guitar} from '../../types/guitar';
import ModalWindow from '../modal-window/modal-window';
import ModalInfo from '../modal-info/modal-info';

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
        <ModalInfo
          name={name}
          previewImg={previewImg}
          price={price}
          stringCount={stringCount}
          type={type}
          vendorCode={vendorCode}
        />
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
