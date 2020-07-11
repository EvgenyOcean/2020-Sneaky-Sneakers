import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import Item from './pages/Item';
import Navbar from  './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/:item" component={Item} />
      </Switch>
    </>
  );
}

export default App;
