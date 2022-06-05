import {State} from '../types/state';
import {createSelector} from 'reselect';
import { cardsPerPage } from '../settings/constants';

export const getAllGuitars = (state:State) => state.DATA.guitars;
export const getGuitarByID = (state:State) => state.DATA.guitarByID;
export const getCommentsByID = (state:State) => state.DATA.commentsByID;
export const getIsDataLoaded = (state:State) => state.DATA.isDataLoaded;

export const getActivePage = (state:State) => state.INTERFACE.activePage;

export const getGuitarsForPage = createSelector(getAllGuitars, getActivePage, (allGuitars, activePage) => allGuitars.slice((activePage - 1)*cardsPerPage, cardsPerPage*activePage));
//export const getGuitarByID = createSelector(getAllGuitars, getGuitarID, (allGuitars, guitarID) => allGuitars.find((guitar) => guitar.id === guitarID));

