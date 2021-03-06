import {Direction} from '../../types/sort';
import {SortingLabel, SortDirection} from '../../utils/const/sorting';
import {TabIndex} from '../../utils/const/tab-index';
import './styles.css';

const DIRECTION_ACTIVE_CLASS = 'catalog-sort__order-button--active';

const DirectionClass = {
  [SortDirection.ASC]: 'catalog-sort__order-button--up',
  [SortDirection.DESC]: 'catalog-sort__order-button--down',
} as const;

type PropsType = {
  direction: Exclude<Direction, null>,
  isActive?: boolean,
  onCLick: (direction: Direction) => void,
};

function SortDirectionButton(props: PropsType): JSX.Element {
  const {
    direction,
    isActive = false,
    onCLick,
  } = props;

  const classNames = [
    'catalog-sort__order-button',
    DirectionClass[direction],
    isActive ? DIRECTION_ACTIVE_CLASS : '',
  ].join(' ');

  const label = SortingLabel[direction];
  const tabIndex = isActive ? TabIndex.Disabled : TabIndex.Active;

  const buttonClickHandler = () => onCLick(direction);

  return (
    <button
      className={classNames}
      aria-label={label}
      onClick={buttonClickHandler}
      tabIndex={tabIndex}
    />
  );
}

export default SortDirectionButton;
