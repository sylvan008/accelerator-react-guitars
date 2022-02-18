import {Review} from '../../types/review';
import {useState} from 'react';
import ReviewPost from '../review/reviewPost';

const REVIEW_LOAD_STEP = 3;

type PropsType = {
  comments: Review[],
};

function Reviews(props: PropsType): JSX.Element {
  const {comments} = props;
  const [viewCommentsCount, setViewCommentsCount] = useState(REVIEW_LOAD_STEP);

  const showNextComments = () => setViewCommentsCount(Math.min(comments.length, viewCommentsCount + REVIEW_LOAD_STEP));

  const showComments = comments.slice(0, viewCommentsCount);
  const isHasMore = viewCommentsCount < comments.length;

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a className="button button--red-border button--big reviews__sumbit-button" href="#">Оставить отзыв</a>

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
    </section>
  );
}

export default Reviews;
