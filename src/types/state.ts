import { store } from '../store';
import { CommentsType } from './comment-type';
import { GuitarsType, GuitarType } from './guitar-type';

export type DataProcess = {
  guitars: GuitarsType;
  guitar: GuitarType | undefined;
  commentsByID: CommentsType;
};

// export type InterfaceProcess = {
//   activeTheme: string;
//   bookingModalStatus: boolean;
// };

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;


