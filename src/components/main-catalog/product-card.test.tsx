import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { makeFakeGuitar, makeFakeGuitars } from '../../mocks/data-mocks';
import HistoryRouter from '../history-route/history-route';
import { AppRoute } from '../../settings/app-routes';
import ProductCard from './product-card';

const mockStore = configureMockStore();

describe('Renders product-card-component', () => {
  const history = createMemoryHistory();
  const mockGuitars = makeFakeGuitars;

  it('should render product-card container', () => {
    history.push(AppRoute.Catalog);
    const guitarCard = makeFakeGuitar();

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
          <ProductCard guitar={guitarCard} key={guitarCard.id} commentsAmount={guitarCard.comments.length} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/product-card/i)).toBeInTheDocument();
  });

  it('should render correct image', () => {
    history.push(AppRoute.Catalog);
    const guitarCard = makeFakeGuitar();
    const imgNumber = guitarCard.previewImg.charAt(11);

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
          <ProductCard guitar={guitarCard} key={guitarCard.id} commentsAmount={guitarCard.comments.length} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/guitar-img/i)).toBeInTheDocument();
    expect(screen.getByTestId(/guitar-img/i)).toHaveAttribute('src', `img/content/catalog-product-${imgNumber}.jpg`);
  });

  it('should render correct rate-count', () => {
    history.push(AppRoute.Catalog);
    const guitarCard = makeFakeGuitar();

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
          <ProductCard guitar={guitarCard} key={guitarCard.id} commentsAmount={guitarCard.comments.length} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/rate-count/i)).toBeInTheDocument();
    expect(screen.getByTestId(/rate-count/i)).toHaveTextContent(`${guitarCard.comments.length}`);
  });

  it('should render 5 stars', () => {
    history.push(AppRoute.Catalog);
    const guitarCard = makeFakeGuitar();

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
          <ProductCard guitar={guitarCard} key={guitarCard.id} commentsAmount={guitarCard.comments.length} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getAllByTestId(/star/i)).toHaveLength(5);
  });

  it('should render correct guitar-name', () => {
    history.push(AppRoute.Catalog);
    const guitarCard = makeFakeGuitar();

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
          <ProductCard guitar={guitarCard} key={guitarCard.id} commentsAmount={guitarCard.comments.length} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/guitar-name/i)).toBeInTheDocument();
    expect(screen.getByTestId(/guitar-name/i)).toHaveTextContent(`${guitarCard.name}`);
  });

  it('should render correct price', () => {
    history.push(AppRoute.Catalog);
    const guitarCard = makeFakeGuitar();

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
          <ProductCard guitar={guitarCard} key={guitarCard.id} commentsAmount={guitarCard.comments.length} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/price/i)).toBeInTheDocument();
    expect(screen.getByTestId(/price/i)).toHaveTextContent(`${guitarCard.price}`);
  });

  it('should render buttons', () => {
    history.push(AppRoute.Catalog);
    const guitarCard = makeFakeGuitar();

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
          <ProductCard guitar={guitarCard} key={guitarCard.id} commentsAmount={guitarCard.comments.length} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
    expect(screen.getByText(/Купить/i)).toBeInTheDocument();
  });
});
