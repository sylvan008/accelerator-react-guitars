import {NameSpace, State} from '../root-reducer';

const getGuitar = (state: State) => state[NameSpace.Product].guitar;
const getComments = (state: State) => state[NameSpace.Product].comments;

export {
  getGuitar,
  getComments
};
