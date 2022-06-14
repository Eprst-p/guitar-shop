import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { makeFakeGuitars } from '../../mocks/data-mocks';
import HistoryRouter from '../history-route/history-route';
import { AppRoute } from '../../settings/app-routes';
import Layout from './layout';

const mockStore = configureMockStore();

describe('Renders layout-component', () => {
  const history = createMemoryHistory();

  it('should render layout container on main-page', () => {
    const mockGuitars = makeFakeGuitars;
    history.push(AppRoute.Catalog);

    const store = mockStore({
      DATA: {
        isDataLoaded: true,
        guitarsWithComments: mockGuitars,
      },
      INTERFACE: {
        activePage: 1,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Layout />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/layout/i)).toBeInTheDocument();
  });

  it('should render layout container on cart-page', () => {
    const mockGuitars = makeFakeGuitars;
    history.push(AppRoute.Cart);

    const store = mockStore({
      DATA: {
        isDataLoaded: true,
        guitarsWithComments: mockGuitars,
      },
      INTERFACE: {
        activePage: 1,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Layout />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/layout/i)).toBeInTheDocument();
  });

  it('should render layout container on product-page', () => {
    const mockGuitars = makeFakeGuitars;
    history.push(AppRoute.Product);

    const store = mockStore({
      DATA: {
        isDataLoaded: true,
        guitarsWithComments: mockGuitars,
      },
      INTERFACE: {
        activePage: 1,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Layout />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/layout/i)).toBeInTheDocument();
  });

});
