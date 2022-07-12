import { ActiveModal } from '../settings/active-modal';
import { CouponStatus } from '../settings/coupon-status';
import { SortOrder } from '../settings/sort-order';
import { SortType } from '../settings/sort-type';
import { store } from '../store';
import { CommentsType } from './comment-type';
import { GuitarsType, GuitarType} from './guitar-type';
import { GuitarsWithCommentsType, GuitarWithCommentsType } from './guitar-with-comments-type';
import { ItemInCartType } from './item-in-cart-type';

export type DataProcess = {
  guitars: GuitarsWithCommentsType;
  guitarByID: GuitarType | GuitarWithCommentsType | undefined;
  commentsByID: CommentsType;
  searchedGuitars: GuitarsType;
  isDataLoaded: boolean;
};

export type InterfaceProcess = {
  activePage: number;
  commentsShown: CommentsType;
  activeModal: ActiveModal;
  sortType: SortType | undefined;
  sortOrder: SortOrder | undefined;
  acousticFilter: boolean;
  electricFilter: boolean;
  ukuleleFilter: boolean;
  fourStringsFilter: boolean;
  sixStringsFilter: boolean;
  sevenStringsFilter: boolean;
  twelveStringsFilter: boolean;
  minPriceFilter: number | undefined;
  maxPriceFilter: number | undefined;
};

export type CartProcess = {
  guitarsIDiesInCart: number[];
  discount: number;
  itemsInCart: ItemInCartType[];
  couponStatus: CouponStatus;
  couponName: string | null;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
