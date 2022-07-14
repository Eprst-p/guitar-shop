import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { makeFakeGuitarsWithComments, makeGuitarIdiesFromMocks, makeItemsInCartFromMocks } from '../../mocks/data-mocks';
import HistoryRouter from '../history-router/history-router';
import { AppRoute } from '../../settings/app-routes';
import Cart from './cart';
import { CouponStatus } from '../../settings/coupon-status';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockGuitars = makeFakeGuitarsWithComments;
const mockIdies = makeGuitarIdiesFromMocks();
const mockItemsInCart = makeItemsInCartFromMocks();
const guitarsInCart = mockGuitars.filter((guitar) => mockIdies.includes(guitar.id));
const discount = 25;
const calculateTotalPrice = () => {
  let totalPrice = 0;
  guitarsInCart.forEach((guitar)=>{
    const currentItem = mockItemsInCart.find((item) => item.id === guitar.id);
    if (currentItem) {
      totalPrice += guitar.price * currentItem.quantity;
    }
  });
  return totalPrice;
};
const totalPrice = calculateTotalPrice();
const discountValue = calculateTotalPrice() * discount/100;
const resultPrice = calculateTotalPrice() - discountValue;


const store = mockStore({
  DATA: {
    isDataLoaded: true,
    guitars: mockGuitars,
  },
  INTERFACE: {
    activePage: 1,
  },
  CART: {
    guitarsIDiesInCart: mockIdies,
    discount: discount,
    itemsInCart: mockItemsInCart,
    couponStatus: CouponStatus.Empty,
    couponName: null,
  },
});

const fakeCart = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Cart />
    </HistoryRouter>
  </Provider>
);


describe('Renders cart-component', () => {
  history.push(AppRoute.Cart);

  it('should render cart container', () => {
    render(fakeCart);

    expect(screen.getByTestId('cart-container')).toBeInTheDocument();
  });

  it('should render total-info div', () => {
    render(fakeCart);

    expect(screen.getByTestId(/total-info/i)).toBeInTheDocument();
  });

  it('should NOT render cart-items, when no guitarsIdies in store', () => {
    const anotherStore = mockStore({
      DATA: {
        isDataLoaded: true,
        guitars: mockGuitars,
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

    const anotherFakeCart = (
      <Provider store={anotherStore}>
        <HistoryRouter history={history}>
          <Cart />
        </HistoryRouter>
      </Provider>
    );
    render(anotherFakeCart);

    expect(screen.queryByTestId('cart-item')).not.toBeInTheDocument();
  });

  it('should render correct amount of cart-items (10)', () => {
    render(fakeCart);

    expect(screen.getAllByTestId('cart-item')).toHaveLength(10);
  });

  it('should render correct total price before discount', () => {
    render(fakeCart);

    expect(screen.getByTestId('total-value')).toBeInTheDocument();
    expect(screen.getByTestId('total-value')).toHaveTextContent(`${totalPrice} ₽`);
  });

  it('should render correct discount value', () => {
    render(fakeCart);

    expect(screen.getByTestId('discount')).toBeInTheDocument();
    expect(screen.getByTestId('discount')).toHaveTextContent(`- ${discountValue} ₽`);
  });

  it('should render correct total-payment value', () => {
    render(fakeCart);

    expect(screen.getByTestId('total-payment')).toBeInTheDocument();
    expect(screen.getByTestId('total-payment')).toHaveTextContent(`${resultPrice} ₽`);
  });

});
