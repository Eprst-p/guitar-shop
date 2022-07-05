import {loadGuitars, loadGuitarByID, loadCommentsByID, dataProcess} from './data-process';
import { DataProcess } from '../../types/state';
import { makeFakeComments, makeFakeGuitar, makeFakeGuitars} from '../../mocks/data-mocks';

const initialState: DataProcess = {
  guitars: [],
  guitarByID: undefined,
  commentsByID: [],
  searchedGuitars: [],
  isDataLoaded: false,
};

describe('Reducer: data-process', () => {

  it('without additional parameters should return initial state', () => {
    expect(dataProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should load guitars to store and change isDataLoaded to true', () => {
    const mockGuitars = makeFakeGuitars;
    expect(dataProcess.reducer(initialState, loadGuitars(mockGuitars)))
      .toEqual({...initialState, guitars: mockGuitars, isDataLoaded: true});
  });

  // it('should load guitars=with-comments to store and change isDataLoaded to true', () => {
  //   const mockGuitarsWithComments = makeFakeGuitarsWithComments;
  //   expect(dataProcess.reducer(initialState, loadGuitarsWithComments(mockGuitarsWithComments)))
  //     .toEqual({...initialState, guitarsWithComments: mockGuitarsWithComments, isDataLoaded: true});
  // });

  it('should load guitar to store', () => {
    const guitar = makeFakeGuitar();
    expect(dataProcess.reducer(initialState, loadGuitarByID(guitar)))
      .toEqual({...initialState, guitarByID: guitar});
  });

  it('should load comments to store', () => {
    const mockComments = makeFakeComments;
    expect(dataProcess.reducer(initialState, loadCommentsByID(mockComments)))
      .toEqual({...initialState, commentsByID: mockComments});
  });
});
