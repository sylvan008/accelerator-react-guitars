import {TestId} from '../../utils/const/test-id';

const STAR_FULL_ICON = 'icon-full-star';
const STAR_ICON = 'icon-star';

export type IconSize = [width: number, height: number];

type PropsType = {
  iconSizes?: IconSize,
  isFullStar?: boolean,
}

function IconRating(props: PropsType): JSX.Element {
  const {
    isFullStar = false,
    iconSizes: [width = 12, height = 11] = [],
  } = props;

  return (
    <svg width={width} height={height} aria-hidden="true" data-testid={isFullStar ? TestId.RatingFull : TestId.RatingEmpty}>
      <use xlinkHref={`#${isFullStar ? STAR_FULL_ICON : STAR_ICON}`}/>
    </svg>
  );
}

export default IconRating;
