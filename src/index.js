import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import DataContextProvider from './Context';


ReactDOM.render(
  <Router>
    <DataContextProvider>
      <App />
    </DataContextProvider>
  </Router>,
  document.getElementById('root')
);

