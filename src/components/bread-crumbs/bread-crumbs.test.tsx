import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { makeFakeGuitar, makeFakeGuitarsWithComments } from '../../mocks/data-mocks';
import BreadCrumbs from './bread-crumbs';
import HistoryRouter from '../history-router/history-router';
import { PageTitle } from '../../settings/page-title';
import { AppRoute } from '../../settings/app-routes';
import { generatePath } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import MainCatalog from '../main-catalog/main-catalog';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const mockGuitars = makeFakeGuitarsWithComments;


const store = mockStore({
  DATA: {
    isDataLoaded: true,
    guitars: mockGuitars,
  },
  INTERFACE: {
    activePage: 1,
  },
});

describe('Renders bread-crumbs-component', () => {

  it('should render bread-crumbs ul-list', () => {
    history.push('/');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BreadCrumbs pageTittle={PageTitle.Catalog} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/ul_breadcrumbs/i)).toBeInTheDocument();
  });

  it('should render 2 bread-crumbs items on main page', () => {
    history.push(AppRoute.Catalog);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BreadCrumbs pageTittle={PageTitle.Catalog} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getAllByTestId(/breadcrumbs__item/i)).toHaveLength(2);
  });

  it('should render 3 bread-crumbs items on cart-page', () => {
    history.push(AppRoute.Cart);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BreadCrumbs pageTittle={PageTitle.Cart} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getAllByTestId(/breadcrumbs__item/i)).toHaveLength(3);
  });

  it('should render 3 bread-crumbs items on product-page', () => {
    const mockGuitar = makeFakeGuitar();
    history.push(generatePath(AppRoute.Product, {id: `${mockGuitar.id}`}));

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BreadCrumbs pageTittle={mockGuitar.name} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getAllByTestId(/breadcrumbs__item/i)).toHaveLength(3);
  });

  it('should redirect to main page when click on "Главная" link (from product page)', () => {
    const mockGuitar = makeFakeGuitar();
    history.push(generatePath(AppRoute.Product, {id: `${mockGuitar.id}`}));

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BreadCrumbs pageTittle={mockGuitar.name} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByTestId(/main-container/i)).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('link-to-main'));

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainCatalog />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/main-container/i)).toBeInTheDocument();
  });
});
