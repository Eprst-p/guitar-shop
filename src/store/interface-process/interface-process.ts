import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../settings/name-space';
import {InterfaceProcess} from '../../types/state';


const initialState: InterfaceProcess = {
  activePage: 1,
  commentsShown: [],
};

export const interfaceProcess = createSlice({
  name: NameSpace.Interface,
  initialState,
  reducers: {
    changePage: (state, {payload}) => {state.activePage = payload;},
    startCommentsShown: (state, {payload}) => {state.commentsShown = payload;},
    pushToCommentsShown : (state, {payload}) => {state.commentsShown.push(payload);},
  },
});


export const {changePage, startCommentsShown, pushToCommentsShown} = interfaceProcess.actions;
