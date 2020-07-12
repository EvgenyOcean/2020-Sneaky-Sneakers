import React, { Component } from 'react';
import {DataContext} from '../Context';
import Product from '../components/Product';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import styles from './Home.module.scss';

class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      sneakersCatalog: [],
      loading: true,
      openModal: () => {},
    }
  }

  static contextType = DataContext;

  componentDidMount(){
    let {sneakersCatalog, loading, openModal} = this.context;
    if (loading) return; 
    this.setState({sneakersCatalog, loading, openModal});
  }

  componentDidUpdate(){
    let {sneakersCatalog, loading, openModal} = this.context;
    if (!this.state.loading) return; 
    this.setState({sneakersCatalog, loading, openModal});
  }

  render() {
    let content;
    let loading = this.state.loading;
    let sneakersCatalog = this.state.sneakersCatalog;
    if (loading){
      content = <h1>The data is coming...</h1>
    } else {
      content = sneakersCatalog.map(sneakers => <Product sneakers={sneakers} key={sneakers.id} handleClick={this.state.openModal}/>)
    }
    return (
      <section className={styles.main}>
        <Container>
          <Row>
            {content}
          </Row>
        </Container>
      </section>
    );
  }
}

export default Home;