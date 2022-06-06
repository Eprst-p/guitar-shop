import { store } from '../store';
import { CommentsType } from './comment-type';
import { GuitarsType, GuitarType} from './guitar-type';
import { GuitarsWithCommentsType } from './guitar-with-comments-type';

export type DataProcess = {
  guitars: GuitarsType;
  guitarsWithComments: GuitarsWithCommentsType;
  guitarByID: GuitarType | undefined;
  commentsByID: CommentsType;
  isDataLoaded: boolean;
};

export type InterfaceProcess = {
  activePage: number;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;


