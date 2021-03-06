import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import browserHistory from './browser-history';
import App from './components/app/app';
import HistoryRouter from './components/history-router/history-router';
import { store } from './store';
import { fetchGuitarsWithQueryParams } from './store/api-actions';
import 'react-toastify/dist/ReactToastify.css';


const queryParams = '';
store.dispatch(fetchGuitarsWithQueryParams(queryParams));

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
