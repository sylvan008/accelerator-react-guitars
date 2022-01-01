import {NameSpace, State} from '../root-reducer';

const getGuitars = (state: State) => state[NameSpace.Catalog].guitars;
const getPriceBounds = (state: State) => state[NameSpace.Catalog].priceBounds;
const getIsCatalogLoad = (state: State) => state[NameSpace.Catalog].isCatalogLoad;

export {
  getGuitars,
  getIsCatalogLoad,
  getPriceBounds
};
