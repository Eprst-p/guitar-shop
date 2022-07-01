import {State} from '../types/state';
import {createSelector} from 'reselect';
import { cardsPerPage } from '../settings/constants';

export const getGuitars = (state:State) => state.DATA.guitars;
export const getGuitarByID = (state:State) => state.DATA.guitarByID;
export const getCommentsByID = (state:State) => state.DATA.commentsByID;
export const getIsDataLoaded = (state:State) => state.DATA.isDataLoaded;

export const getActivePage = (state:State) => state.INTERFACE.activePage;
export const getCommentsShown = (state:State) => state.INTERFACE.commentsShown;
export const getActiveModal = (state:State) => state.INTERFACE.activeModal;
export const getSortType = (state:State) => state.INTERFACE.sortType;
export const getSortOrder = (state:State) => state.INTERFACE.sortOrder;
export const getAcousticFilter = (state:State) => state.INTERFACE.acousticFilter;
export const getElectricFilter = (state:State) => state.INTERFACE.electricFilter;
export const getUkuleleFilter = (state:State) => state.INTERFACE.ukuleleFilter;
export const getFourStringsFilter = (state:State) => state.INTERFACE.fourStringsFilter;
export const getSixStringsFilter = (state:State) => state.INTERFACE.sixStringsFilter;
export const getSevenStringsFilter = (state:State) => state.INTERFACE.sevenStringsFilter;
export const getTwelveStringsFilter = (state:State) => state.INTERFACE.twelveStringsFilter;


export const getGuitarsForPage = createSelector(getGuitars, getActivePage, (allGuitars, activePage) => allGuitars.slice((activePage - 1)*cardsPerPage, cardsPerPage*activePage));
