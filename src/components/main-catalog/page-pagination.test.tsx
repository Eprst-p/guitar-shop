import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { makeFakeGuitarsWithComments } from '../../mocks/data-mocks';
import HistoryRouter from '../history-router/history-router';
import { AppRoute } from '../../settings/app-routes';
import PagePagination from './page-pagination';
import { cardsPerPage } from '../../settings/constants';
import userEvent from '@testing-library/user-event';
import { changePage } from '../../store/interface-process/interface-process';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockGuitars = makeFakeGuitarsWithComments;

const store = (activePageNumber:number) => mockStore({
  DATA: {
    isDataLoaded: true,
    guitars: mockGuitars,
  },
  INTERFACE: {
    activePage: activePageNumber,
  },
});

const fakePagePagination = (activePageNumber:number) => (
  <Provider store={store(activePageNumber)}>
    <HistoryRouter history={history}>
      <PagePagination />
    </HistoryRouter>
  </Provider>
);

describe('Renders page-pagination-component', () => {
  const pagesAmount = Math.ceil(mockGuitars.length / cardsPerPage);
  history.push(AppRoute.Catalog);

  it('should render page-pagination container', () => {
    render(fakePagePagination(1));

    expect(screen.getByTestId(/pagination-container/i)).toBeInTheDocument();
  });

  it('should render correct amount of pagination-page-numbers', () => {
    render(fakePagePagination(1));

    expect(screen.getAllByTestId(/pagination-page-number/i)).toHaveLength(pagesAmount);
  });

  it('should render pagination__page--prev element, when active page > 1', () => {
    render(fakePagePagination(2));

    expect(screen.getByText(/Назад/i)).toBeInTheDocument();
  });

  it('should NOT render pagination__page--prev element, when active page <= 1', () => {
    render(fakePagePagination(1));

    expect(screen.queryByText(/Назад/i)).not.toBeInTheDocument();
  });

  it('should render pagination__page--next element, when activePage < pagesAmount', () => {
    render(fakePagePagination(1));

    expect(screen.getByText(/Далее/i)).toBeInTheDocument();
  });

  it('should NOT render pagination__page--next element element, when activePage >= pagesAmount', () => {
    render(fakePagePagination(pagesAmount));

    expect(screen.queryByText(/Далее/i)).not.toBeInTheDocument();
  });

  it('should dispatch changePage when click on page-next-btn', () => {

    const anotherStore = mockStore({
      DATA: {
        isDataLoaded: true,
        guitars: mockGuitars,
      },
      INTERFACE: {
        activePage: 1,
      },
    });

    render(
      <Provider store={anotherStore}>
        <HistoryRouter history={history}>
          <PagePagination />
        </HistoryRouter>
      </Provider>,
    );

    userEvent.click(screen.getByText(/Далее/i));

    const actions = anotherStore.getActions().map(({type}) => type);
    expect(actions).toContain(changePage.toString());
  });

  it('should dispatch changePage when click on page-prev-btn', () => {

    const anotherStore = mockStore({
      DATA: {
        isDataLoaded: true,
        guitars: mockGuitars,
      },
      INTERFACE: {
        activePage: 2,
      },
    });

    render(
      <Provider store={anotherStore}>
        <HistoryRouter history={history}>
          <PagePagination />
        </HistoryRouter>
      </Provider>,
    );

    userEvent.click(screen.getByText(/Назад/i));

    const actions = anotherStore.getActions().map(({type}) => type);
    expect(actions).toContain(changePage.toString());
  });

  it('should dispatch changePage when click on second page-number-btn', () => {

    const anotherStore = mockStore({
      DATA: {
        isDataLoaded: true,
        guitars: mockGuitars,
      },
      INTERFACE: {
        activePage: 1,
      },
    });

    render(
      <Provider store={anotherStore}>
        <HistoryRouter history={history}>
          <PagePagination />
        </HistoryRouter>
      </Provider>,
    );

    userEvent.click(screen.getByText('2'));

    const actions = anotherStore.getActions().map(({type}) => type);
    expect(actions).toContain(changePage.toString());
  });
});
