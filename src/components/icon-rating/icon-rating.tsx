import {TestId} from '../../utils/const/test-id';

const STAR_FULL_ICON = 'icon-full-star';
const STAR_ICON = 'icon-star';

type PropsType = {
  isFullStar?: boolean,
}

function IconRating(props: PropsType): JSX.Element {
  const {isFullStar = false} = props;

  return (
    <svg width="12" height="11" aria-hidden="true" data-testid={isFullStar ? TestId.RatingFull : TestId.RatingEmpty}>
      <use xlinkHref={`#${isFullStar ? STAR_FULL_ICON : STAR_ICON}`}/>
    </svg>
  );
}

export default IconRating;
