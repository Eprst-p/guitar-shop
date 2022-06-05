import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../settings/name-space';
import {InterfaceProcess} from '../../types/state';


const initialState: InterfaceProcess = {
  activePage: 1,
};

export const interfaceProcess = createSlice({
  name: NameSpace.Interface,
  initialState,
  reducers: {
    changePage: (state, {payload}) => {state.activePage = payload;},
  },
});


export const {changePage} = interfaceProcess.actions;
