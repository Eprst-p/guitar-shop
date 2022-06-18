import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { makeFakeGuitarsWithComments } from '../../mocks/data-mocks';
import HistoryRouter from '../history-route/history-route';
import { AppRoute } from '../../settings/app-routes';
import Cart from './cart';

const mockStore = configureMockStore();

describe('Renders cart-component', () => {
  const history = createMemoryHistory();

  it('should render cart container', () => {
    const mockGuitars = makeFakeGuitarsWithComments;
    history.push(AppRoute.Cart);

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
          <Cart />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/cart/i)).toBeInTheDocument();
  });
});
