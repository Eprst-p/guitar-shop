import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { makeFakeGuitars } from '../../mocks/data-mocks';
import HistoryRouter from '../history-route/history-route';
import { AppRoute } from '../../settings/app-routes';
import CatalogSort from './catalog-sort';

const mockStore = configureMockStore();

describe('Renders catalog-sort-component', () => {
  const history = createMemoryHistory();

  it('should render catalog-sort container', () => {
    const mockGuitars = makeFakeGuitars;
    history.push(AppRoute.Catalog);

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
          <CatalogSort />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/catalog-sort/i)).toBeInTheDocument();
  });
});
