import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../settings/name-space';
import {DataProcess} from '../../types/state';


const initialState: DataProcess = {
  guitars: [],
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    loadGuitars: (state, {payload}) => {
      state.guitars = payload;
      // state.isDataLoaded = true;
    },
  },
});

export const {loadGuitars} = dataProcess.actions;
