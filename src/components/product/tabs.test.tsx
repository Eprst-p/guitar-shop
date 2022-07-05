import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { makeFakeGuitarWithComment, makeFakeGuitarsWithComments } from '../../mocks/data-mocks';
import HistoryRouter from '../history-router/history-router';
import { AppRoute } from '../../settings/app-routes';
import { ActiveModal } from '../../settings/active-modal';
import { generatePath } from 'react-router-dom';
import Tabs from './tabs';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockGuitars = makeFakeGuitarsWithComments;
const mockGuitar = makeFakeGuitarWithComment();
history.push(generatePath(AppRoute.Product, {id: `${mockGuitar.id}`}));

const store = mockStore({
  DATA: {
    isDataLoaded: true,
    guitars: mockGuitars,
  },
  INTERFACE: {
    activePage: 1,
    activeModal: ActiveModal.NoModal,
  },
});

const fakeTabs = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Tabs guitar={mockGuitar} />
    </HistoryRouter>
  </Provider>
);


describe('Renders tabs-component', () => {

  it('should render tabs container', () => {
    render(fakeTabs);

    expect(screen.getByTestId('tabs-container')).toBeInTheDocument();
  });

  it('should render tab links', () => {
    render(fakeTabs);

    expect(screen.getByText('Характеристики')).toBeInTheDocument();
    expect(screen.getByText('Описание')).toBeInTheDocument();
  });

  it('should render correct characteristics', () => {
    render(fakeTabs);

    expect(screen.getByTestId('characteristics')).toBeInTheDocument();
    expect(screen.getByTestId('vendor-code')).toHaveTextContent(mockGuitar.vendorCode);
    expect(screen.getByTestId('string-count')).toHaveTextContent(`${mockGuitar.stringCount} струнная`);
    expect(screen.getByText('Артикул:')).toBeInTheDocument();
    expect(screen.getByText('Тип:')).toBeInTheDocument();
    expect(screen.getByText('Количество струн:')).toBeInTheDocument();
  });

  it('should render correct description', () => {
    render(fakeTabs);

    expect(screen.getByTestId('description')).toHaveTextContent(mockGuitar.description);
  });

  it('description should has class hidden, and characteristics has not hidden, as default', () => {
    render(fakeTabs);

    expect(screen.getByTestId('description')).toHaveClass('hidden');
    expect(screen.getByTestId('characteristics-table')).not.toHaveClass('hidden');
  });

  it('should remove class hidden for description, and add class hidden for characteristics, when click on "Описание" link', () => {
    render(fakeTabs);

    userEvent.click(screen.getByText('Описание'));

    expect(screen.getByTestId('description')).not.toHaveClass('hidden');
    expect(screen.getByTestId('characteristics-table')).toHaveClass('hidden');
  });

  it('should return back classes, when click on "Описание" link, and then click on "Характеристики" link', () => {
    render(fakeTabs);

    userEvent.click(screen.getByText('Описание'));
    userEvent.click(screen.getByText('Характеристики'));

    expect(screen.getByTestId('description')).toHaveClass('hidden');
    expect(screen.getByTestId('characteristics-table')).not.toHaveClass('hidden');
  });
});
