/* eslint-disable no-console */
import {createAsyncThunk} from '@reduxjs/toolkit';
import { generatePath } from 'react-router-dom';
import { api, store } from '.';
import { errorHandle } from '../services/error-handle';
import { ApiRoute } from '../settings/api-route';
import { CommentPostType } from '../types/comment-post-type';
import { CommentsType } from '../types/comment-type';
import { CouponPostType } from '../types/coupon-post-type';
import { GuitarsType, GuitarType } from '../types/guitar-type';
import { OrderPostType } from '../types/order-post-type';
import { loadCommentsByID, loadGuitarByID, loadGuitars } from './data-process/data-process';

const setPromiseWaiter = (timer = 300) => new Promise((resolve) => setTimeout(resolve, timer));


export const fetchGuitars = createAsyncThunk(
  'data/loadGuitars',
  async () => {
    try {
      const {data} = await api.get<GuitarsType>(ApiRoute.Guitars);
      await setPromiseWaiter(500);
      console.log(data);
      store.dispatch(loadGuitars(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchGuitarByID = createAsyncThunk(
  'data/loadGuitarByID',
  async (id: number) => {
    try {
      const {data} = await api.get<GuitarType>(generatePath(ApiRoute.Guitar, {id: `${id}`}));
      await setPromiseWaiter();
      store.dispatch(loadGuitarByID(data));
    } catch (error) {
      errorHandle(error);
      // store.dispatch(redirectToRoute(AppRoute.NotFound));
    }
  },
);

export const fetcCommentsByID = createAsyncThunk(
  'data/CommentsByID',
  async (id: number) => {
    try {
      const {data} = await api.get<CommentsType>(generatePath(ApiRoute.CommentsByID, {id: `${id}`}));
      await setPromiseWaiter();
      store.dispatch(loadCommentsByID(data));
    } catch (error) {
      errorHandle(error);
      // store.dispatch(redirectToRoute(AppRoute.NotFound));
    }
  },
);

export const commentPostAction = createAsyncThunk(
  'data/commentPostAction',
  async (comment: CommentPostType) => {
    try {
      await api.post<CommentPostType>(ApiRoute.Comments, comment);
      await setPromiseWaiter();
      // store.dispatch(setBookingModalStatus(false))
    } catch (error) {
      errorHandle(error);
      // store.dispatch(setBookingModalStatus(true))
    }
  },
);

export const couponPostAction = createAsyncThunk(
  'data/couponPostAction',
  async (coupon: CouponPostType) => {
    try {
      await api.post<CouponPostType>(ApiRoute.Coupons, coupon);
      await setPromiseWaiter();
      // store.dispatch(setBookingModalStatus(false))
    } catch (error) {
      errorHandle(error);
      // store.dispatch(setBookingModalStatus(true))
    }
  },
);

export const orderPostAction = createAsyncThunk(
  'data/orderPostAction',
  async (order: OrderPostType) => {
    try {
      await api.post<OrderPostType>(ApiRoute.Orders, order);
      await setPromiseWaiter();
      // store.dispatch(setBookingModalStatus(false))
    } catch (error) {
      errorHandle(error);
      // store.dispatch(setBookingModalStatus(true))
    }
  },
);

