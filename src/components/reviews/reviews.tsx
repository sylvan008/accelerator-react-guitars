import {Review} from '../../types/review';
import {useState} from 'react';
import ReviewPost from '../review/reviewPost';
import ModalWindow from '../modal-window/modal-window';
import ReviewForm from '../review-form/review-form';

const REVIEW_LOAD_STEP = 3;

type PropsType = {
  comments: Review[],
  guitarId: number,
  guitarName: string,
};

function Reviews(props: PropsType): JSX.Element {
  const {comments, guitarId, guitarName} = props;
  const [viewCommentsCount, setViewCommentsCount] = useState(REVIEW_LOAD_STEP);
  const [isCommentFormShow, setIsCommentFormShow] = useState(false);


  const showNextComments = () => setViewCommentsCount(Math.min(comments.length, viewCommentsCount + REVIEW_LOAD_STEP));

  const showComments = comments.slice(0, viewCommentsCount);
  const isHasMore = viewCommentsCount < comments.length;

  const onCommentFormShow = () => setIsCommentFormShow(true);
  const onCommentFormClose = () => setIsCommentFormShow(false);

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
          <ReviewForm guitarId={guitarId} guitarName={guitarName} />
        </ModalWindow>
      )}
    </section>
  );
}

export default Reviews;
