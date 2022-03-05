import Portal from '../portal/portal';
import {useEffect} from 'react';
import {isEscapeKey} from '../../utils/utils';
import FocusTrap from 'focus-trap-react';
import './styles.css';

type PropsType = {
  classNames?: string,
  children: JSX.Element,
  onClose: () => void,
};

function ModalWindow(props: PropsType): JSX.Element {
  const {children, classNames, onClose} = props;

  useEffect(() => {
    const closeModalHandler = (event: KeyboardEvent) => {
      if (isEscapeKey(event)) {
        onClose();
      }
    };

    document.body.classList.add('modal--opened');
    document.addEventListener('keydown', closeModalHandler);

    return () => {
      document.body.classList.remove('modal--opened');
      document.removeEventListener('keydown', closeModalHandler);
    };
  }, [onClose]);

  const classes = ['modal', 'is-active', classNames ? classNames : ''].join(' ').trim();

  return (
    <Portal>
      <FocusTrap>
        <div className={classes}>
          <div className="modal__wrapper">
            <div className="modal__overlay" data-close-modal="" onClick={onClose} />
            <div className="modal__content" aria-label="Всплывающее окно">

              {children}

              <button
                className="modal__close-btn button-cross"
                type="button"
                aria-label="Закрыть"
                onClick={onClose}
              >
                <span className="button-cross__icon" />
                <span className="modal__close-btn-interactive-area" />
              </button>
            </div>
          </div>
        </div>
      </FocusTrap>
    </Portal>
  );
}

export default ModalWindow;
