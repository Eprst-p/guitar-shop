import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { makeFakeGuitarWithComment, makeFakeGuitarsWithComments, makeFakeComment } from '../../mocks/data-mocks';
import HistoryRouter from '../history-route/history-route';
import { AppRoute } from '../../settings/app-routes';
import { ActiveModal } from '../../settings/active-modal';
import { generatePath } from 'react-router-dom';
import Review from './review';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockGuitars = makeFakeGuitarsWithComments;
const mockGuitar = makeFakeGuitarWithComment();
history.push(generatePath(AppRoute.Product, {id: `${mockGuitar.id}`}));
const mockComment = makeFakeComment();

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

const fakeReview = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Review comment={mockComment} />
    </HistoryRouter>
  </Provider>
);

describe('Renders review-component', () => {

  it('should render review container', () => {
    render(fakeReview);

    expect(screen.getByTestId('review')).toBeInTheDocument();
  });

  it('should render correct review data', () => {
    render(fakeReview);

    expect(screen.getByTestId('user-name')).toHaveTextContent(mockComment.userName);
    expect(screen.getByTestId('advantage')).toHaveTextContent(mockComment.advantage);
    expect(screen.getByTestId('disadvantage')).toHaveTextContent(mockComment.disadvantage);
    expect(screen.getByTestId('comment')).toHaveTextContent(mockComment.comment);
  });

  it('should render correct date', () => {
    const date = new Date(mockComment.createAt);
    type optionsType = {
      day: 'numeric';
      month: 'long';
    }
    const options :optionsType = {day: 'numeric', month: 'long'};
    const dateInFormat = new Intl.DateTimeFormat('ru-RU', options).format(date);

    render(fakeReview);

    expect(screen.getByTestId('review-date')).toHaveTextContent(dateInFormat);
  });
});
