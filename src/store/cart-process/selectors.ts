import {NameSpace, State} from '../root-reducer';

const getCartItems = (state: State) => state[NameSpace.Cart].items;
const getCartItemsCount = (state: State) => state[NameSpace.Cart].items.length;

export {
  getCartItems,
  getCartItemsCount
};
