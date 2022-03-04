import IconRating from '../icon-rating/icon-rating';
import {createRangeList} from '../../utils/utils';
import {IconSize} from '../../types/icon';

type PropsType = {
  rating: number,
  className?: string,
  iconSizes?: IconSize;
};

const RATING_STARTS_WITH = 1;
const RATING_STARS_COUNT = 5;

function Rating(props: PropsType): JSX.Element {
  const {rating, className, iconSizes} = props;
  const ratingList = createRangeList(RATING_STARTS_WITH, RATING_STARS_COUNT);
  const fullStarsCount= Math.trunc(rating);

  const fullStarsList = ratingList.slice(0, fullStarsCount)
    .map((ratingValue) => <IconRating key={ratingValue} iconSizes={iconSizes} isFullStar />);

  const starsList = ratingList.slice(fullStarsCount)
    .map((ratingValue) => <IconRating key={ratingValue} iconSizes={iconSizes} />);

  const classes = ['rate', className ? className : '']
    .join(' ')
    .trim();

  return (
    <div className={classes} aria-hidden="true">
      <span className="visually-hidden">Рейтинг:</span>
      {fullStarsList}
      {starsList}
      <span className="rate__count">{rating}</span>
      <span className="rate__message" />
    </div>
  );
}

export default Rating;
