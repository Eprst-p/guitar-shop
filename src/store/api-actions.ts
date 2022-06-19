import {createAsyncThunk} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { generatePath } from 'react-router-dom';
import { errorHandle } from '../services/error-handle';
import { ApiRoute } from '../settings/api-route';
import { AppRoute } from '../settings/app-routes';
import { CommentPostType } from '../types/comment-post-type';
import { CommentsType } from '../types/comment-type';
import { CouponPostType } from '../types/coupon-post-type';
import { GuitarsType, GuitarType } from '../types/guitar-type';
import { GuitarsWithCommentsType } from '../types/guitar-with-comments-type';
import { OrderPostType } from '../types/order-post-type';
import { AppDispatch, State } from '../types/state';
import { redirectToRoute } from './action';
import { loadCommentsByID, loadGuitarByID, loadGuitars, loadGuitarsWithComments} from './data-process/data-process';

const setPromiseWaiter = (timer = 300) => new Promise((resolve) => setTimeout(resolve, timer));

export const fetchGuitars = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/loadGuitars',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<GuitarsType>(ApiRoute.Guitars);
      await setPromiseWaiter(500);
      dispatch(loadGuitars(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchGuitarByID = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/loadGuitarByID',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<GuitarType>(generatePath(ApiRoute.Guitar, {id: `${id}`}));
      await setPromiseWaiter();
      dispatch(loadGuitarByID(data));
    } catch (error) {
      errorHandle(error);
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  },
);

export const fetchCommentsByID = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/CommentsByID',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<CommentsType>(generatePath(ApiRoute.CommentsByID, {id: `${id}`}));
      await setPromiseWaiter();
      dispatch(loadCommentsByID(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchGuitarsWithComments = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/GuitarsEmbed',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<GuitarsWithCommentsType>(ApiRoute.GuitarsWithComments);
      await setPromiseWaiter(500);
      dispatch(loadGuitarsWithComments(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const commentPostAction = createAsyncThunk<void, CommentPostType, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/commentPostAction',
  async (comment, {dispatch, extra: api}) => {
    try {
      await api.post<CommentPostType>(ApiRoute.Comments, comment);
      await setPromiseWaiter();
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const couponPostAction = createAsyncThunk<void, CouponPostType, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/couponPostAction',
  async (coupon, {dispatch, extra: api}) => {
    try {
      await api.post<CouponPostType>(ApiRoute.Coupons, coupon);
      await setPromiseWaiter();
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const orderPostAction = createAsyncThunk<void, OrderPostType, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/orderPostAction',
  async (order, {dispatch, extra: api}) => {
    try {
      await api.post<OrderPostType>(ApiRoute.Orders, order);
      await setPromiseWaiter();
    } catch (error) {
      errorHandle(error);
    }
  },
);

