import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { generatePath } from 'react-router-dom';
import HistoryRouter from '../../history-router/history-router';
import { makeFakeGuitarWithComment } from '../../../mocks/data-mocks';
import { ActiveModal } from '../../../settings/active-modal';
import { AppRoute } from '../../../settings/app-routes';
import ReviewSuccess from './review-success';
import { changeActiveModal } from '../../../store/interface-process/interface-process';
import userEvent from '@testing-library/user-event';


const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockGuitar = makeFakeGuitarWithComment();
history.push(generatePath(AppRoute.Product, {id: `${mockGuitar.id}`}));

const store = mockStore({
  DATA: {
    guitarByID: mockGuitar,
  },
  INTERFACE: {
    activeModal: ActiveModal.ReviewSuccess,
  },
});

const fakeReviewSuccess = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <ReviewSuccess />
    </HistoryRouter>
  </Provider>
);


describe('Renders review-success-component', () => {

  it('should render review-success container', () => {
    render(fakeReviewSuccess);

    expect(screen.getByTestId(/review-success-container/i)).toBeInTheDocument();
  });

  it('should render 2 buttons', () => {
    render(fakeReviewSuccess);

    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('should dispatch changeActiveModal when click on btn-"К покупкам!"', () => {
    render(fakeReviewSuccess);

    userEvent.click(screen.getByText(/К покупкам!/i));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(changeActiveModal.toString());
  });

  it('should dispatch changeActiveModal when click on button-cross', () => {
    render(fakeReviewSuccess);

    userEvent.click(screen.getByTestId(/button-cross/i));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(changeActiveModal.toString());
  });

  it('should dispatch changeActiveModal when click on overlay', () => {
    render(fakeReviewSuccess);

    userEvent.click(screen.getByTestId(/overlay/i));
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(changeActiveModal.toString());
  });
});
