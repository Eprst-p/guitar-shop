import { store } from '../store';
import { GuitarsType } from './guitar-type';

export type DataProcess = {
  guitars: GuitarsType;
};

// export type InterfaceProcess = {
//   activeTheme: string;
//   bookingModalStatus: boolean;
// };

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;


