import IconRating from '../icon-rating/icon-rating';
import {createRangeList} from '../../utils/utils';

type PropsType = {
  rating: number,
};

const STAR_FULL_ICON = 'icon-full-star';
const STAR_ICON = 'icon-star';
const RATING_STARTS_WITH = 1;
const RATING_STARS_COUNT = 5;

function CardRating(props: PropsType): JSX.Element {
  const {rating} = props;
  const ratingList = createRangeList(RATING_STARTS_WITH, RATING_STARS_COUNT);
  const fullStarsCount= Math.trunc(rating);

  const fullStarsList = ratingList.slice(0, fullStarsCount)
    .map((ratingValue) => <IconRating key={ratingValue} iconName={STAR_FULL_ICON} />);

  const starsList = ratingList.slice(fullStarsCount)
    .map((ratingValue) => <IconRating key={ratingValue} iconName={STAR_ICON} />);

  return (
    <div className="rate product-card__rate" aria-hidden="true">
      <span className="visually-hidden">Рейтинг:</span>
      {fullStarsList}
      {starsList}
      <span className="rate__count">{rating}</span>
      <span className="rate__message" />
    </div>
  );
}

export default CardRating;
