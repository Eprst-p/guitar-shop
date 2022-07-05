import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { makeFakeGuitarsWithComments } from '../../mocks/data-mocks';
import HistoryRouter from '../history-router/history-router';
import { AppRoute } from '../../settings/app-routes';
import Header from './header';
import userEvent from '@testing-library/user-event';
import MainCatalog from '../main-catalog/main-catalog';
import thunk from 'redux-thunk';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockGuitars = makeFakeGuitarsWithComments;
const history = createMemoryHistory();

const store = mockStore({
  DATA: {
    isDataLoaded: true,
    guitars: mockGuitars,
    searchedGuitars: [],
  },
  INTERFACE: {
    activePage: 1,
  },
});

const fakeHeader = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Header />
    </HistoryRouter>
  </Provider>
);


describe('Renders header-component', () => {

  it('should render header container on main-page', () => {
    history.push(AppRoute.Catalog);
    render(fakeHeader);

    expect(screen.getByTestId(/header/i)).toBeInTheDocument();
  });

  it('should render header container on cart-page', () => {
    history.push(AppRoute.Cart);
    render(fakeHeader);

    expect(screen.getByTestId(/header/i)).toBeInTheDocument();
  });


  it('should render header container on product-page', () => {
    history.push(AppRoute.Product);
    render(fakeHeader);

    expect(screen.getByTestId(/header/i)).toBeInTheDocument();
  });

  it('should redirect to main page when click on "Главная" navigation link', () => {
    history.push(AppRoute.Cart);
    render(fakeHeader);

    expect(screen.queryByTestId(/main-container/i)).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('nav-link-to-main'));

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainCatalog />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/main-container/i)).toBeInTheDocument();
  });

});
