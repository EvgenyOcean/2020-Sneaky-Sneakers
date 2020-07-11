import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import DataContextProvider from './Context';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <DataContextProvider>
        <App />
      </DataContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

