import {createSlice} from '@reduxjs/toolkit';
import { ActiveModal } from '../../settings/active-modal';
import {NameSpace} from '../../settings/name-space';
import {InterfaceProcess} from '../../types/state';

const initialState: InterfaceProcess = {
  activePage: 1,
  commentsShown: [],
  activeModal: ActiveModal.NoModal,
  sortType: undefined,
  sortOrder: undefined,
};

export const interfaceProcess = createSlice({
  name: NameSpace.Interface,
  initialState,
  reducers: {
    changePage: (state, {payload}) => {state.activePage = payload;},
    startCommentsShown: (state, {payload}) => {state.commentsShown = payload;},
    pushToCommentsShown : (state, {payload}) => {state.commentsShown.push(payload);},
    changeActiveModal: (state, {payload}) => {state.activeModal = payload;},
    changeSortType: (state, {payload}) => {state.sortType = payload;},
    changeSortOrder: (state, {payload}) => {state.sortOrder = payload;},
  },
});

export const {changePage, startCommentsShown, pushToCommentsShown, changeActiveModal, changeSortType, changeSortOrder} = interfaceProcess.actions;
