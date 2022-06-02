/* eslint-disable no-console */
import {createAsyncThunk} from '@reduxjs/toolkit';
import { api } from '.';
import { ApiRoute } from '../settings/api-route';
import { GuitarsType } from '../types/guitar-type';

const setPromiseWaiter = (timer = 300) => new Promise((resolve) => setTimeout(resolve, timer));


export const fetchGuitars = createAsyncThunk(
  'data/loadGuitars',
  async () => {
    try {
      const {data} = await api.get<GuitarsType>(ApiRoute.Guitars);
      await setPromiseWaiter(500);
      console.log(data);
      // store.dispatch(loadQuests(data));
    } catch (error) {
      // errorHandle(error);
    }
  },
);
