import {Review} from '../../types/review';
import ReviewRating from '../review-rating/review-rating';
import {formatDateMonth} from '../../utils/format';
import {TestId} from '../../utils/const/test-id';

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
    <div className="review" data-testid={TestId.ReviewPost}>
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
