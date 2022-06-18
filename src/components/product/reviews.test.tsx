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
import userEvent from '@testing-library/user-event';
import { changeActiveModal, pushToCommentsShown } from '../../store/interface-process/interface-process';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockGuitars = makeFakeGuitarsWithComments;
const mockComments = makeFakeComments;
const mockShownComments = mockComments.slice(0,5);
const mockGuitar = makeFakeGuitarWithComment();
history.push(generatePath(AppRoute.Product, {id: `${mockGuitar.id}`}));

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

const fakeReviews = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Reviews comments={mockComments} />
    </HistoryRouter>
  </Provider>
);

describe('Renders reviews-component', () => {

  it('should render reviews container', () => {
    render(fakeReviews);

    expect(screen.getByTestId(/reviews-container/i)).toBeInTheDocument();
  });

  it('should render reviews buttons', () => {
    render(fakeReviews);

    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
    expect(screen.getByText(/Показать еще отзывы/i)).toBeInTheDocument();
    expect(screen.getByText(/Наверх/i)).toBeInTheDocument();
  });

  it('should render correct amount of reviews (equal to commentsShown length)', () => {
    render(fakeReviews);

    expect(screen.getAllByTestId('review')).toHaveLength(mockShownComments.length);
  });

  it('should NOT render add-more-reviews button, when commentsByID <= commentsShown', () => {
    const anotherStore = mockStore({
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

    const anotherFakeReviews = (
      <Provider store={anotherStore}>
        <HistoryRouter history={history}>
          <Reviews comments={mockComments} />
        </HistoryRouter>
      </Provider>
    );
    render(anotherFakeReviews);

    expect(screen.queryByText(/Показать еще отзывы/i)).not.toBeInTheDocument();
  });

  it('should dispatch changeActiveModal when click on "Оставить отзыв" btn', () => {
    render(fakeReviews);

    userEvent.click(screen.getByText(/Оставить отзыв/i));

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(changeActiveModal.toString());
  });

  it('should dispatch pushToCommentsShown when click on "Показать еще отзывы" btn', () => {
    render(fakeReviews);

    userEvent.click(screen.getByText(/Показать еще отзывы/i));

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(pushToCommentsShown.toString());
  });

});
