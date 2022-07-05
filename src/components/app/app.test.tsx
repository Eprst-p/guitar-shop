import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './app';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { makeFakeComments, makeFakeGuitar, makeFakeGuitarsWithComments } from '../../mocks/data-mocks';
import { AppRoute } from '../../settings/app-routes';
import { generatePath } from 'react-router-dom';
import HistoryRouter from '../history-router/history-router';
import { ActiveModal } from '../../settings/active-modal';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockGuitars = makeFakeGuitarsWithComments;
const mockComments = makeFakeComments;
const mockShownComments = mockComments.slice(0,5);
const history = createMemoryHistory();

const store = mockStore({
  DATA: {
    isDataLoaded: true,
    guitars: mockGuitars,
    commentsByID: mockComments,
    searchedGuitars: [],
  },
  INTERFACE: {
    activePage: 1,
    commentsShown: mockShownComments,
    activeModal: ActiveModal.NoModal,
  },
});

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Renders app-component', () => {

  it('should render Catalog when when user navigate to "/"', () => {
    history.push(AppRoute.Catalog);
    render(fakeApp);

    expect(screen.getByTestId(/main-container/i)).toBeInTheDocument();
  });

  it('should render Product when when user navigate to "/product/:id"', () => {
    const mockGuitar = makeFakeGuitar();
    history.push(generatePath(AppRoute.Product, {id: `${mockGuitar.id}`}));
    render(fakeApp);

    expect(screen.getByTestId(/product-container/i)).toBeInTheDocument();
  });

  it('should render Cart when when user navigate to "/cart"', () => {
    history.push(AppRoute.Cart);
    render(fakeApp);

    expect(screen.getByTestId(/cart/i)).toBeInTheDocument();
  });

  it('should render NotFound when when user navigate to non-existent route', () => {
    history.push('/non-existing some asdasdasd');
    render(fakeApp);

    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  it('should render Loading when data has NOT loaded', () => {
    const storeWithoutData = mockStore({
      DATA: {
        isDataLoaded: false,
      },
    });

    render(
      <Provider store={storeWithoutData}>
        <App />
      </Provider>,
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});
