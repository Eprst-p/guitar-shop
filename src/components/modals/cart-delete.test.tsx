import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { generatePath } from 'react-router-dom';
import HistoryRouter from '../history-router/history-router';
import { makeFakeComments, makeFakeGuitarsWithComments, makeFakeGuitarWithComment } from '../../mocks/data-mocks';
import { ActiveModal } from '../../settings/active-modal';
import { AppRoute } from '../../settings/app-routes';
import { changeActiveModal } from '../../store/interface-process/interface-process';
import userEvent from '@testing-library/user-event';
import { guitarTypeNames } from '../../settings/guitar-type-names';
import { removeItemFromCart } from '../../store/cart-process/cart-process';
import CartDelete from './cart-delete';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockGuitar = makeFakeGuitarWithComment();
const mockComments = makeFakeComments;
const mockGuitars = makeFakeGuitarsWithComments;
mockGuitar.type = 'electric';
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

const fakeCartDelete = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <CartDelete />
    </HistoryRouter>
  </Provider>
);


describe('Renders cart-delete-component', () => {

  it('should render cart-delete container on product page', () => {
    history.push(generatePath(AppRoute.Product, {id: `${mockGuitar.id}`}));
    render(fakeCartDelete);

    expect(screen.getByTestId(/cart-delete-container/i)).toBeInTheDocument();
  });

  it('should render cart-add-success container on catalog page', () => {
    render(fakeCartDelete);

    expect(screen.getByTestId(/cart-delete-container/i)).toBeInTheDocument();
  });

  it('should render correct image', () => {
    const imgNumber = mockGuitar.previewImg.charAt(11);
    render(fakeCartDelete);

    expect(screen.getByTestId('item-img')).toBeInTheDocument();
    expect(screen.getByTestId('item-img')).toHaveAttribute('src', `img/content/catalog-product-${imgNumber}.jpg`);
  });

  it('should render correct item-name', () => {
    render(fakeCartDelete);

    expect(screen.getByTestId('item-name')).toBeInTheDocument();
    expect(screen.getByTestId('item-name')).toHaveTextContent(`Гитара ${mockGuitar?.name}`);
  });

  it('should render correct item-vendor-code', () => {
    render(fakeCartDelete);

    expect(screen.getByTestId('item-vendor-code')).toBeInTheDocument();
    expect(screen.getByTestId('item-vendor-code')).toHaveTextContent(`Артикул: ${mockGuitar.vendorCode}`);
  });

  it('should render correct item-string-count', () => {
    render(fakeCartDelete);

    expect(screen.getByTestId('item-string-count')).toBeInTheDocument();
    expect(screen.getByTestId('item-string-count')).toHaveTextContent(`${guitarTypeNames[mockGuitar.type]}, ${mockGuitar.stringCount} струнная`);
  });

  it('should render correct item-price', () => {
    render(fakeCartDelete);

    expect(screen.getByTestId('item-price')).toBeInTheDocument();
    expect(screen.getByTestId('item-price')).toHaveTextContent(`${mockGuitar.price} ₽`);
  });

  it('should render buttons', () => {
    render(fakeCartDelete);

    expect(screen.getByTestId('delete-btn')).toBeInTheDocument();
    expect(screen.getByTestId('cross-btn')).toBeInTheDocument();
    expect(screen.getByTestId('continue-btn')).toBeInTheDocument();
  });

  it('should dispatch changeActiveModal when click on cross-btn', () => {
    render(fakeCartDelete);

    userEvent.click(screen.getByTestId('cross-btn'));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(changeActiveModal.toString());
  });

  it('should dispatch changeActiveModal when click on continue-btn', () => {
    render(fakeCartDelete);

    userEvent.click(screen.getByTestId('continue-btn'));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(changeActiveModal.toString());
  });

  it('should dispatch changeActiveModal when click on overlay', () => {
    render(fakeCartDelete);

    userEvent.click(screen.getByTestId('overlay'));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(changeActiveModal.toString());
  });

  it('should dispatch changeActiveModal and removeItemFromCart when click on delete-btn', () => {
    render(fakeCartDelete);

    userEvent.click(screen.getByTestId('delete-btn'));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(changeActiveModal.toString());
    expect(actions).toContain(removeItemFromCart.toString());
  });

});
