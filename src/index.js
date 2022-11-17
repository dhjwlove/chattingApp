import React from 'react';
import * as ReactDOM from "react-dom/client";
import App from './App';

const domContainer = document.querySelector("#root");

let root = ReactDOM.createRoot(domContainer);

root.render(<App/>);