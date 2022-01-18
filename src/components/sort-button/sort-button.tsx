import {SortItem, SortType} from '../../types/sort';
import {TabIndex} from '../../utils/const/tab-index';

const ACTIVE_CLASS = 'catalog-sort__type-button--active';

type PropsType = {
  sortItem: SortItem,
  isActive?: boolean
  onClick: (type: SortType) => void,
};

function SortButton(props: PropsType): JSX.Element {
  const {
    sortItem: {label, type},
    isActive = false,
    onClick,
  } = props;

  const classNames = [
    'catalog-sort__type-button',
    isActive ? ACTIVE_CLASS : '',
  ].join(' ');

  const tabIndex = isActive ? TabIndex.Disabled : TabIndex.Active;

  const clickButtonHandler = () => onClick(type);

  return (
    <button
      className={classNames}
      aria-label={label}
      tabIndex={tabIndex}
      onClick={clickButtonHandler}
    >
      {label}
    </button>
  );
}

export default SortButton;
