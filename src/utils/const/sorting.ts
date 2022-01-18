import {SortItem} from '../../types/sort';

const SortDirection = ({
  ASC: 'ASC',
  DESC: 'DESC',
} as const);

const SortingType = ({
  Price: 'price',
  Rating: 'rating',
} as const);

const sortingTypes = Object.values(SortingType);

const SortingLabel = {
  [SortDirection.ASC]: 'По возрастанию',
  [SortDirection.DESC]: 'По убыванию',
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
  SortDirection,
  sortingItems,
  SortingType,
  sortingTypes
};
