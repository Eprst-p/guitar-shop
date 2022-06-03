import {State} from '../types/state';
//import {createSelector} from 'reselect';

export const getAllGuitars = (state:State) => state.DATA.guitars;
export const getGuitarByID = (state:State) => state.DATA.guitar;
export const getCommentsByID = (state:State) => state.DATA.commentsByID;
export const getIsDataLoaded = (state:State) => state.DATA.isDataLoaded;

