import ModalInfo from '../modal-info/modal-info';
import ModalWindow from '../modal-window/modal-window';
import {Guitar} from '../../types/guitar';

type PropsType = {
  guitar: Guitar,
  onConfirmRemove: (guitarId: number) => void,
  onClose: () => void,
};

function ModalCartItemRemove(props: PropsType): JSX.Element {
  const {guitar, onClose, onConfirmRemove} = props;
  const {id, name, previewImg, price, stringCount, type, vendorCode} = guitar;

  const removeItemHandler = () => onConfirmRemove(id);

  return (
    <ModalWindow onClose={onClose}>
      <>
        <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
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
            className="button button--small modal__button"
            onClick={removeItemHandler}
          >
            Удалить товар
          </button>
          <button
            className="button button--black-border button--small modal__button modal__button--right"
            onClick={onClose}
          >
            Продолжить покупки
          </button>
        </div>
      </>
    </ModalWindow>
  );
}

export default ModalCartItemRemove;
