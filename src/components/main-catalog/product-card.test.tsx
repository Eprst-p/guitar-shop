import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { makeFakeGuitarWithComment, makeFakeGuitarsWithComments, makeFakeComments } from '../../mocks/data-mocks';
import HistoryRouter from '../history-router/history-router';
import { AppRoute } from '../../settings/app-routes';
import ProductCard from './product-card';
import userEvent from '@testing-library/user-event';
import Product from '../product/product';
import { ActiveModal } from '../../settings/active-modal';
import thunk from 'redux-thunk';


const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockGuitars = makeFakeGuitarsWithComments;
history.push(AppRoute.Catalog);
const guitarCard = makeFakeGuitarWithComment();

const store = mockStore({
  DATA: {
    isDataLoaded: true,
    guitars: mockGuitars,
  },
  INTERFACE: {
    activePage: 1,
  },
});

const fakeProductCard = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <ProductCard guitar={guitarCard} key={guitarCard.id} commentsAmount={guitarCard.comments.length} />
    </HistoryRouter>
  </Provider>
);

describe('Renders product-card-component', () => {

  it('should render product-card container', () => {
    render(fakeProductCard);

    expect(screen.getByTestId(/product-card/i)).toBeInTheDocument();
  });

  it('should render correct image', () => {
    const imgNumber = guitarCard.previewImg.charAt(11);
    render(fakeProductCard);

    expect(screen.getByTestId(/guitar-img/i)).toBeInTheDocument();
    expect(screen.getByTestId(/guitar-img/i)).toHaveAttribute('src', `img/content/catalog-product-${imgNumber}.jpg`);
  });

  it('should render correct rate-count', () => {
    render(fakeProductCard);

    expect(screen.getByTestId(/rate-count/i)).toBeInTheDocument();
    expect(screen.getByTestId(/rate-count/i)).toHaveTextContent(`${guitarCard.comments.length}`);
  });

  it('should render 5 stars', () => {
    render(fakeProductCard);

    expect(screen.getAllByTestId(/star/i)).toHaveLength(5);
  });

  it('should render correct guitar-name', () => {
    render(fakeProductCard);

    expect(screen.getByTestId(/guitar-name/i)).toBeInTheDocument();
    expect(screen.getByTestId(/guitar-name/i)).toHaveTextContent(`${guitarCard.name}`);
  });

  it('should render correct price', () => {
    render(fakeProductCard);

    expect(screen.getByTestId(/price/i)).toBeInTheDocument();
    expect(screen.getByTestId(/price/i)).toHaveTextContent(`${guitarCard.price}`);
  });

  it('should render buttons', () => {
    render(fakeProductCard);

    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
    expect(screen.getByText(/Купить/i)).toBeInTheDocument();
  });

  it('should redirect to product page when click on "Подробнее" btn', () => {
    render(fakeProductCard);

    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();

    userEvent.click(screen.getByText(/Подробнее/i));
    const mockComments = makeFakeComments;
    const mockShownComments = mockComments.slice(0,5);
    const middlewares = [thunk];
    const mockStoreForProduct = configureMockStore(middlewares);

    const storeForProduct = mockStoreForProduct({
      DATA: {
        isDataLoaded: true,
        guitarsWithComments: mockGuitars,
        commentsByID: mockComments,
      },
      INTERFACE: {
        activePage: 1,
        commentsShown: mockShownComments,
        activeModal: ActiveModal.NoModal,
      },
    });

    render(
      <Provider store={storeForProduct}>
        <HistoryRouter history={history}>
          <Product />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/product-container/i)).toBeInTheDocument();
  });
});

