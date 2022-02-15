import {setGuitar, setGuitars} from './action';
import {ApiRoute, RouteParam} from '../utils/const/app-route';
import {ThunkActionResult} from '../types/actionType';
import {Guitar} from '../types/guitar';
import {replaceRouteParam} from '../utils/utils';

const loadGuitars = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Guitar[]>(ApiRoute.GetGuitars);
    dispatch(setGuitars(data));
  };

const loadGuitar = (guitarId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Guitar>(replaceRouteParam(ApiRoute.GetGuitar, RouteParam.Id, guitarId.toString()));
    dispatch(setGuitar(data));
  };

export {
  loadGuitar,
  loadGuitars
};
