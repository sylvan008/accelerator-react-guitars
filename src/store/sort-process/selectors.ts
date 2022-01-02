import {NameSpace, State} from '../root-reducer';

const getSort = (state: State) => state[NameSpace.Sort].sort;
const getOrder = (state: State) => state[NameSpace.Sort].order;

export {
  getOrder,
  getSort
};
