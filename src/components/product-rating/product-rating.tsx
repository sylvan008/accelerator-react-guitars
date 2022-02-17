import Rating from '../rating/rating';

type PropsType = {
  rating: number,
};

function ProductRating(props: PropsType): JSX.Element {
  const {rating} = props;
  return (
    <Rating rating={rating} className="product-container__rating" iconSizes={[14, 14]} />
  );
}

export default ProductRating;
