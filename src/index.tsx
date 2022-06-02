import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { store } from './store';
import { fetchGuitars } from './store/api-actions';

store.dispatch(fetchGuitars());


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'));
