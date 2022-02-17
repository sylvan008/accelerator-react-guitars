import {setComments, setGuitar, setGuitars} from './action';
import {ApiRoute, RouteParam} from '../utils/const/app-route';
import {ThunkActionResult} from '../types/actionType';
import {Guitar} from '../types/guitar';
import {replaceRouteParam} from '../utils/utils';
import {Review} from '../types/review';
import {generatePath} from 'react-router-dom';

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

const loadComments = (guitarId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Review[]>(generatePath(ApiRoute.GetComments, {
      id: guitarId,
    }));
    dispatch(setComments(data));
  };

export {
  loadComments,
  loadGuitar,
  loadGuitars
};
