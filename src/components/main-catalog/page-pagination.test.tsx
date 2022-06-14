import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { makeFakeGuitars } from '../../mocks/data-mocks';
import HistoryRouter from '../history-route/history-route';
import { AppRoute } from '../../settings/app-routes';
import PagePagination from './page-pagination';
import { cardsPerPage } from '../../settings/constants';

const mockStore = configureMockStore();

describe('Renders page-pagination-component', () => {
  const history = createMemoryHistory();
  const mockGuitars = makeFakeGuitars;
  const pagesAmount = Math.ceil(mockGuitars.length / cardsPerPage);

  it('should render page-pagination container', () => {
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
          <PagePagination />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/pagination-container/i)).toBeInTheDocument();
  });

  it('should render correct amount of pagination-page-numbers', () => {
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
          <PagePagination />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getAllByTestId(/pagination-page-number/i)).toHaveLength(pagesAmount);
  });

  it('should render pagination__page--prev element, when active page > 1', () => {
    history.push(AppRoute.Catalog);

    const store = mockStore({
      DATA: {
        isDataLoaded: true,
        guitarsWithComments: mockGuitars,
      },
      INTERFACE: {
        activePage: 2,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PagePagination />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Назад/i)).toBeInTheDocument();
  });

  it('should NOT render pagination__page--prev element, when active page <= 1', () => {
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
          <PagePagination />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/Назад/i)).not.toBeInTheDocument();
  });

  it('should render pagination__page--next element, when activePage < pagesAmount', () => {
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
          <PagePagination />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Далее/i)).toBeInTheDocument();
  });

  it('should NOT render pagination__page--next element element, when activePage >= pagesAmount', () => {
    history.push(AppRoute.Catalog);

    const store = mockStore({
      DATA: {
        isDataLoaded: true,
        guitarsWithComments: mockGuitars,
      },
      INTERFACE: {
        activePage: pagesAmount,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PagePagination />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/Далее/i)).not.toBeInTheDocument();
  });
});
