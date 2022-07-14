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
import CartAdd from './cart-add';
import { guitarTypeNames } from '../../settings/guitar-type-names';
import { addItemToCart } from '../../store/cart-process/cart-process';

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

const fakeCartAdd = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <CartAdd />
    </HistoryRouter>
  </Provider>
);


describe('Renders cart-add-component', () => {

  it('should render cart-add container on product page', () => {
    history.push(generatePath(AppRoute.Product, {id: `${mockGuitar.id}`}));
    render(fakeCartAdd);

    expect(screen.getByTestId(/cart-add-container/i)).toBeInTheDocument();
  });

  it('should render cart-add-success container on catalog page', () => {
    render(fakeCartAdd);

    expect(screen.getByTestId(/cart-add-container/i)).toBeInTheDocument();
  });

  it('should render correct image', () => {
    const imgNumber = mockGuitar.previewImg.charAt(11);
    render(fakeCartAdd);

    expect(screen.getByTestId('item-img')).toBeInTheDocument();
    expect(screen.getByTestId('item-img')).toHaveAttribute('src', `img/content/catalog-product-${imgNumber}.jpg`);
  });

  it('should render correct item-name', () => {
    render(fakeCartAdd);

    expect(screen.getByTestId('item-name')).toBeInTheDocument();
    expect(screen.getByTestId('item-name')).toHaveTextContent(`Гитара ${mockGuitar?.name}`);
  });

  it('should render correct item-vendor-code', () => {
    render(fakeCartAdd);

    expect(screen.getByTestId('item-vendor-code')).toBeInTheDocument();
    expect(screen.getByTestId('item-vendor-code')).toHaveTextContent(`Артикул: ${mockGuitar.vendorCode}`);
  });

  it('should render correct item-string-count', () => {
    render(fakeCartAdd);

    expect(screen.getByTestId('item-string-count')).toBeInTheDocument();
    expect(screen.getByTestId('item-string-count')).toHaveTextContent(`${guitarTypeNames[mockGuitar.type]}, ${mockGuitar.stringCount} струнная`);
  });

  it('should render correct item-price', () => {
    render(fakeCartAdd);

    expect(screen.getByTestId('item-price')).toBeInTheDocument();
    expect(screen.getByTestId('item-price')).toHaveTextContent(`${mockGuitar.price} ₽`);
  });

  it('should render buttons', () => {
    render(fakeCartAdd);

    expect(screen.getByTestId('add-btn')).toBeInTheDocument();
    expect(screen.getByTestId('cross-btn')).toBeInTheDocument();
  });

  it('should dispatch changeActiveModal when click on cross-btn', () => {
    render(fakeCartAdd);

    userEvent.click(screen.getByTestId('cross-btn'));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(changeActiveModal.toString());
  });

  it('should dispatch changeActiveModal and addItemToCart when click on add-btn', () => {
    render(fakeCartAdd);

    userEvent.click(screen.getByTestId('add-btn'));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(changeActiveModal.toString());
    expect(actions).toContain(addItemToCart.toString());
  });

  it('should dispatch changeActiveModal when click on overlay', () => {
    render(fakeCartAdd);

    userEvent.click(screen.getByTestId('overlay'));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(changeActiveModal.toString());
  });

});
