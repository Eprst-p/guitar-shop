import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../settings/name-space';
import { cartProcess } from './cart-process/cart-process';
import {dataProcess} from './data-process/data-process';
import {interfaceProcess} from './interface-process/interface-process';

export const rootReducer = combineReducers({
  [NameSpace.Data]: dataProcess.reducer,
  [NameSpace.Interface]: interfaceProcess.reducer,
  [NameSpace.Cart]: cartProcess.reducer,
});
