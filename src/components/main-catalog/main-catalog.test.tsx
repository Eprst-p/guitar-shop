import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { makeFakeGuitars } from '../../mocks/data-mocks';
import HistoryRouter from '../history-route/history-route';
import { AppRoute } from '../../settings/app-routes';
import MainCatalog from './main-catalog';
import { cardsPerPage } from '../../settings/constants';
import { generatePath } from 'react-router-dom';

const mockStore = configureMockStore();

describe('Renders main-catalog-component', () => {
  const history = createMemoryHistory();

  it('should render main-catalog container (from redux state)', () => {
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
          <MainCatalog />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/main-container/i)).toBeInTheDocument();
  });

  it('should render main-catalog container (from url-parameters)', () => {
    const mockGuitars = makeFakeGuitars;
    history.push(generatePath(AppRoute.CatalogPage, {pageNumber: `${1}`}));

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
          <MainCatalog />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/main-container/i)).toBeInTheDocument();
  });

  it('should render main-catalog container, when url-params differ from state', () => {
    const mockGuitars = makeFakeGuitars;
    history.push(generatePath(AppRoute.CatalogPage, {pageNumber: `${2}`}));

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
          <MainCatalog />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/main-container/i)).toBeInTheDocument();
  });

  it('should render correct amount of product-cards', () => {
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
          <MainCatalog />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getAllByTestId(/product-card/i)).toHaveLength(cardsPerPage);
  });

});
