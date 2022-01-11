import {Guitar} from '../types/guitar';
import {Direction, SortType} from '../types/sort';
import {SortDirection, SortingType} from './const/sorting';
import {PriceBounds} from '../types/store';
import {KeyboardEvent} from 'react';

const IMAGE = 'img';
const CLIENT_IMAGE = 'img/content';

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

function isPriceInBounds(bounds: [min: number, max: number], price: number) {
  const [boundMin, boundMax] = bounds;
  return boundMin <= price && price <= boundMax;
}

/**
 * Проверяет что нажатая кнопка является Enter
 */
function isEnterKey(event: KeyboardEvent) {
  return event.key === 'Enter';
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

export {
  checkMinMaxPriceValue,
  checkMaxPrice,
  checkMinPrice,
  createRangeList,
  isEnterKey,
  isPriceInBounds,
  findGuitars,
  getMinMaxPriceValue,
  replaceImagePath,
  sortGuitars
};
