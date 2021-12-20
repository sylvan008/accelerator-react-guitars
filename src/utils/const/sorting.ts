import {SortItem} from '../../types/sort';

const SortingDirection = ({
  UP: 'UP',
  DOWN: 'DOWN',
} as const);

const SortingLabel = {
  [SortingDirection.UP]: 'По возрастанию',
  [SortingDirection.DOWN]: 'По убыванию',
};

const sortingItems: SortItem[] = [
  {
    type: 'price',
    label: 'по цене',
  },
  {
    type: 'rating',
    label: 'по популярности',
  },
];

export {
  SortingLabel,
  SortingDirection,
  sortingItems
};
