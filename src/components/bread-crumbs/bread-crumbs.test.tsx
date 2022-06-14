import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { makeFakeGuitars } from '../../mocks/data-mocks';
import BreadCrumbs from './bread-crumbs';
import HistoryRouter from '../history-route/history-route';
import { PageTitle } from '../../settings/page-title';
import { AppRoute } from '../../settings/app-routes';

const mockStore = configureMockStore();

describe('Renders bread-crumbs-component', () => {
  const history = createMemoryHistory();

  it('should render bread-crumbs ul-list', () => {
    const mockGuitars = makeFakeGuitars;
    history.push('/');

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
          <BreadCrumbs pageTittle={PageTitle.Catalog} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/ul_breadcrumbs/i)).toBeInTheDocument();
  });

  it('should render 2 bread-crumbs items on main page', () => {
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
          <BreadCrumbs pageTittle={PageTitle.Catalog} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getAllByTestId(/breadcrumbs__item/i)).toHaveLength(2);
  });

  it('should render 3 bread-crumbs items on cart-page', () => {
    const mockGuitars = makeFakeGuitars;
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
          <BreadCrumbs pageTittle={PageTitle.Cart} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getAllByTestId(/breadcrumbs__item/i)).toHaveLength(3);
  });

  it('should render 3 bread-crumbs items on product-page', () => {
    const mockGuitars = makeFakeGuitars;
    history.push(AppRoute.Cart);
    const guitarName = 'Some-guitar';

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
          <BreadCrumbs pageTittle={guitarName} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getAllByTestId(/breadcrumbs__item/i)).toHaveLength(3);
  });
});
