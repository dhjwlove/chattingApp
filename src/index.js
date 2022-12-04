import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import services from './services';

services.forEach((service) => service.init());

const domContainer = document.querySelector('#root');

const root = ReactDOM.createRoot(domContainer);

root.render(<App />);
