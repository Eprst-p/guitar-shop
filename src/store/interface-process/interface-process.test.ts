import {changePage, startCommentsShown, pushToCommentsShown, changeActiveModal, interfaceProcess, changeSortType, changeAcousticFilter, changeElectricFilter, changeFourStringsFilter, changeSevenStringsFilter, changeSixStringsFilter, changeTwelveStringsFilter, changeUkuleleFilter, changeMaxPriceFilter, changeMinPriceFilter, resetFilters, changeSortOrder} from './interface-process';
import { InterfaceProcess } from '../../types/state';
import { makeFakeComments} from '../../mocks/data-mocks';
import { ActiveModal } from '../../settings/active-modal';
import { SortType } from '../../settings/sort-type';
import { SortOrder } from '../../settings/sort-order';

const initialState: InterfaceProcess = {
  activePage: 1,
  commentsShown: [],
  activeModal: ActiveModal.NoModal,
  sortType: undefined,
  sortOrder: undefined,
  acousticFilter: false,
  electricFilter: false,
  ukuleleFilter: false,
  fourStringsFilter: false,
  sixStringsFilter: false,
  sevenStringsFilter: false,
  twelveStringsFilter: false,
  minPriceFilter: undefined,
  maxPriceFilter: undefined,
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

  it('should change sortType to Price', () => {
    expect(interfaceProcess.reducer(initialState, changeSortType(SortType.Price)))
      .toEqual({...initialState, sortType: SortType.Price});
  });

  it('should change sortOrder to Desc', () => {
    expect(interfaceProcess.reducer(initialState, changeSortOrder(SortOrder.Desc)))
      .toEqual({...initialState, sortOrder: SortOrder.Desc});
  });

  it('should change all filters to true', () => {
    expect(interfaceProcess.reducer(initialState, changeAcousticFilter()))
      .toEqual({...initialState, acousticFilter: true});
    expect(interfaceProcess.reducer(initialState, changeElectricFilter()))
      .toEqual({...initialState, electricFilter: true});
    expect(interfaceProcess.reducer(initialState, changeUkuleleFilter()))
      .toEqual({...initialState, ukuleleFilter: true});
    expect(interfaceProcess.reducer(initialState, changeFourStringsFilter()))
      .toEqual({...initialState, fourStringsFilter: true});
    expect(interfaceProcess.reducer(initialState, changeSixStringsFilter()))
      .toEqual({...initialState, sixStringsFilter: true});
    expect(interfaceProcess.reducer(initialState, changeSevenStringsFilter()))
      .toEqual({...initialState, sevenStringsFilter: true});
    expect(interfaceProcess.reducer(initialState, changeTwelveStringsFilter()))
      .toEqual({...initialState, twelveStringsFilter: true});
  });

  it('should change minPriceFilter to 5000', () => {
    expect(interfaceProcess.reducer(initialState, changeMinPriceFilter(5000)))
      .toEqual({...initialState, minPriceFilter: 5000});
  });

  it('should change maxPriceFilter to 25000', () => {
    expect(interfaceProcess.reducer(initialState, changeMaxPriceFilter(25000)))
      .toEqual({...initialState, maxPriceFilter: 25000});
  });

  it('should change all filters back to false, and prices to undefined', () => {
    const changedState: InterfaceProcess = {
      activePage: 1,
      commentsShown: [],
      activeModal: ActiveModal.NoModal,
      sortType: undefined,
      sortOrder: undefined,
      acousticFilter: true,
      electricFilter: true,
      ukuleleFilter: true,
      fourStringsFilter: true,
      sixStringsFilter: true,
      sevenStringsFilter: true,
      twelveStringsFilter: true,
      minPriceFilter: 5000,
      maxPriceFilter: 25000,
    };

    expect(interfaceProcess.reducer(changedState, resetFilters()))
      .toEqual({...changedState,
        acousticFilter: false,
        electricFilter: false,
        ukuleleFilter: false,
        fourStringsFilter: false,
        sixStringsFilter: false,
        sevenStringsFilter: false,
        twelveStringsFilter: false,
        minPriceFilter: undefined,
        maxPriceFilter: undefined,
      });
  });
});
