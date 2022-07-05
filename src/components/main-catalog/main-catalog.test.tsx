import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { makeFakeGuitarsWithComments } from '../../mocks/data-mocks';
import HistoryRouter from '../history-router/history-router';
import { AppRoute } from '../../settings/app-routes';
import MainCatalog from './main-catalog';
import { cardsPerPage } from '../../settings/constants';
import { generatePath } from 'react-router-dom';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockGuitars = makeFakeGuitarsWithComments;
const history = createMemoryHistory();

const store = mockStore({
  DATA: {
    isDataLoaded: true,
    guitars: mockGuitars,
  },
  INTERFACE: {
    activePage: 1,
  },
});

const fakeMainCatalog = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <MainCatalog />
    </HistoryRouter>
  </Provider>
);

describe('Renders main-catalog-component', () => {

  it('should render main-catalog container', () => {
    history.push(AppRoute.Catalog);
    render(fakeMainCatalog);

    expect(screen.getByTestId(/main-container/i)).toBeInTheDocument();
  });

  it('should render main-catalog container, when url-params differ from state', () => {
    history.push(generatePath(AppRoute.CatalogPage, {pageNumber: `${2}`}));
    render(fakeMainCatalog);

    expect(screen.getByTestId(/main-container/i)).toBeInTheDocument();
  });

  it('should render correct amount of product-cards', () => {
    history.push(AppRoute.Catalog);
    render(fakeMainCatalog);

    expect(screen.getAllByTestId(/product-card/i)).toHaveLength(cardsPerPage);
  });
});
