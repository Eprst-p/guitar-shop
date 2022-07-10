import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { generatePath } from 'react-router-dom';
import HistoryRouter from '../history-router/history-router';
import ModalReview from './modal-review';
import { makeFakeGuitarWithComment } from '../../mocks/data-mocks';
import { ActiveModal } from '../../settings/active-modal';
import { AppRoute } from '../../settings/app-routes';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockGuitar = makeFakeGuitarWithComment();
history.push(generatePath(AppRoute.Product, {id: `${mockGuitar.id}`}));

describe('Renders modal-review-component', () => {

  it('should NOT render review-success-container, when ActiveModal.NoModal', () => {
    const store = mockStore({
      INTERFACE: {
        activeModal: ActiveModal.NoModal,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalReview />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByTestId(/review-success-container/i)).not.toBeInTheDocument();
  });

  it('should NOT render review-form-container, when ActiveModal.NoModal', () => {
    const store = mockStore({
      INTERFACE: {
        activeModal: ActiveModal.NoModal,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalReview />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByTestId(/review-form-container/i)).not.toBeInTheDocument();
  });

  it('should render review-success-container, when ActiveModal.ReviewSuccess', () => {
    const store = mockStore({
      INTERFACE: {
        activeModal: ActiveModal.ReviewSuccess,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalReview />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/review-success-container/i)).toBeInTheDocument();
  });

  it('should render review-form-container, when ActiveModal.ReviewForm', () => {
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
          <ModalReview />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/review-form-container/i)).toBeInTheDocument();
  });
});
