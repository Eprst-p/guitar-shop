import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { makeFakeGuitars } from '../../mocks/data-mocks';
import HistoryRouter from '../history-route/history-route';
import { AppRoute } from '../../settings/app-routes';
import Header from './header';

const mockStore = configureMockStore();

describe('Renders header-component', () => {
  const history = createMemoryHistory();

  it('should render header container on main-page', () => {
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
          <Header />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/header/i)).toBeInTheDocument();
  });

  it('should render header container on cart-page', () => {
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
          <Header />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/header/i)).toBeInTheDocument();
  });


  it('should render header container on product-page', () => {
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
          <Header />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/header/i)).toBeInTheDocument();
  });

});
