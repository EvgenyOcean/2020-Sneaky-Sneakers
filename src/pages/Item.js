import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { DataContext } from '../Context';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import styles from './Item.module.scss';

class Item extends Component {
  constructor(props){
    super(props);
    this.state = {
      sneakers: null,
      loading: true,
    }
  }

  static contextType = DataContext;

  componentDidMount(){
    let id = +this.props.match.params.item;
    let {sneakersCatalog, loading, handleAddToCart} = this.context;
    if (loading) return;
    this.handleAddToCart = handleAddToCart;
    let sneakers = sneakersCatalog.find(sneakers => sneakers.id === id);
    this.setState({sneakers, loading});
  }

  componentDidUpdate(){
    let id = +this.props.match.params.item;
    let {sneakersCatalog, loading, handleAddToCart} = this.context;
    //assuing sneakersCatalog never empty
    //so you need to take seriously condition in componentDidUpdate everytime
    let sneakers = sneakersCatalog.find(sneakers => sneakers.id === id);
    if (sneakers === this.state.sneakers) return;
    this.handleAddToCart = handleAddToCart;
    this.setState({sneakers, loading});
  }

  render() {
    let content; 
    let sneakers = this.state.sneakers;
    let loading = this.state.loading;

    if (loading){
      return <h1>Data is comming</h1>
    }

    if (!sneakers){
      content = <h1>Sorry, the item does not exist!</h1>
    } else {
      content = (
        <Container className="my-4">
          <Row>
            <Col>
              <h2 className={"text-center mb-4 " + styles.title}>{sneakers.name}</h2>
            </Col>
          </Row>

          <Row className="mx-auto">
            <Col md={6}>
              <img src={sneakers.img} className={"mr-3 mb-sm-2 " + styles.img} alt={sneakers.name} />
            </Col>
            <Col md={6}>
              <div className={styles.media}>
                <div className="media-body">
                <div className={styles.brand}>Brand: {sneakers.brand}</div>
                <div className={styles.price}>Price: {sneakers.price}</div>
                <div className={styles.size}>Size: {sneakers.size}</div>
                  <h5 className={styles.info}>some info about product</h5>
                  <div className={styles.text}>
                    {sneakers.description}
                  </div>
                  <div className={styles.btns}>
                    <Link to='/' className="btn btn-outline-primary">Back To Products</Link>
                    <Button variant={sneakers.inCart ? 'outline-danger' : 'outline-success'} onClick={(e) => this.handleAddToCart(sneakers, e)}>
                      {sneakers.inCart ? 'Remove' : 'Add To Cart'}
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      )
    }
    return (
      <div>
        {content}
      </div>
    );
  }
}

export default Item;