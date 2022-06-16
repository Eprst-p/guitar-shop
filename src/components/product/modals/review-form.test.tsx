import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { generatePath } from 'react-router-dom';
import HistoryRouter from '../../history-route/history-route';
import { makeFakeGuitarWithComment } from '../../../mocks/data-mocks';
import { ActiveModal } from '../../../settings/active-modal';
import { AppRoute } from '../../../settings/app-routes';
import ReviewForm from './review-form';

const mockStore = configureMockStore();

describe('Renders review-form-component', () => {
  const history = createMemoryHistory();
  const mockGuitar = makeFakeGuitarWithComment();
  history.push(generatePath(AppRoute.Product, {id: `${mockGuitar.id}`}));

  it('should render review-form container', () => {

    const store = mockStore({
      DATA: {
        guitarByID: mockGuitar,
      },
      INTERFACE: {
        activeModal: ActiveModal.ReviewForm,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewForm />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/reviews-form-container/i)).toBeInTheDocument();
  });

  it('should render fields and components in review-form', () => {

    const store = mockStore({
      DATA: {
        guitarByID: mockGuitar,
      },
      INTERFACE: {
        activeModal: ActiveModal.ReviewForm,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewForm />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
    expect(screen.getByTestId('guitar-name')).toHaveTextContent(mockGuitar.name);
    expect(screen.getByText(/Ваше Имя/i)).toBeInTheDocument();
    expect(screen.getByText(/Ваша Оценка/i)).toBeInTheDocument();
    expect(screen.getByText(/Достоинства/i)).toBeInTheDocument();
    expect(screen.getByText(/Недостатки/i)).toBeInTheDocument();
    expect(screen.getByText(/Комментарий/i)).toBeInTheDocument();
    expect(screen.queryByText(/Отправить отзыв/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Недостатки/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Заполните поле/i)).toHaveLength(5);
  });

});
