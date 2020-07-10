import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import Navbar from  './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </>
  );
}

export default App;
