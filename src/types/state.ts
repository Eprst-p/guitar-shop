import { store } from '../store';
import { CommentsType } from './comment-type';
import { GuitarsType, GuitarType} from './guitar-type';

export type DataProcess = {
  guitars: GuitarsType;
  guitarByID: GuitarType | undefined;
  commentsByID: CommentsType;
  isDataLoaded: boolean;
};

export type InterfaceProcess = {
  activePage: number;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;


