import {useState} from 'react';
import {Direction, SortType} from '../types/sort';
import {SortDirection, sortingItems} from '../utils/const/sorting';

type ReturnType = [
  sortType: SortType,
  sortDirection: Direction,
  onSortTypeChange: (type: SortType) => void,
  onSortDirectionChange: (direction: Direction) => void,
];

const FIRST_ITEM = 0;

function useSort(): ReturnType {
  const [sortType, setSortType] = useState<SortType>(null);
  const [sortDirection, setSortDirection] = useState<Direction>(null);

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
