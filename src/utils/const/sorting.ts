import {SortItem} from '../../types/sort';

const SortingDirection = ({
  UP: 'UP',
  DOWN: 'DOWN',
} as const);

const SortingType = ({
  Price: 'price',
  Rating: 'rating',
} as const);

const SortingLabel = {
  [SortingDirection.UP]: 'По возрастанию',
  [SortingDirection.DOWN]: 'По убыванию',
};

const sortingItems: SortItem[] = [
  {
    type: SortingType.Price,
    label: 'по цене',
  },
  {
    type: SortingType.Rating,
    label: 'по популярности',
  },
];

export {
  SortingLabel,
  SortingDirection,
  sortingItems,
  SortingType
};
