import {Review} from '../../types/review';
import ReviewRating from '../review-rating/review-tating';
import {formatDateMonth} from '../../utils/format';

type PropsType = {
  comment: Review
};

function ReviewPost(props: PropsType): JSX.Element {
  const {
    comment: {
      advantage,
      comment,
      createAt,
      disadvantage,
      rating,
      userName,
    },
  } = props;

  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">
          {userName}
        </h4>
        <time className="review__date">{formatDateMonth(createAt)}</time>
      </div>
      <ReviewRating rating={rating} />
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">{advantage}</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{disadvantage}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">
        {comment}
      </p>
    </div>
  );
}

export default ReviewPost;
