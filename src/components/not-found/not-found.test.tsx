import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../settings/app-routes';
import HistoryRouter from '../history-router/history-router';
import NotFound from './not-found';

const mockStore = configureMockStore();
const store = mockStore({});

describe('Component: NotFound404', () => {
  const history = createMemoryHistory();

  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <NotFound />
      </HistoryRouter>,
    );

    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText('Go to main page')).toBeInTheDocument();
  });

  it('when user click "Go to main page" should redirect', () => {
    history.push('/adasdasdasasd');
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path="*"
              element={<NotFound />}
            />
            <Route
              path={AppRoute.Catalog}
              element={<h1>Каталог</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    userEvent.click(screen.getByText(/Go to main page/i));

    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
  });
});
