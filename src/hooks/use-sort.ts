import {Direction, SortType} from '../types/sort';
import {SortDirection, sortingItems} from '../utils/const/sorting';
import {useState} from 'react';

type ReturnType = [
  sortType: SortType | null,
  sortDirection: Direction | null,
  onSortTypeChange: (type: SortType) => void,
  onSortDirectionChange: (direction: Direction) => void,
];

const FIRST_ITEM = 0;

function useSort(sortSearch: SortType | null, orderSearch: Direction | null): ReturnType {
  const [sortType, setSortType] = useState(sortSearch);
  const [sortDirection, setSortDirection] = useState(orderSearch);

  const onSortTypeChange = (type: SortType) => {
    setSortType(type);
    if (!sortDirection) {
      setSortDirection(SortDirection.ASC);
    }
  };

  const onSortDirectionChange = (direction: Direction) => {
    setSortDirection(direction);
    if (!sortType) {
      setSortType(sortingItems[FIRST_ITEM].type);
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
