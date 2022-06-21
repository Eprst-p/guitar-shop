import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router/history-router';
import { AppRoute } from '../../settings/app-routes';
import CatalogFilter from './catalog-filter';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const store = mockStore({});

const fakeCatalogFilter = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <CatalogFilter />
    </HistoryRouter>
  </Provider>
);

describe('Renders catalog-filter-component', () => {
  history.push(AppRoute.Catalog);

  it('should render catalog-filter form', () => {
    render(fakeCatalogFilter);

    expect(screen.getByTestId(/form-catalog-filter/i)).toBeInTheDocument();
  });

  it('should render correctly', () => {
    render(fakeCatalogFilter);

    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
    expect(screen.getByText(/Цена, ₽/i)).toBeInTheDocument();
    expect(screen.getByText(/Минимальная цена/i)).toBeInTheDocument();
    expect(screen.getByText(/Максимальная цена/i)).toBeInTheDocument();
    expect(screen.getByText(/Тип гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/Акустические гитары/i)).toBeInTheDocument();
    expect(screen.getByText(/Электрогитары/i)).toBeInTheDocument();
    expect(screen.getByText(/Укулеле/i)).toBeInTheDocument();
    expect(screen.getByText(/Количество струн/i)).toBeInTheDocument();
    expect(screen.getByText(/Очистить/i)).toBeInTheDocument();
  });
});
