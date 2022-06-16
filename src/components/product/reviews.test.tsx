import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { makeFakeComments, makeFakeGuitarWithComment, makeFakeGuitarsWithComments } from '../../mocks/data-mocks';
import HistoryRouter from '../history-route/history-route';
import { AppRoute } from '../../settings/app-routes';
import Reviews from './reviews';
import { ActiveModal } from '../../settings/active-modal';
import { generatePath } from 'react-router-dom';

const mockStore = configureMockStore();

describe('Renders reviews-component', () => {
  const history = createMemoryHistory();
  const mockGuitars = makeFakeGuitarsWithComments;
  const mockComments = makeFakeComments;
  const mockShownComments = mockComments.slice(0,5);
  const mockGuitar = makeFakeGuitarWithComment();
  history.push(generatePath(AppRoute.Product, {id: `${mockGuitar.id}`}));

  it('should render reviews container', () => {

    const store = mockStore({
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
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Reviews comments={mockComments} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/reviews-container/i)).toBeInTheDocument();
  });

  it('should render reviews buttons', () => {

    const store = mockStore({
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
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Reviews comments={mockComments} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
    expect(screen.getByText(/Показать еще отзывы/i)).toBeInTheDocument();
    expect(screen.getByText(/Наверх/i)).toBeInTheDocument();
  });

  it('should NOT render add-more-reviews button, when commentsByID <= commentsShown', () => {

    const store = mockStore({
      DATA: {
        isDataLoaded: true,
        guitarsWithComments: mockGuitars,
        commentsByID: mockComments,
      },
      INTERFACE: {
        activePage: 1,
        commentsShown: mockComments,
        activeModal: ActiveModal.NoModal,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Reviews comments={mockComments} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/Показать еще отзывы/i)).not.toBeInTheDocument();
  });

  it('should render correct amount of reviews (equal to commentsShown length)', () => {

    const store = mockStore({
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
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Reviews comments={mockComments} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getAllByTestId('review')).toHaveLength(mockShownComments.length);
  });
});
