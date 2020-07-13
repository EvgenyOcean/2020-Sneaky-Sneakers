import React from 'react';
import {Link} from 'react-router-dom';
import NavbarDiv from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import styles from './Navbar.module.scss';

function Navbar(props) {
  return (
    <NavbarDiv className={'py-0 ' + styles.navbar}>
      <Container>
        <Link to="/" className="navbar-brand">
          <img src="/imgs/logo.svg" alt="SNEAKERS"/>
        </Link>
        <Link to="/cart" className={"btn btn-outline-warning p-1  " + styles.cart}>
          <img src="/imgs/cart.svg" alt="Cart"/>
          <span className="text-white">My cart</span>
        </Link>
      </Container>
    </NavbarDiv>
  );
}

export default Navbar;