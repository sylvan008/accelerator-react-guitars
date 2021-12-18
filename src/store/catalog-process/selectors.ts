import {NameSpace, State} from '../root-reducer';

const getGuitars = (state: State) => state[NameSpace.Catalog].guitars;

export {
  getGuitars
};
