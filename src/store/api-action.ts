import {addDiscount, setComments, setGuitar, setGuitars} from './action';
import {ApiRoute, RouteParam} from '../utils/const/app-route';
import {ThunkActionResult} from '../types/actionType';
import {Guitar} from '../types/guitar';
import {replaceRouteParam} from '../utils/utils';
import {ReviewPost, ReviewServer} from '../types/review';
import {generatePath} from 'react-router-dom';
import {CouponPost} from '../types/coupon';

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
    const {data} = await api.get<ReviewServer[]>(generatePath(ApiRoute.GetComments, {
      id: guitarId,
    }));
    dispatch(setComments(data));
  };

const postComment = (comment: ReviewPost): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.post(ApiRoute.AddComment, comment);
  };

const postCoupon = (coupon: CouponPost): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.post(ApiRoute.ApplyCoupon, coupon);
    dispatch(addDiscount(data));
  };

export {
  loadComments,
  loadGuitar,
  loadGuitars,
  postComment,
  postCoupon
};
