import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../settings/name-space';
import {DataProcess} from '../../types/state';


const initialState: DataProcess = {
  guitars: [],
  guitarByID: undefined,
  commentsByID: [],
  isDataLoaded: false,
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    loadGuitars: (state, {payload}) => {
      state.guitars = payload;
      state.isDataLoaded = true;
    },
    loadGuitarByID: (state, {payload}) => {state.guitarByID = payload;},
    loadCommentsByID: (state, {payload}) => {state.commentsByID = payload;},
  },
});


export const {loadGuitars, loadGuitarByID, loadCommentsByID} = dataProcess.actions;
