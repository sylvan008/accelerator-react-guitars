import {AppRoute} from '../../utils/const/app-route';
import {browserHistory} from '../../services/browser-history';
import ModalMessage from '../modal-message/modal-message';
import ModalWindow from '../modal-window/modal-window';

type PropsType = {
  onClose: () => void;
  onContinueClick: () => void,
};

function ModalAddCartSuccess(props: PropsType): JSX.Element {
  const {onClose, onContinueClick} = props;

  const onToCartClick = () => {
    browserHistory.push(AppRoute.Cart);
  };

  const render = () => (
    <div className="modal__button-container modal__button-container--add">
      <button
        type="button"
        className="button button--small modal__button"
        onClick={onToCartClick}
      >
        Перейти в корзину
      </button>
      <button
        type="button"
        className="button button--black-border button--small modal__button modal__button--right"
        onClick={onContinueClick}
      >
        Продолжить покупки
      </button>
    </div>
  );

  return (
    <ModalWindow onClose={onClose} classNames="modal--success">
      <ModalMessage text="Товар успешно добавлен в корзину" render={render} />
    </ModalWindow>
  );
}

export default ModalAddCartSuccess;
