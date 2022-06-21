import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { makeFakeGuitarsWithComments } from '../../mocks/data-mocks';
import HistoryRouter from '../history-router/history-router';
import { AppRoute } from '../../settings/app-routes';
import Footer from './footer';

const mockStore = configureMockStore();

describe('Renders footer-component', () => {
  const history = createMemoryHistory();

  it('should render footer container on main-page', () => {
    const mockGuitars = makeFakeGuitarsWithComments;
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
          <Footer />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/footer/i)).toBeInTheDocument();
  });

  it('should render footer container on cart-page', () => {
    const mockGuitars = makeFakeGuitarsWithComments;
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
          <Footer />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/footer/i)).toBeInTheDocument();
  });

  it('should render footer container on product-page', () => {
    const mockGuitars = makeFakeGuitarsWithComments;
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
          <Footer />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/footer/i)).toBeInTheDocument();
  });
});
