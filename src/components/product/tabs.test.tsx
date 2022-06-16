import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { makeFakeGuitarWithComment, makeFakeGuitarsWithComments } from '../../mocks/data-mocks';
import HistoryRouter from '../history-route/history-route';
import { AppRoute } from '../../settings/app-routes';
import { ActiveModal } from '../../settings/active-modal';
import { generatePath } from 'react-router-dom';
import Tabs from './tabs';

const mockStore = configureMockStore();

describe('Renders tabs-component', () => {
  const history = createMemoryHistory();
  const mockGuitars = makeFakeGuitarsWithComments;
  const mockGuitar = makeFakeGuitarWithComment();
  history.push(generatePath(AppRoute.Product, {id: `${mockGuitar.id}`}));

  it('should render tabs container', () => {

    const store = mockStore({
      DATA: {
        isDataLoaded: true,
        guitarsWithComments: mockGuitars,
      },
      INTERFACE: {
        activePage: 1,
        activeModal: ActiveModal.NoModal,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Tabs guitar={mockGuitar} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('tabs-container')).toBeInTheDocument();
  });

  it('should render tab links', () => {

    const store = mockStore({
      DATA: {
        isDataLoaded: true,
        guitarsWithComments: mockGuitars,
      },
      INTERFACE: {
        activePage: 1,
        activeModal: ActiveModal.NoModal,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Tabs guitar={mockGuitar} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Характеристики')).toBeInTheDocument();
    expect(screen.getByText('Описание')).toBeInTheDocument();
  });

  it('should render correct characteristics', () => {

    const store = mockStore({
      DATA: {
        isDataLoaded: true,
        guitarsWithComments: mockGuitars,
      },
      INTERFACE: {
        activePage: 1,
        activeModal: ActiveModal.NoModal,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Tabs guitar={mockGuitar} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('characteristics')).toBeInTheDocument();
    expect(screen.getByTestId('vendor-code')).toHaveTextContent(mockGuitar.vendorCode);
    expect(screen.getByTestId('string-count')).toHaveTextContent(`${mockGuitar.stringCount} струнная`);
    expect(screen.getByText('Артикул:')).toBeInTheDocument();
    expect(screen.getByText('Тип:')).toBeInTheDocument();
    expect(screen.getByText('Количество струн:')).toBeInTheDocument();
  });

  it('should render correct description', () => {

    const store = mockStore({
      DATA: {
        isDataLoaded: true,
        guitarsWithComments: mockGuitars,
      },
      INTERFACE: {
        activePage: 1,
        activeModal: ActiveModal.NoModal,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Tabs guitar={mockGuitar} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('description')).toHaveTextContent(mockGuitar.description);
  });
});
