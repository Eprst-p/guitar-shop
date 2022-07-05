import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router/history-router';
import { AppRoute } from '../../settings/app-routes';
import CatalogFilter from './catalog-filter';
import { makeFakeGuitarsWithComments } from '../../mocks/data-mocks';
import userEvent from '@testing-library/user-event';
import { changeAcousticFilter, changeElectricFilter, changeFourStringsFilter, changeMaxPriceFilter, changeMinPriceFilter, changeSevenStringsFilter, changeSixStringsFilter, changeTwelveStringsFilter, changeUkuleleFilter, resetFilters } from '../../store/interface-process/interface-process';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockGuitars = makeFakeGuitarsWithComments;

const store = mockStore({
  DATA: {
    isDataLoaded: true,
    guitars: mockGuitars,
  },
  INTERFACE: {
    acousticFilter: false,
    electricFilter: false,
    ukuleleFilter: false,
    fourStringsFilter: false,
    sixStringsFilter: false,
    sevenStringsFilter: false,
    twelveStringsFilter: false,
    minPriceFilter: undefined,
    maxPriceFilter: undefined,
  },
});

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

  it('should dispatch changeAcousticFilter when click on acoustic-filter', () => {
    render(fakeCatalogFilter);

    userEvent.click(screen.getByTestId(/acoustic/i));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(changeAcousticFilter.toString());
  });

  it('should dispatch changeAcousticFilter when click on electric-filter', () => {
    render(fakeCatalogFilter);

    userEvent.click(screen.getByTestId(/electric/i));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(changeElectricFilter.toString());
  });

  it('should dispatch changeAcousticFilter when click on ukulele-filter', () => {
    render(fakeCatalogFilter);

    userEvent.click(screen.getByTestId(/ukulele/i));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(changeUkuleleFilter.toString());
  });

  it('should dispatch changeFourStringsFilter when click on 4-strings-filter', () => {
    render(fakeCatalogFilter);

    userEvent.click(screen.getByTestId(/4-strings/i));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(changeFourStringsFilter.toString());
  });

  it('should dispatch changeSixStringsFilter when click on 4-strings-filter', () => {
    render(fakeCatalogFilter);

    userEvent.click(screen.getByTestId(/6-strings/i));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(changeSixStringsFilter.toString());
  });

  it('should dispatch changeSevenStringsFilter when click on 4-strings-filter', () => {
    render(fakeCatalogFilter);

    userEvent.click(screen.getByTestId(/7-strings/i));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(changeSevenStringsFilter.toString());
  });

  it('should dispatch changeTwelveStringsFilter when click on 4-strings-filter', () => {
    render(fakeCatalogFilter);

    userEvent.click(screen.getByTestId(/12-strings/i));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(changeTwelveStringsFilter.toString());
  });

  it('should dispatch changeMinPriceFilter when tab from min-price', () => {
    render(fakeCatalogFilter);

    userEvent.type(screen.getByTestId(/min-price/i), '2000');
    userEvent.tab();
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(changeMinPriceFilter.toString());
  });

  it('should type 2000 in min price field', () => {
    render(fakeCatalogFilter);

    userEvent.type(screen.getByTestId(/min-price/i), '2000');
    expect(screen.getByTestId(/min-price/i)).toHaveValue(2000);
  });

  it('should dispatch changeMinPriceFilter when tab from max-price', () => {
    render(fakeCatalogFilter);

    userEvent.type(screen.getByTestId(/max-price/i), '25000');
    userEvent.tab();
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(changeMaxPriceFilter.toString());
  });

  it('should type 25000 in max price field', () => {
    render(fakeCatalogFilter);

    userEvent.type(screen.getByTestId(/max-price/i), '25000');
    expect(screen.getByTestId(/max-price/i)).toHaveValue(25000);
  });

  it('should dispatch resetFilters when click on clear-btn', () => {
    render(fakeCatalogFilter);

    userEvent.click(screen.getByTestId(/clear-btn/i));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(resetFilters.toString());
  });

});
