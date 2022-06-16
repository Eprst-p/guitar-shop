import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { generatePath } from 'react-router-dom';
import HistoryRouter from '../../history-route/history-route';
import { makeFakeGuitarWithComment } from '../../../mocks/data-mocks';
import { ActiveModal } from '../../../settings/active-modal';
import { AppRoute } from '../../../settings/app-routes';
import ReviewSuccess from './review-success';

const mockStore = configureMockStore();

describe('Renders review-success-component', () => {
  const history = createMemoryHistory();
  const mockGuitar = makeFakeGuitarWithComment();
  history.push(generatePath(AppRoute.Product, {id: `${mockGuitar.id}`}));

  it('should render review-success container', () => {

    const store = mockStore({
      DATA: {
        guitarByID: mockGuitar,
      },
      INTERFACE: {
        activeModal: ActiveModal.ReviewSuccess,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewSuccess />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/review-success-container/i)).toBeInTheDocument();
  });

  it('should render 2 buttons', () => {

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
          <ReviewSuccess />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

});
