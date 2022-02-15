import Rating from '../rating/rating';

type PropsType = {
  rating: number,
};

function CardRating(props: PropsType): JSX.Element {
  const {rating} = props;

  return (
    <Rating rating={rating} className="product-card__rate" />
  );
}

export default CardRating;
