import React, {useContext} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import Item from './pages/Item';
import Navbar from  './components/Navbar';
import ItemModal from './components/ItemModal';
import Cart from './pages/Cart';

import {DataContext} from './Context';

function App() {
  let {show, closeModal} = useContext(DataContext);

  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/:item" component={Item} />
      </Switch>
      <ItemModal show={show} onHide={closeModal}/>
    </>
  );
}

export default App;
