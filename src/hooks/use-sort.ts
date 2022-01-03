import {Direction, SortType} from '../types/sort';
import {SortDirection, sortingItems} from '../utils/const/sorting';
import {useDispatch, useSelector} from 'react-redux';
import {getOrder, getSort} from '../store/sort-process/selectors';
import {setOrder, setSortType} from '../store/action';

type ReturnType = [
  sortType: SortType,
  sortDirection: Direction,
  onSortTypeChange: (type: SortType) => void,
  onSortDirectionChange: (direction: Direction) => void,
];

const FIRST_ITEM = 0;

function useSort(): ReturnType {
  const dispatch = useDispatch();
  const sortType = useSelector(getSort);
  const sortDirection = useSelector(getOrder);

  const onSortTypeChange = (type: SortType) => {
    dispatch(setSortType(type));
    if (!sortDirection) {
      dispatch(setOrder(SortDirection.ASC));
    }
  };

  const onSortDirectionChange = (direction: Direction) => {
    dispatch(setOrder(direction));
    if (!sortType) {
      dispatch(setSortType(sortingItems[FIRST_ITEM].type));
    }
  };

  return [
    sortType,
    sortDirection,
    onSortTypeChange,
    onSortDirectionChange,
  ];
}

export {
  useSort
};
