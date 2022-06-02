import axios, {AxiosInstance} from 'axios';
import {SERVER_URL, REQUEST_TIMEOUT} from '../settings/server-settings';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: SERVER_URL,
    timeout: REQUEST_TIMEOUT,
  });

  return api;
};
