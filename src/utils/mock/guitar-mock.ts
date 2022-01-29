import * as faker from 'faker';
import {guitarKinds, stringsCounts} from '../const/filter';
import {getRandomIntegerNumber} from './helpers';
import {Guitar, GuitarType} from '../../types/guitar';

const IMAGE_PATH = '/img/content/';
const GUITAR_NAME_PREFIX = 'guitar';
const PRICE_MIN = 1000;
const PRICE_MAX = 30000;
const RATING_MIN = 1;
const RATING_MAX = 5;
const ID_MIN = 0;
const ID_MAX = 1000000;

function crateGuitarName() {
  return `${GUITAR_NAME_PREFIX}-${getRandomIntegerNumber(1, 100000)}`;
}

function getGuitarImage() {
  return `${IMAGE_PATH}${crateGuitarName()}`;
}

function getGuitarType(): GuitarType {
  return guitarKinds[getRandomIntegerNumber(0, guitarKinds.length - 1)];
}

function createMockGuitar(): Guitar {
  return {
    id: getRandomIntegerNumber(ID_MIN, ID_MAX),
    name: crateGuitarName(),
    stringCount: Number(stringsCounts[getRandomIntegerNumber(0, stringsCounts.length - 1)]),
    previewImg: getGuitarImage(),
    price: getRandomIntegerNumber(PRICE_MIN, PRICE_MAX),
    rating: getRandomIntegerNumber(RATING_MIN, RATING_MAX),
    vendorCode: faker.lorem.word(),
    type: getGuitarType(),
    description: faker.lorem.sentence(getRandomIntegerNumber(10, 20)),
  };
}

export {
  createMockGuitar
};
