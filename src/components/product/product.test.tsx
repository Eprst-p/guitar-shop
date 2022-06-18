import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { makeFakeComments, makeFakeGuitar, makeFakeGuitars } from '../../mocks/data-mocks';
import HistoryRouter from '../history-route/history-route';
import { AppRoute } from '../../settings/app-routes';
import Product from './product';
import { generatePath } from 'react-router-dom';
import { ActiveModal } from '../../settings/active-modal';
import thunk from 'redux-thunk';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const mockGuitars = makeFakeGuitars;
const mockGuitar = makeFakeGuitar();
const mockComments = makeFakeComments;
history.push(generatePath(AppRoute.Product, {id: `${mockGuitar.id}`}));

const store = mockStore({
  DATA: {
    isDataLoaded: true,
    guitarsWithComments: mockGuitars,
    guitarByID: mockGuitar,
    commentsByID: mockComments,
  },
  INTERFACE: {
    activePage: 1,
    commentsShown: makeFakeComments,
    activeModal: ActiveModal.NoModal,
  },
});

const fakeProduct = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Product />
    </HistoryRouter>
  </Provider>
);


describe('Renders product-component', () => {

  it('should render product container', () => {
    render(fakeProduct);

    expect(screen.getByTestId(/product-container/i)).toBeInTheDocument();
  });

  it('should render correct image', () => {
    const imgNumber = mockGuitar.previewImg.charAt(11);
    render(fakeProduct);

    expect(screen.getByTestId(/guitar-img/i)).toBeInTheDocument();
    expect(screen.getByTestId(/guitar-img/i)).toHaveAttribute('src', `img/content/catalog-product-${imgNumber}.jpg`);
  });

  it('should render 5 stars', () => {
    render(fakeProduct);

    expect(screen.getAllByTestId(/star/i)).toHaveLength(5);
  });

  it('should render correct rate-count', () => {
    render(fakeProduct);

    expect(screen.getByTestId(/rate-count/i)).toBeInTheDocument();
    expect(screen.getByTestId(/rate-count/i)).toHaveTextContent(`${mockComments.length}`);
  });

  it('should render correct guitar-name', () => {
    render(fakeProduct);

    expect(screen.getByTestId(/guitar-name/i)).toBeInTheDocument();
    expect(screen.getByTestId(/guitar-name/i)).toHaveTextContent(`${mockGuitar.name}`);
  });

  it('should render correct price', () => {
    render(fakeProduct);

    expect(screen.getByTestId(/price/i)).toBeInTheDocument();
    expect(screen.getByTestId(/price/i)).toHaveTextContent(`${mockGuitar.price}`);
  });
});
