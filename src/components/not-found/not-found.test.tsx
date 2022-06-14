import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import NotFound from './not-found';

describe('Component: NotFound404', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <NotFound />
      </HistoryRouter>,
    );

    const titleElement = screen.getByText('Page not found');
    const linkElement = screen.getByText('Go to main page');

    expect(titleElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
