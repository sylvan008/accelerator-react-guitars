import * as faker from 'faker';
import {Review} from '../../types/review';
import {getRandomIntegerNumber} from './helpers';

const INPUT_LENGTH = 10;

function createMockReview(): Review {
  return {
    advantage: faker.lorem.words(INPUT_LENGTH),
    comment: faker.lorem.words(INPUT_LENGTH),
    createAt: new Date(),
    disadvantage: faker.lorem.words(INPUT_LENGTH),
    guitarId: getRandomIntegerNumber(1, 9999),
    id: getRandomIntegerNumber(10000, 1000000).toString(),
    rating: getRandomIntegerNumber(1, 5),
    userName: faker.name.lastName(),
  };
}

export {
  createMockReview
};
