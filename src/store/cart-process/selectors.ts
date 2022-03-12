import {NameSpace, State} from '../root-reducer';

const getCartItems = (state: State) => state[NameSpace.Cart].items;
const getCartItemsCount = (state: State) => state[NameSpace.Cart].items
  .reduce((reducer, item) => reducer + item.count, 0);

export {
  getCartItems,
  getCartItemsCount
};
