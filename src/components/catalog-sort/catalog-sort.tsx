import {SortDirection} from '../../utils/const/sorting';
import SortButton from '../sort-button/sort-button';
import {Direction, SortItem, SortType} from '../../types/sort';
import SortDirectionButton from '../sort-direction-button/sort-direction-button';

type PropsType = {
  activeType: SortType,
  activeDirection: Direction,
  onSortTypeChange: (type: SortType) => void,
  onSortDirectionChange: (direction: Direction) => void,
  sortingItems: SortItem[],
};

function CatalogSort(props: PropsType): JSX.Element {
  const {
    activeDirection,
    activeType,
    onSortDirectionChange,
    onSortTypeChange,
    sortingItems,
  } = props;

  const sortDirectionChangeHandler = (direction: Direction) => onSortDirectionChange(direction);

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">

        {sortingItems.map((sortType) => (
          <SortButton
            isActive={sortType.type === activeType}
            key={sortType.type}
            onClick={onSortTypeChange}
            sortItem={sortType}
          />
        ))}
      </div>
      <div className="catalog-sort__order">
        <SortDirectionButton
          direction={SortDirection.ASC}
          isActive={SortDirection.ASC === activeDirection}
          onCLick={sortDirectionChangeHandler}
        />
        <SortDirectionButton
          direction={SortDirection.DESC}
          isActive={SortDirection.DESC === activeDirection}
          onCLick={sortDirectionChangeHandler}
        />
      </div>
    </div>
  );
}

export default CatalogSort;
