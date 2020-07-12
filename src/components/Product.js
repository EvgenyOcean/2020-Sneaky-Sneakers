import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {FaCartPlus} from 'react-icons/fa';

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import styles from './Product.module.scss';

class Product extends Component {
  constructor(props){
    super(props);
    this.state = {
      hovering: false,
    }
  }

  render() {
    const {id, name, price, inCart, img} = this.props.sneakers;
    let hoverClass = this.state.hovering && styles.hovering;
    let finalClasses = ['my-3 mx-auto', styles.main, hoverClass].join(' ');
    return (
      <Col xs={9} md={6} lg={3} className={finalClasses}>
        <Card className={styles.card}>
          <div className={"p-2 " + styles['img-container']}>
            <Link to={'/' + id}>
              <Card.Img variant="top" src={img} alt="product"/>
            </Link>
            <div className={styles.price}>{price}$</div>
          </div>

          <Card.Footer className={"d-flex justify-content-between align-items-center px-2 " + styles.footer}>
            <span className={styles.name}>{name}</span>
            <Button variant="outline-primary" disabled={inCart} className={"text-capitalize py-1 " + styles.button} onClick={this.props.handleClick.bind(null, this.props.sneakers)}>
              {inCart ? 'in cart' : <FaCartPlus/>}
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    );
  }
}

export default Product;