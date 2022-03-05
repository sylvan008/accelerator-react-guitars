import {Review} from '../../types/review';
import {useEffect, useRef, useState} from 'react';
import ReviewPost from '../review-post/review-post';
import ModalWindow from '../modal-window/modal-window';
import ReviewForm from '../review-form/review-form';
import ModalMessage from '../modal-message/modal-message';
import './style.css';

const REVIEW_LOAD_STEP = 3;

type PropsType = {
  comments: Review[],
  guitarId: number,
  guitarName: string,
  onCommentsUpdate: () => Promise<void>,
};

function createCloseHandler<T extends (flag: boolean) => void>(setPopupShowState: T, isOpen = false) {
  return () => setPopupShowState(isOpen);
}

function Reviews(props: PropsType): JSX.Element {
  const {comments, guitarId, guitarName, onCommentsUpdate} = props;
  const [viewCommentsCount, setViewCommentsCount] = useState(REVIEW_LOAD_STEP);
  const [isCommentFormShow, setIsCommentFormShow] = useState(false);
  const [isMessageShow, setIsMessageShow] = useState(false);
  const modalButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!modalButtonRef.current || !isMessageShow) {
      return;
    }
    modalButtonRef.current.focus();
  }, [modalButtonRef, isMessageShow]);


  const showNextComments = () => setViewCommentsCount(Math.min(comments.length, viewCommentsCount + REVIEW_LOAD_STEP));

  const showComments = comments.slice(0, viewCommentsCount);
  const isHasMore = viewCommentsCount < comments.length;

  const onCommentFormShow = createCloseHandler(setIsCommentFormShow, true);
  const onCommentFormClose = createCloseHandler(setIsCommentFormShow);
  const onMessageClose = createCloseHandler(setIsMessageShow);
  const onSubmitCallback = async () => {
    onCommentFormClose();
    setIsMessageShow(true);
    await onCommentsUpdate();
  };

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a
        className="button button--red-border button--big reviews__sumbit-button"
        href="#"
        onClick={onCommentFormShow}
      >
        Оставить отзыв
      </a>

      {showComments.map((comment) => <ReviewPost key={comment.id} comment={comment} />)}

      {isHasMore && (
        <button
          type="button"
          className="button button--medium reviews__more-button"
          onClick={showNextComments}
        >
          Показать еще отзывы
        </button>
      )}
      <a className="button button--up button--red-border button--big reviews__up-button" href="#header">Наверх</a>

      {isCommentFormShow && (
        <ModalWindow onClose={onCommentFormClose}>
          <ReviewForm guitarId={guitarId} guitarName={guitarName} onSubmitCallback={onSubmitCallback} />
        </ModalWindow>
      )}

      {isMessageShow && (
        <ModalWindow classNames="modal--success" onClose={onMessageClose}>
          <ModalMessage
            text="Спасибо за ваш отзыв!"
            render={() => (
              <div className="modal__button-container modal__button-container--review">
                <button
                  className="button button--small modal__button modal__button--review"
                  ref={modalButtonRef}
                  onClick={onMessageClose}
                >
                  К покупкам!
                </button>
              </div>
            )}
          />
        </ModalWindow>
      )}
    </section>
  );
}

export default Reviews;
