import {NameSpace, State} from '../root-reducer';
import {adaptCommentToClient, sortingCommentsByDate} from '../../utils/utils';

const getGuitar = (state: State) => state[NameSpace.Product].guitar;
const getComments = (state: State) => state[NameSpace.Product].comments
  .map(adaptCommentToClient)
  .sort(sortingCommentsByDate);

export {
  getGuitar,
  getComments
};
