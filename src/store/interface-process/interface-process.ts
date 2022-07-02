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
  acousticFilter: false,
  electricFilter: false,
  ukuleleFilter: false,
  fourStringsFilter: false,
  sixStringsFilter: false,
  sevenStringsFilter: false,
  twelveStringsFilter: false,
  minPriceFilter: undefined,
  maxPriceFilter: undefined,
};

export const interfaceProcess = createSlice({
  name: NameSpace.Interface,
  initialState,
  reducers: {
    changePage: (state, {payload}) => {state.activePage = payload;},
    startCommentsShown: (state, {payload}) => {state.commentsShown = payload;},
    pushToCommentsShown: (state, {payload}) => {state.commentsShown.push(payload);},
    changeActiveModal: (state, {payload}) => {state.activeModal = payload;},
    changeSortType: (state, {payload}) => {state.sortType = payload;},
    changeSortOrder: (state, {payload}) => {state.sortOrder = payload;},
    changeAcousticFilter: (state) => {state.acousticFilter = !state.acousticFilter;},
    changeElectricFilter: (state) => {state.electricFilter = !state.electricFilter;},
    changeUkuleleFilter: (state) => {state.ukuleleFilter = !state.ukuleleFilter;},
    changeFourStringsFilter: (state) => {state.fourStringsFilter = !state.fourStringsFilter;},
    changeSixStringsFilter: (state) => {state.sixStringsFilter = !state.sixStringsFilter;},
    changeSevenStringsFilter: (state) => {state.sevenStringsFilter = !state.sevenStringsFilter;},
    changeTwelveStringsFilter: (state) => {state.twelveStringsFilter = !state.twelveStringsFilter;},
    changeMinPriceFilter: (state, {payload}) => {state.minPriceFilter = payload;},
    changeMaxPriceFilter: (state, {payload}) => {state.maxPriceFilter = payload;},
    resetFilters: (state) => {
      state.acousticFilter = false;
      state.electricFilter = false;
      state.ukuleleFilter = false;
      state.fourStringsFilter = false;
      state.sixStringsFilter = false;
      state.sevenStringsFilter = false;
      state.twelveStringsFilter = false;
      state.minPriceFilter = undefined;
      state.maxPriceFilter = undefined;
    },
  },
});

export const {changePage, startCommentsShown, pushToCommentsShown, changeActiveModal, changeSortType, changeSortOrder, changeAcousticFilter, changeElectricFilter, changeUkuleleFilter, changeFourStringsFilter, changeSixStringsFilter, changeSevenStringsFilter, changeTwelveStringsFilter, changeMinPriceFilter, changeMaxPriceFilter, resetFilters} = interfaceProcess.actions;
