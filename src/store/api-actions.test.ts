import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import { fetchCommentsByID, fetchGuitarByID, fetchGuitars, fetchGuitarsWithComments } from './api-actions';
import {State} from '../types/state';
import { loadCommentsByID, loadGuitarByID, loadGuitars, loadGuitarsWithComments } from './data-process/data-process';
import { datatype } from 'faker';
import { generatePath } from 'react-router-dom';
import { makeFakeComments, makeFakeGuitar, makeFakeGuitars, makeFakeGuitarsWithComments } from '../mocks/data-mocks';
import { ApiRoute } from '../settings/api-route';
import { redirectToRoute } from './action';


describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);


  it('should dispatch loadGuitars when GET /guitars?_limit=27', async () => {
    const mockGuitars = makeFakeGuitars;
    mockAPI
      .onGet(ApiRoute.Guitars)
      .reply(200, mockGuitars);
    const store = mockStore();
    await store.dispatch(fetchGuitars());
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadGuitars.toString());
  });

  it('should dispatch loadGuitarByID when GET /guitars/:id', async () => {
    const mockGuitar = makeFakeGuitar();
    const id = datatype.number();
    mockAPI
      .onGet(generatePath(ApiRoute.Guitar, {id: `${id}`}))
      .reply(200, mockGuitar);
    const store = mockStore();
    await store.dispatch(fetchGuitarByID(id));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadGuitarByID.toString());
  });

  it('should redirect to not-found when GET /guitars/:id and get bad request', async () => {
    const id = datatype.number();
    mockAPI
      .onGet(generatePath(ApiRoute.Guitar, {id: `${id}`}))
      .reply(400, null);
    const store = mockStore();
    await store.dispatch(fetchGuitarByID(id));
    expect(store.dispatch(redirectToRoute).type).toContain(redirectToRoute.toString());
  });

  it('should dispatch loadCommentsByID when GET /guitars/:id/comments', async () => {
    const mockComments = makeFakeComments;
    const id = datatype.number();
    mockAPI
      .onGet(generatePath(ApiRoute.CommentsByID, {id: `${id}`}))
      .reply(200, mockComments);
    const store = mockStore();
    await store.dispatch(fetchCommentsByID(id));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadCommentsByID.toString());
  });

  it('should dispatch loadGuitarsWithComments when GET /guitars/:id?_embed=comments', async () => {
    const mockGuitarsWithComments = makeFakeGuitarsWithComments;
    mockAPI
      .onGet(ApiRoute.GuitarsWithComments)
      .reply(200, mockGuitarsWithComments);
    const store = mockStore();
    await store.dispatch(fetchGuitarsWithComments());
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadGuitarsWithComments.toString());
  });
});
