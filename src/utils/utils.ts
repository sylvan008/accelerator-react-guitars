import {Guitar} from '../types/guitar';
import {Direction, SortType} from '../types/sort';
import {SortingDirection} from './const/sorting';

const IMAGE = 'img';
const CLIENT_IMAGE = 'img/content';

/**
 * Проверяет что текущее вводимое значение не меньше минимальной стоимости товара
 * и не более текущей выбранной максимальной стоимости.
 */
function checkMinPrice(priceValue: number, priceMinBound: number, priceMaxValue: number) {
  return Math.min(
    Math.max(priceMinBound, priceValue),
    priceMaxValue,
  );
}

/**
 * Проверяет что текущее вводимое значение не более максимальной стоимости товара
 * и не меньше текущей выбранной минимальной стоимости.
 */
function checkMaxPrice(priceValue: number, priceMaxBound: number, priceMinValue: number) {
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
function sortGuitars(guitarList: Guitar[], type: SortType, direction: Direction) {
  if (!type) {
    return guitarList;
  }

  const list = guitarList.slice();

  const sort = (guitarA: Guitar, guitarB: Guitar) => {
    if (direction === SortingDirection.DOWN) {
      [guitarB, guitarA] = [guitarA, guitarB];
    }
    return guitarA[type] - guitarB[type];
  };

  return list.sort(sort);
}

export {
  checkMaxPrice,
  checkMinPrice,
  createRangeList,
  findGuitars,
  replaceImagePath,
  sortGuitars
};
