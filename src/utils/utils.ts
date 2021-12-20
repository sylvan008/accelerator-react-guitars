import {Guitar} from '../types/guitar';
import {Direction, SortType} from '../types/sort';
import {SortingDirection} from './const/sorting';

const IMAGE = 'img';
const CLIENT_IMAGE = 'img/content';

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
  createRangeList,
  findGuitars,
  replaceImagePath,
  sortGuitars
};
