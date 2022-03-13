import React from 'react';
import {Guitar, GuitarStringCount, GuitarType} from '../types/guitar';
import {Direction, SortType} from '../types/sort';
import {SortDirection, SortingType, sortingTypes} from './const/sorting';
import {CartItem, PriceBounds} from '../types/store';
import {guitarKinds, stringsCounts} from './const/filter';
import {GuitarStringCountType} from '../types/filter';
import {ELEMENTS_PER_PAGE, PAGE_DEFAULT_NUMBER, PAGE_NUMBER_SEPARATOR} from './const/pagination';
import {Review, ReviewServer} from '../types/review';

const IMAGE = 'img';
const CLIENT_IMAGE = '/img/content';

function convertSearchStringToArray(searchString: string | null): string[] {
  if (searchString === null || searchString.length === 0) {
    return [];
  }
  return searchString.split(' ');
}

function checkGuitarTypes(guitarTypes: GuitarType[]): GuitarType[] {
  return guitarTypes.filter((guitarType) => guitarKinds.includes(guitarType));
}

function checkGuitarStrings(guitarStrings: GuitarStringCountType[]): GuitarStringCount[] {
  return guitarStrings.filter((guitarString) => stringsCounts.includes(guitarString));
}

function checkSortDirection(directionType: Direction | null) {
  if (!directionType) {
    return null;
  }
  const direction = directionType.toUpperCase();
  return direction === SortDirection.ASC || direction === SortDirection.DESC ? direction : null;
}

function checkSort(sortType: SortType | null) {
  if (!sortType) {
    return null;
  }
  const sort = sortType.toLowerCase() as SortType;
  return sortingTypes.includes(sort) ? sort : null;
}

/**
 * Проверяет соответствие минимальной и максимальной цены интервалу [min, max].
 * Если введённая минимальная цена выше максимальной, меняет их местами.
 */
function checkMinMaxPriceValue(bounds: PriceBounds, priceMin: number, priceMax: number) {
  const [boundMin, boundMax] = bounds;
  let min = isPriceInBounds(bounds, priceMin) ? priceMin : boundMin;
  let max = isPriceInBounds(bounds, priceMax) ? priceMax : boundMax;

  if (min > max) {
    [min, max] = [max, min];
  }

  return [min, max];
}

/**
 * Проверяет что текущее вводимое значение не меньше минимальной стоимости товара
 * и не более текущей выбранной максимальной стоимости.
 */
function checkMinPrice(bounds: PriceBounds, priceValue: number, priceMaxValue: number) {
  const [priceMinBound] = bounds;
  if (priceValue === 0) {
    return priceMinBound;
  }
  return Math.min(
    Math.max(priceMinBound, priceValue),
    priceMaxValue,
  );
}

/**
 * Проверяет что текущее вводимое значение не более максимальной стоимости товара
 * и не меньше текущей выбранной минимальной стоимости.
 */
function checkMaxPrice(bounds: PriceBounds, priceValue: number, priceMinValue: number) {
  const [, priceMaxBound] = bounds;
  if (priceValue === 0) {
    return priceMaxBound;
  }
  return Math.max(
    Math.min(priceMaxBound, priceValue),
    priceMinValue,
  );
}

/**
 * Создаёт заполненный массив [from, to]
 */
function createRangeList(from: number, to: number) {
  return Array.from({length: to}, (_, index) => index + from);
}

/**
 * Возвращает список гитар удовлетворяющих поиску
 */
function findGuitars(guitarList: Guitar[], search: string) {
  if (search === '' || guitarList.length === 0) {
    return [];
  }

  return guitarList.filter((guitar) => {
    const name = guitar.name.toLowerCase();
    const searchLower = search.toLowerCase();
    return name.includes(searchLower);
  });
}

/**
 * Возвращает минимальную и максимальную цены гитар
 */
function getMinMaxPriceValue(guitars: Guitar[]): PriceBounds {
  const sortedGuitarsByPriceAscending = sortGuitars(guitars, SortingType.Price, SortDirection.ASC);
  const minValue = sortedGuitarsByPriceAscending[0]
    .price;
  const maxValue = sortedGuitarsByPriceAscending[sortedGuitarsByPriceAscending.length - 1]
    .price;
  return [minValue, maxValue];
}

function getTotalPages(elementsCount: number, elementsPerPage = ELEMENTS_PER_PAGE) {
  return Math.ceil(elementsCount / elementsPerPage);
}

function isPriceInBounds(bounds: [min: number, max: number], price: number) {
  const [boundMin, boundMax] = bounds;
  return boundMin <= price && price <= boundMax;
}

/**
 * Проверяет что нажатая кнопка является Enter
 */
function isEnterKey(event: React.KeyboardEvent) {
  return event.key === 'Enter';
}

/**
 * Проверяет что нажатая кнопка является Escape
 */
function isEscapeKey(event: KeyboardEvent) {
  return event.key === 'Esc' || event.key === 'Escape';
}

function parsePageNumberParam(pageNumberParam: string) {
  const lastIncludePosition = pageNumberParam.lastIndexOf(PAGE_NUMBER_SEPARATOR) + 1;
  const pageNumber = Number(pageNumberParam.slice(lastIncludePosition));
  return pageNumber ? pageNumber : PAGE_DEFAULT_NUMBER;
}

/**
 * Заменяет путь к изображениям в данных полученных от сервера
 * Дефолтные значения:
 * replace = img
 * clientPath = img/content
 */
function replaceImagePath(receivedPath:string, replace = IMAGE, clientPath = CLIENT_IMAGE) {
  return receivedPath.replace(replace, clientPath);
}

function replaceRouteParam(route: string, replace: string, value: string) {
  return route.replace(replace, value);
}

function sliceElementsForPage(elements: Guitar[], pageNumber: number) {
  const paginationStartIndex = (pageNumber - 1) * ELEMENTS_PER_PAGE;
  const paginationLastIndex = pageNumber * ELEMENTS_PER_PAGE;
  return elements.slice(paginationStartIndex, Math.min(paginationLastIndex, elements.length));
}

/**
 * Сортирует список гитар по переданной характеристике, по убыванию или возрастанию
 */
function sortGuitars(guitarList: Guitar[], type: SortType | null, direction: Direction | null) {
  if (!type) {
    return guitarList;
  }

  const list = guitarList.slice();

  const sort = (guitarA: Guitar, guitarB: Guitar) => {
    if (direction === SortDirection.DESC) {
      [guitarB, guitarA] = [guitarA, guitarB];
    }
    return guitarA[type] - guitarB[type];
  };

  return list.sort(sort);
}


/**
 * Возвращает настройку сортировки по умолчанию, если одна из них задана, а вторая нет.
 */
function updateSortDependency(sortType: SortType | null, directionType: Direction | null): [sort: SortType | null, direction: Direction | null] {
  let sort = sortType;
  let direction = directionType;

  if (sort && !direction) {
    direction = SortDirection.ASC;
  }
  if (!sort && direction) {
    sort = SortingType.Price;
  }
  return [sort, direction];
}

/**
 * Адаптирует данные комментария для удобной работы на клиенте
 */
function adaptCommentToClient(comment: ReviewServer): Review {
  return {
    ...comment,
    createAt: new Date(comment.createAt),
  };
}

/**
 * Функция сравнения комментариев по убывающей дате.
 */
function sortingCommentsByDate(commentA: Review, commentB: Review) {
  return commentB.createAt.getTime() - commentA.createAt.getTime();
}

function removeCartItemById(items: CartItem[], guitarId: number): CartItem[] {
  return items.filter((item) => item !== guitarId);
}

export {
  adaptCommentToClient,
  checkSort,
  convertSearchStringToArray,
  checkMinMaxPriceValue,
  checkGuitarTypes,
  checkGuitarStrings,
  checkSortDirection,
  checkMaxPrice,
  checkMinPrice,
  createRangeList,
  getTotalPages,
  isEnterKey,
  isEscapeKey,
  isPriceInBounds,
  findGuitars,
  getMinMaxPriceValue,
  removeCartItemById,
  replaceImagePath,
  replaceRouteParam,
  parsePageNumberParam,
  sliceElementsForPage,
  sortGuitars,
  sortingCommentsByDate,
  updateSortDependency
};
