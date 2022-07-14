import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { generatePath } from 'react-router-dom';
import HistoryRouter from '../history-router/history-router';
import { makeFakeComments, makeFakeGuitarsWithComments, makeFakeGuitarWithComment, makeGuitarIdiesFromMocks, makeItemsInCartFromMocks } from '../../mocks/data-mocks';
import { ActiveModal } from '../../settings/active-modal';
import { AppRoute } from '../../settings/app-routes';
import { changeActiveModal } from '../../store/interface-process/interface-process';
import userEvent from '@testing-library/user-event';
import { CouponStatus } from '../../settings/coupon-status';
import Cart from '../cart/cart';
import MainCatalog from '../main-catalog/main-catalog';
import CartAddSuccess from './cart-add-success';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const mockGuitar = makeFakeGuitarWithComment();
const mockComments = makeFakeComments;
const mockGuitars = makeFakeGuitarsWithComments;
history.push(generatePath(AppRoute.Catalog));

const store = mockStore({
  DATA: {
    isDataLoaded: true,
    guitars: mockGuitars,
    guitarByID: mockGuitar,
    commentsByID: mockComments,
  },
  INTERFACE: {
    activePage: 1,
    commentsShown: makeFakeComments,
    activeModal: ActiveModal.CartAddSuccess,
  },
  CART: {
    guitarsIDiesInCart: [],
    itemsInCart: [],
  },
});

const fakeCartAddSuccess = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <CartAddSuccess />
    </HistoryRouter>
  </Provider>
);


describe('Renders cart-add-success-component', () => {

  it('should render cart-add-success container on product page', () => {
    history.push(generatePath(AppRoute.Product, {id: `${mockGuitar.id}`}));
    render(fakeCartAddSuccess);

    expect(screen.getByTestId(/cart-add-success-container/i)).toBeInTheDocument();
  });

  it('should render cart-add-success container on catalog page', () => {
    render(fakeCartAddSuccess);

    expect(screen.getByTestId(/cart-add-success-container/i)).toBeInTheDocument();
  });

  it('should render buttons', () => {
    render(fakeCartAddSuccess);

    expect(screen.getByTestId('btn-to-cart')).toBeInTheDocument();
    expect(screen.getByTestId('btn-continue')).toBeInTheDocument();
    expect(screen.getByTestId('cross-btn')).toBeInTheDocument();
  });

  it('should dispatch changeActiveModal when click on cross-btn', () => {
    render(fakeCartAddSuccess);

    userEvent.click(screen.getByTestId('cross-btn'));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(changeActiveModal.toString());
  });

  it('should dispatch changeActiveModal when click on btn-to-cart', () => {
    render(fakeCartAddSuccess);

    userEvent.click(screen.getByTestId('btn-to-cart'));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(changeActiveModal.toString());
  });

  it('should dispatch changeActiveModal when click on btn-continue', () => {
    render(fakeCartAddSuccess);

    userEvent.click(screen.getByTestId('btn-continue'));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(changeActiveModal.toString());
  });

  it('should dispatch changeActiveModal when click on overlay', () => {
    render(fakeCartAddSuccess);

    userEvent.click(screen.getByTestId('overlay'));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(changeActiveModal.toString());
  });

  it('should redirect to Cart page when click on btn-to-cart', () => {
    render(fakeCartAddSuccess);
    history.push(generatePath(AppRoute.Product, {id: `${mockGuitar.id}`}));

    userEvent.click(screen.getByTestId('btn-to-cart'));

    const mockIdies = makeGuitarIdiesFromMocks();
    const mockItemsInCart = makeItemsInCartFromMocks();
    const discount = 25;

    const storeForCart = mockStore({
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
      <Provider store={storeForCart}>
        <HistoryRouter history={history}>
          <Cart />
        </HistoryRouter>
      </Provider>
    );

    render(fakeCart);

    expect(screen.getByTestId('cart-container')).toBeInTheDocument();
  });

  it('should redirect to Catalog page when click on btn-continue', () => {
    render(fakeCartAddSuccess);
    history.push(generatePath(AppRoute.Product, {id: `${mockGuitar.id}`}));

    userEvent.click(screen.getByTestId('btn-continue'));

    const fakeCatalog = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainCatalog />
        </HistoryRouter>
      </Provider>
    );

    render(fakeCatalog);

    expect(screen.getByTestId(/main-container/i)).toBeInTheDocument();
  });

});
