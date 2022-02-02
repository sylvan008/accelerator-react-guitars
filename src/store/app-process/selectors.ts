import {NameSpace, State} from '../root-reducer';

export const getIsLoadDataError = (state: State) => state[NameSpace.App].isLoadDataError;
