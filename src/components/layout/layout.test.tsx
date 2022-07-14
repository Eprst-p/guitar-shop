import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { makeFakeGuitarsWithComments } from '../../mocks/data-mocks';
import HistoryRouter from '../history-router/history-router';
import { AppRoute } from '../../settings/app-routes';
import Layout from './layout';
import { CouponStatus } from '../../settings/coupon-status';


const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockGuitars = makeFakeGuitarsWithComments;

const store = mockStore({
  DATA: {
    isDataLoaded: true,
    guitars: mockGuitars,
    searchedGuitars: [],
  },
  INTERFACE: {
    activePage: 1,
  },
  CART: {
    guitarsIDiesInCart: [],
    discount: 0,
    itemsInCart: [],
    couponStatus: CouponStatus.Empty,
    couponName: null,
  },
});

const fakeLayout = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Layout />
    </HistoryRouter>
  </Provider>
);


describe('Renders layout-component', () => {

  it('should render layout container on main-page', () => {
    history.push(AppRoute.Catalog);

    render(fakeLayout);

    expect(screen.getByTestId(/layout/i)).toBeInTheDocument();
  });

  it('should render layout container on cart-page', () => {
    history.push(AppRoute.Cart);

    render(fakeLayout);

    expect(screen.getByTestId(/layout/i)).toBeInTheDocument();
  });

  it('should render layout container on product-page', () => {
    history.push(AppRoute.Product);

    render(fakeLayout);

    expect(screen.getByTestId(/layout/i)).toBeInTheDocument();
  });

});
