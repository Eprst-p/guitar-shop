import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { makeFakeGuitarsWithComments } from '../../mocks/data-mocks';
import HistoryRouter from '../history-router/history-router';
import { AppRoute } from '../../settings/app-routes';
import { CouponStatus } from '../../settings/coupon-status';
import Promocode from './promocode';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockGuitars = makeFakeGuitarsWithComments;

const store = mockStore({
  DATA: {
    isDataLoaded: true,
    guitars: mockGuitars,
  },
  CART: {
    couponStatus: CouponStatus.Empty,
    couponName: null,
  },
});

const fakePromocode = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Promocode />
    </HistoryRouter>
  </Provider>
);


describe('Renders promocode-component', () => {
  history.push(AppRoute.Cart);

  it('should render coupon container', () => {
    render(fakePromocode);

    expect(screen.getByTestId('coupon-container')).toBeInTheDocument();
  });

  it('should render coupon elements', () => {
    render(fakePromocode);

    expect(screen.getByTestId('coupon-field')).toBeInTheDocument();
    expect(screen.getByTestId('coupon-btn')).toBeInTheDocument();
  });

  it('should NOT render messages, when coupon status is EMPTY', () => {
    render(fakePromocode);

    expect(screen.queryByTestId('message--success')).not.toBeInTheDocument();
    expect(screen.queryByTestId('message--error')).not.toBeInTheDocument();
  });

  it('should render messages-success, when coupon status is CORRECT', () => {
    const anotherStore = mockStore({
      DATA: {
        isDataLoaded: true,
        guitars: mockGuitars,
      },
      CART: {
        couponStatus: CouponStatus.Correct,
        couponName: null,
      },
    });

    const anotherFakePromocode = (
      <Provider store={anotherStore}>
        <HistoryRouter history={history}>
          <Promocode />
        </HistoryRouter>
      </Provider>
    );

    render(anotherFakePromocode);
    expect(screen.getByTestId('message--success')).toBeInTheDocument();
  });

  it('should render messages-error, when coupon status is ERROR', () => {
    const anotherStore = mockStore({
      DATA: {
        isDataLoaded: true,
        guitars: mockGuitars,
      },
      CART: {
        couponStatus: CouponStatus.Error,
        couponName: null,
      },
    });

    const anotherFakePromocode = (
      <Provider store={anotherStore}>
        <HistoryRouter history={history}>
          <Promocode />
        </HistoryRouter>
      </Provider>
    );

    render(anotherFakePromocode);
    expect(screen.getByTestId('message--error')).toBeInTheDocument();
  });

  it('should render Vasya in coupon-fiel, when typing "Vasya"', () => {
    render(fakePromocode);

    userEvent.type(screen.getByTestId('coupon-field'), 'Vasya');
    expect(screen.getByTestId('coupon-field')).toHaveValue('Vasya');
  });

  it('should render name Petya in coupon field, when name "Petya" is in store', () => {
    const anotherStore = mockStore({
      DATA: {
        isDataLoaded: true,
        guitars: mockGuitars,
      },
      CART: {
        couponStatus: CouponStatus.Empty,
        couponName: 'Petya',
      },
    });

    const anotherFakePromocode = (
      <Provider store={anotherStore}>
        <HistoryRouter history={history}>
          <Promocode />
        </HistoryRouter>
      </Provider>
    );

    render(anotherFakePromocode);
    expect(screen.getByTestId('coupon-field')).toHaveValue('Petya');
  });


});
