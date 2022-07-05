import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import { fetchCommentsByID, fetchGuitarByID, fetchGuitars} from './api-actions';
import {State} from '../types/state';
import { loadCommentsByID, loadGuitarByID, loadGuitars } from './data-process/data-process';
import { datatype } from 'faker';
import { generatePath } from 'react-router-dom';
import { makeFakeComments, makeFakeGuitar, makeFakeGuitars } from '../mocks/data-mocks';
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

  it('should dispatch loadGuitars when GET /guitars?_embed=comments without params', async () => {
    const mockGuitars = makeFakeGuitars;
    const queryParams = '';
    mockAPI
      .onGet(generatePath(`${ApiRoute.GuitarsWithComments}${queryParams}`))
      .reply(200, mockGuitars);
    const store = mockStore();
    await store.dispatch(fetchGuitars());
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadGuitars.toString());
  });

  it('should dispatch loadGuitars when GET /guitars?_embed=comments with that params: &_sort=price&_order=asc&type=acoustic&stringCount=12&price_gte=5000', async () => {
    const mockGuitars = makeFakeGuitars;
    const queryParams = '&_sort=price&_order=asc&type=acoustic&stringCount=12&price_gte=5000';
    mockAPI
      .onGet(generatePath(`${ApiRoute.GuitarsWithComments}${queryParams}`))
      .reply(200, mockGuitars);
    const store = mockStore();
    await store.dispatch(fetchGuitars());
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadGuitars.toString());
  });

  it('should dispatch loadSearchedGuitars when GET /guitars?_limit=27 without params', async () => {
    const mockGuitars = makeFakeGuitars;
    const searchParams = '';
    mockAPI
      .onGet(generatePath(`${ApiRoute.Guitars}${searchParams}`))
      .reply(200, mockGuitars);
    const store = mockStore();
    await store.dispatch(fetchGuitars());
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadGuitars.toString());
  });

  it('should dispatch loadSearchedGuitars when GET /guitars?_limit=27 with that params: &name_like=Чест', async () => {
    const mockGuitars = makeFakeGuitars;
    const searchParams = '&name_like=Чест';
    mockAPI
      .onGet(generatePath(`${ApiRoute.Guitars}${searchParams}`))
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
});
