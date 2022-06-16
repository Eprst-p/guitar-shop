import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './app';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { makeFakeGuitarsWithComments } from '../../mocks/data-mocks';
import { AppRoute } from '../../settings/app-routes';

const mockStore = configureMockStore();

describe('Renders app-component', () => {
  const history = createMemoryHistory();
  history.push(AppRoute.Catalog);

  it('should render Loading when data has NOT loaded', () => {

    const store = mockStore({
      DATA: {
        isDataLoaded: false,
      },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('should render Catalog when data has loaded', () => {
    const mockGuitars = makeFakeGuitarsWithComments;


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
        <App />
      </Provider>,
    );

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/Контакты/i)).toBeInTheDocument();
  });
});
