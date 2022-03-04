import Rating from '../rating/rating';

type PropsType = {
  rating: number,
};

function ReviewRating(props: PropsType): JSX.Element {
  const {rating} = props;
  return (
    <Rating rating={rating} className="review__rating-panel" iconSizes={[16, 16]} />
  );
}

export default ReviewRating;
