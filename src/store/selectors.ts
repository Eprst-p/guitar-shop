import {State} from '../types/state';
import {createSelector} from 'reselect';
import { cardsPerPage } from '../settings/constants';

export const getAllGuitars = (state:State) => state.DATA.guitars;
export const getGuitarsWithComments = (state:State) => state.DATA.guitarsWithComments;
export const getGuitarByID = (state:State) => state.DATA.guitarByID;
export const getCommentsByID = (state:State) => state.DATA.commentsByID;
export const getIsDataLoaded = (state:State) => state.DATA.isDataLoaded;

export const getActivePage = (state:State) => state.INTERFACE.activePage;

export const getGuitarsForPage = createSelector(getGuitarsWithComments, getActivePage, (allGuitars, activePage) => allGuitars.slice((activePage - 1)*cardsPerPage, cardsPerPage*activePage));
