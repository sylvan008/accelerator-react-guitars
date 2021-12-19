const IMAGE = 'img';
const CLIENT_IMAGE = 'img/content';

/**
 * Создаёт заполненный массив [from, to]
 */
function createRangeList(from: number, to: number) {
  return Array.from({length: to}, (_, index) => index + from);
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

export {
  createRangeList,
  replaceImagePath
};
