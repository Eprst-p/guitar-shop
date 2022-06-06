import {createAction} from '@reduxjs/toolkit';
import {AppRoute} from '../settings/app-routes';

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');

