import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { makeFakeGuitarsWithComments } from '../../mocks/data-mocks';
import HistoryRouter from '../history-route/history-route';
import { AppRoute } from '../../settings/app-routes';
import CatalogFilter from './catalog-filter';

const mockStore = configureMockStore();

describe('Renders catalog-filter-component', () => {
  const history = createMemoryHistory();

  it('should render catalog-filter form', () => {
    const mockGuitars = makeFakeGuitarsWithComments;
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
          <CatalogFilter />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/form-catalog-filter/i)).toBeInTheDocument();
  });
});
