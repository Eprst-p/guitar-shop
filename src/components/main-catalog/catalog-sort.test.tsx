import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router/history-router';
import { AppRoute } from '../../settings/app-routes';
import CatalogSort from './catalog-sort';
import userEvent from '@testing-library/user-event';
import { changeSortOrder, changeSortType } from '../../store/interface-process/interface-process';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({});

const fakeCatalogSort = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <CatalogSort />
    </HistoryRouter>
  </Provider>
);

describe('Renders catalog-sort-component', () => {

  it('should render catalog-sort container', () => {
    history.push(AppRoute.Catalog);
    render(fakeCatalogSort);

    expect(screen.getByTestId(/catalog-sort/i)).toBeInTheDocument();
  });

  it('should render correctly', () => {
    history.push(AppRoute.Catalog);
    render(fakeCatalogSort);

    expect(screen.getByText(/Сортировать/i)).toBeInTheDocument();
    expect(screen.getByText(/по цене/i)).toBeInTheDocument();
    expect(screen.getByText(/по популярности/i)).toBeInTheDocument();
  });

  it('should dispatch changeSortType when click on sort-by-price-btn', () => {
    history.push(AppRoute.Catalog);
    render(fakeCatalogSort);

    userEvent.click(screen.getByTestId(/sort-by-price/i));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(changeSortType.toString());
  });

  it('should dispatch changeSortType when click on sort-by-rating-btn', () => {
    history.push(AppRoute.Catalog);
    render(fakeCatalogSort);

    userEvent.click(screen.getByTestId(/sort-by-rating/i));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(changeSortType.toString());
  });

  it('should dispatch changeOrderType when click on sort-by-asc-order-btn', () => {
    history.push(AppRoute.Catalog);
    render(fakeCatalogSort);

    userEvent.click(screen.getByTestId(/sort-by-asc-order/i));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(changeSortOrder.toString());
  });

  it('should dispatch changeOrderType when click on sort-by-desc-order-btn', () => {
    history.push(AppRoute.Catalog);
    render(fakeCatalogSort);

    userEvent.click(screen.getByTestId(/sort-by-desc-order/i));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(changeSortOrder.toString());
  });
});
