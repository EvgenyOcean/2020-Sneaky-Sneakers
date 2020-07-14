import React, { Component } from 'react';
import {DataContext} from '../Context';
import Product from '../components/Product';
import Title from '../components/Title';

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
    // it's not gonna work here if we just check for this.state.loading, because context is responsible for inCart property change and onces the property's changed we compare this component's state to the context's one, thus starting rendering with new state. 
    // and yep, even though objects are tottaly different (due to the deep copy), render only handles the changes between virtualdom and actual dom. 
    if (this.state.sneakersCatalog === sneakersCatalog) return; 
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
          <Row className="justify-content-center mt-4">
            <Title title="our products" />
          </Row>
          <Row>
            {content}
          </Row>
        </Container>
      </section>
    );
  }
}

export default Home;