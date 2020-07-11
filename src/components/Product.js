import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {FaCartPlus} from 'react-icons/fa';

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import styles from './Product.module.scss';

class Product extends Component {
  render() {
    const {id, name, price, inCart, img} = this.props.sneakers;

    return (
      <Col xs={9} md={6} lg={3} className={styles.main + '  my-3 mx-auto'}>
        <Card className={styles.card}>
          <div className={"p-2 " + styles['img-container']}>
            <Link to={'/' + id}>
              <Card.Img variant="top" src={img} alt="product"/>
            </Link>
            <Button variant="primary" disabled={inCart} className={"text-capitalize " + styles.button} onClick={this.props.handleClick}>
              {inCart ? 'in cart' : <FaCartPlus/>}
            </Button>
          </div>

          <Card.Footer className={"d-flex justify-content-between align-items-center " + styles.footer}>
            <span className={styles.name}>{name}</span><span>{price}$</span>
          </Card.Footer>
        </Card>
      </Col>
    );
  }
}

export default Product;