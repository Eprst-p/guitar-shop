import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { generatePath } from 'react-router-dom';
import HistoryRouter from '../../history-router/history-router';
import { makeFakeGuitarWithComment } from '../../../mocks/data-mocks';
import { ActiveModal } from '../../../settings/active-modal';
import { AppRoute } from '../../../settings/app-routes';
import ReviewForm from './review-form';
import userEvent from '@testing-library/user-event';
import { changeActiveModal } from '../../../store/interface-process/interface-process';
import thunk from 'redux-thunk';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const mockGuitar = makeFakeGuitarWithComment();
history.push(generatePath(AppRoute.Product, {id: `${mockGuitar.id}`}));

const store = mockStore({
  DATA: {
    guitarByID: mockGuitar,
  },
  INTERFACE: {
    activeModal: ActiveModal.ReviewForm,
  },
});

const fakeReviewForm = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <ReviewForm />
    </HistoryRouter>
  </Provider>
);


describe('Renders review-form-component', () => {

  it('should render review-form container', () => {
    render(fakeReviewForm);

    expect(screen.getByTestId(/review-form-container/i)).toBeInTheDocument();
  });

  it('should render fields and components in review-form', () => {
    render(fakeReviewForm);

    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
    expect(screen.getByTestId('guitar-name')).toHaveTextContent(mockGuitar.name);
    expect(screen.getByText(/Ваше Имя/i)).toBeInTheDocument();
    expect(screen.getByText(/Ваша Оценка/i)).toBeInTheDocument();
    expect(screen.getByText(/Достоинства/i)).toBeInTheDocument();
    expect(screen.getByText(/Недостатки/i)).toBeInTheDocument();
    expect(screen.getByText(/Комментарий/i)).toBeInTheDocument();
    expect(screen.queryByText(/Отправить отзыв/i)).not.toBeInTheDocument();
    expect(screen.getAllByText(/Заполните поле/i)).toHaveLength(5);
    expect(screen.getAllByRole('radio')).toHaveLength(5);
  });

  it('should dispatch changeActiveModal when click on button-cross', () => {
    render(fakeReviewForm);

    userEvent.click(screen.getByTestId(/button-cross/i));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(changeActiveModal.toString());
  });

  it('should dispatch changeActiveModal when click on overlay', () => {
    render(fakeReviewForm);

    userEvent.click(screen.getByTestId(/overlay/i));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(changeActiveModal.toString());
  });

  it('should change name input value to Vasya, when typing Vasya', () => {
    render(fakeReviewForm);

    expect(screen.getByLabelText(/Ваше Имя/i)).toHaveValue('');
    userEvent.type(screen.getByLabelText(/Ваше Имя/i), 'Vasya');
    expect(screen.getByLabelText(/Ваше Имя/i)).toHaveValue('Vasya');
  });

  it('should change advantage input value to Greater good, when typing Greater good', () => {
    render(fakeReviewForm);

    expect(screen.getByLabelText(/Достоинства/i)).toHaveValue('');
    userEvent.type(screen.getByLabelText(/Достоинства/i), 'Greater good');
    expect(screen.getByLabelText(/Достоинства/i)).toHaveValue('Greater good');
  });

  it('should change disadvantage input value to Worstest worse, when typing Worstest worse', () => {
    render(fakeReviewForm);

    expect(screen.getByLabelText(/Недостатки/i)).toHaveValue('');
    userEvent.type(screen.getByLabelText(/Недостатки/i), 'Worstest worse');
    expect(screen.getByLabelText(/Недостатки/i)).toHaveValue('Worstest worse');
  });

  it('should change comment input value to It is not a guitar, it is a piano, when typing It is not a guitar, it is a piano', () => {
    render(fakeReviewForm);

    expect(screen.getByLabelText(/Комментарий/i)).toHaveValue('');
    userEvent.type(screen.getByLabelText(/Комментарий/i), 'It is not a guitar, it is a piano');
    expect(screen.getByLabelText(/Комментарий/i)).toHaveValue('It is not a guitar, it is a piano');
  });

  it('should check first star and remove one "Заполните поле" from form', () => {
    render(fakeReviewForm);

    userEvent.click(screen.getAllByRole('radio')[0]);
    expect(screen.getAllByText(/Заполните поле/i)).toHaveLength(4);
  });


  it('should render "Отправить отзыв" and remove all "Заполните поле, when filling all fields in form"', () => {
    render(fakeReviewForm);

    userEvent.type(screen.getByLabelText(/Ваше Имя/i), 'Vasya');
    userEvent.type(screen.getByLabelText(/Достоинства/i), 'Greater good');
    userEvent.type(screen.getByLabelText(/Недостатки/i), 'Worstest worse');
    userEvent.type(screen.getByLabelText(/Комментарий/i), 'It is not a guitar, it is a piano');
    userEvent.click(screen.getAllByRole('radio')[0]);

    expect(screen.queryAllByText(/Заполните поле/i)).toHaveLength(0);
    expect(screen.getByText(/Отправить отзыв/i)).toBeInTheDocument();
  });

  it('should dispatch changeActiveModal when submit form by btn "Отправить отзыв" (no api check here)', () => {
    render(fakeReviewForm);

    userEvent.type(screen.getByLabelText(/Ваше Имя/i), 'Vasya');
    userEvent.type(screen.getByLabelText(/Достоинства/i), 'Greater good');
    userEvent.type(screen.getByLabelText(/Недостатки/i), 'Worstest worse');
    userEvent.type(screen.getByLabelText(/Комментарий/i), 'It is not a guitar, it is a piano');
    userEvent.click(screen.getAllByRole('radio')[0]);

    userEvent.click(screen.getByText(/Отправить отзыв/i));

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(changeActiveModal.toString());
  });
});
