import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import { AppRoute } from '../../settings/app-routes';
import CatalogSort from './catalog-sort';

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
});
