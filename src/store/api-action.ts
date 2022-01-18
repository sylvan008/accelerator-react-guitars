import {setGuitars} from './action';
import {ApiRoute} from '../utils/const/app-route';
import {ThunkActionResult} from '../types/actionType';
import {Guitar} from '../types/guitar';

const loadGuitars = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Guitar[]>(ApiRoute.GetGuitars);
    dispatch(setGuitars(data));
  };

export {
  loadGuitars
};
