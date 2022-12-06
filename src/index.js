import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import configureStore from './store';
import App from './App';
import services from './services';

services.forEach((service) => service.init());

const store = configureStore();
const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
