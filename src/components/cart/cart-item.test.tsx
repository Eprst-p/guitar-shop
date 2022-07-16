import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { makeFakeGuitarsWithComments, makeFakeGuitarWithComment, makeItemsInCartFromMocks } from '../../mocks/data-mocks';
import HistoryRouter from '../history-router/history-router';
import { AppRoute } from '../../settings/app-routes';
import CartItem from './cart-item';
import { guitarTypeNames } from '../../settings/guitar-type-names';
import userEvent from '@testing-library/user-event';
import { loadGuitarByID } from '../../store/data-process/data-process';
import { setItemQuantity } from '../../store/cart-process/cart-process';
import { changeActiveModal } from '../../store/interface-process/interface-process';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockGuitars = makeFakeGuitarsWithComments;
const mockItemsInCart = makeItemsInCartFromMocks();
const guitarCard = makeFakeGuitarWithComment();
guitarCard.type = 'electric';

const store = mockStore({
  DATA: {
    isDataLoaded: true,
    guitars: mockGuitars,
  },
  CART: {
    itemsInCart: mockItemsInCart,
  },
});

const fakeCartItem = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <CartItem guitar={guitarCard} key={guitarCard.id}/>
    </HistoryRouter>
  </Provider>
);


describe('Renders cart-item-component', () => {
  history.push(AppRoute.Cart);

  it('should render cart-item container', () => {
    render(fakeCartItem);

    expect(screen.getByTestId('cart-item')).toBeInTheDocument();
  });

  it('should render cross-btn', () => {
    render(fakeCartItem);

    expect(screen.getByTestId('cross-btn')).toBeInTheDocument();
  });

  it('should render correct image', () => {
    const imgNumber = guitarCard.previewImg.charAt(11);
    render(fakeCartItem);

    expect(screen.getByTestId('item-img')).toBeInTheDocument();
    expect(screen.getByTestId('item-img')).toHaveAttribute('src', `img/content/catalog-product-${imgNumber}.jpg`);
  });

  it('should render correct item-name', () => {
    render(fakeCartItem);

    expect(screen.getByTestId('item-name')).toBeInTheDocument();
    expect(screen.getByTestId('item-name')).toHaveTextContent(`${guitarTypeNames[guitarCard.type]} ${guitarCard.name}`);
  });

  it('should render correct item-vendor-code', () => {
    render(fakeCartItem);

    expect(screen.getByTestId('item-vendor-code')).toBeInTheDocument();
    expect(screen.getByTestId('item-vendor-code')).toHaveTextContent(`Артикул: ${guitarCard.vendorCode}`);
  });

  it('should render correct item-string-count', () => {
    render(fakeCartItem);

    expect(screen.getByTestId('item-string-count')).toBeInTheDocument();
    expect(screen.getByTestId('item-string-count')).toHaveTextContent(`${guitarTypeNames[guitarCard.type]}, ${guitarCard.stringCount} струнная`);
  });

  it('should render correct item-price', () => {
    render(fakeCartItem);

    expect(screen.getByTestId('item-price')).toBeInTheDocument();
    expect(screen.getByTestId('item-price')).toHaveTextContent(`${guitarCard.price} ₽`);
  });

  it('should render quantity elements', () => {
    render(fakeCartItem);

    expect(screen.getByTestId('quantity-less')).toBeInTheDocument();
    expect(screen.getByTestId('quantity-more')).toBeInTheDocument();
    expect(screen.getByTestId('quantity-field')).toBeInTheDocument();
    expect(screen.getByTestId('quantity-field')).toHaveValue(null);
  });

  it('should render 5 in quantity field, when typing "5"', () => {
    render(fakeCartItem);

    userEvent.type(screen.getByTestId('quantity-field'), '5');
    expect(screen.getByTestId('quantity-field')).toHaveValue(5);
  });

  it('should dispatch loadGuitarByID, setItemQuantity, changeActiveModal when click on cross-btn', () => {
    render(fakeCartItem);

    userEvent.click(screen.getByTestId('cross-btn'));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadGuitarByID.toString());
    expect(actions).toContain(setItemQuantity.toString());
    expect(actions).toContain(changeActiveModal.toString());
  });

  it('should dispatch loadGuitarByID, setItemQuantity, changeActiveModal when quantity=1 and click on quantity-less btn', () => {
    render(fakeCartItem);

    userEvent.click(screen.getByTestId('quantity-less'));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadGuitarByID.toString());
    expect(actions).toContain(setItemQuantity.toString());
    expect(actions).toContain(changeActiveModal.toString());
  });

  it('should change quantity to 1 when click on quantity more btn', () => {
    render(fakeCartItem);

    userEvent.click(screen.getByTestId('quantity-more'));
    expect(screen.getByTestId('quantity-field')).toHaveValue(1);
  });
});
