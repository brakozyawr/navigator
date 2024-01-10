import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';

import {store} from './store';
import App from './components/app/app';
import ErrorMessage from './components/error-message/error-message';
import {fetchParkingListAction, checkAuthAction} from './store/api-actions';


store.dispatch(fetchParkingListAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <ErrorMessage />
      <App />
    </Provider>
  </React.StrictMode>,
);
