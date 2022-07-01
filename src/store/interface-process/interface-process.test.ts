import {changePage, startCommentsShown, pushToCommentsShown, changeActiveModal, interfaceProcess} from './interface-process';
import { InterfaceProcess } from '../../types/state';
import { makeFakeComments} from '../../mocks/data-mocks';
import { ActiveModal } from '../../settings/active-modal';
import { SortType } from '../../settings/sort-type';
import { SortOrder } from '../../settings/sort-order';

const initialState: InterfaceProcess = {
  activePage: 1,
  commentsShown: [],
  activeModal: ActiveModal.NoModal,
  sortType: SortType.Price,
  sortOrder: SortOrder.Asc,
  acousticFilter: false,
  electricFilter: false,
  ukuleleFilter: false,
  fourStringsFilter: false,
  sixStringsFilter: false,
  sevenStringsFilter: false,
  twelveStringsFilter: false,
};

describe('Reducer: data-process', () => {

  it('without additional parameters should return initial state', () => {
    expect(interfaceProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should change active-page in store to 3', () => {
    expect(interfaceProcess.reducer(initialState, changePage(3)))
      .toEqual({...initialState, activePage: 3});
  });

  it('should load comments-to-show in store', () => {
    const mockComments = makeFakeComments;
    expect(interfaceProcess.reducer(initialState, startCommentsShown(mockComments)))
      .toEqual({...initialState, commentsShown: mockComments});
  });

  it('should push number 5 to comments-array (empty) in store', () => {
    expect(interfaceProcess.reducer(initialState, pushToCommentsShown(5)))
      .toEqual({...initialState, commentsShown: [5]});
  });

  it('should change active-modal status to ReviewForm', () => {
    expect(interfaceProcess.reducer(initialState, changeActiveModal(ActiveModal.ReviewForm)))
      .toEqual({...initialState, activeModal: ActiveModal.ReviewForm});
  });
});
