import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router/history-router';
import { AppRoute } from '../../settings/app-routes';
import { makeFakeComments, makeFakeGuitar, makeFakeGuitarsWithComments } from '../../mocks/data-mocks';
import userEvent from '@testing-library/user-event';
import SearchForm from './search-form';
import thunk from 'redux-thunk';
import { ActiveModal } from '../../settings/active-modal';
import Product from '../product/product';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const mockGuitars = makeFakeGuitarsWithComments;

const store = mockStore({
  DATA: {
    isDataLoaded: true,
    guitars: mockGuitars,
    searchedGuitars: [],
  },
});

const storeWithSearched = mockStore({
  DATA: {
    isDataLoaded: true,
    guitars: mockGuitars,
    searchedGuitars: new Array(4).fill(null).map(() => makeFakeGuitar()),
  },
});

const fakeSearchFormEmpty = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <SearchForm />
    </HistoryRouter>
  </Provider>
);

const fakeSearchFormFill = (
  <Provider store={storeWithSearched}>
    <HistoryRouter history={history}>
      <SearchForm />
    </HistoryRouter>
  </Provider>
);


describe('Renders search-form-component', () => {
  history.push(AppRoute.Catalog);

  it('should render search-form container', () => {
    render(fakeSearchFormEmpty);

    expect(screen.getByTestId(/search-container/i)).toBeInTheDocument();
  });

  it('should type "Vasya" in search-field, when user typed "Vasya"', () => {
    render(fakeSearchFormEmpty);

    userEvent.type(screen.getByTestId(/search-field/i), 'Vasya');
    expect(screen.getByTestId(/search-field/i)).toHaveValue('Vasya');
  });

  it('should give class hidden to search-items, when searchedGuitars is empty', () => {
    render(fakeSearchFormEmpty);

    expect(screen.queryByTestId(/search-item-list/i)).toHaveClass('hidden');
  });

  it('should render 4 search-items, when searchedGuitars has length=4', () => {
    render(fakeSearchFormFill);

    expect(screen.getAllByTestId('search-item')).toHaveLength(4);
  });

  it('should redirect to product page when click on guitar in select-list', () => {
    render(fakeSearchFormFill);

    userEvent.click(screen.getAllByTestId(/search-item/i)[0]);
    const mockComments = makeFakeComments;
    const mockShownComments = mockComments.slice(0,5);

    const storeForProduct = mockStore({
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

  it('should clear search field (after typing) when click on cancel-btn', () => {
    render(fakeSearchFormFill);

    userEvent.type(screen.getByTestId(/search-field/i), 'Vasya');
    userEvent.click(screen.getByTestId(/cancel-btn/i));
    expect(screen.getByTestId(/search-field/i)).toHaveValue('');
  });

});
