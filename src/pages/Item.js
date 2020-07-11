import React, { Component } from 'react';
import { DataContext } from '../Context';

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
    let {sneakersCatalog, loading} = this.context;
    if (loading) return;
    let sneakers = sneakersCatalog.find(sneakers => sneakers.id === id);
    this.setState({sneakers, loading});
  }

  componentDidUpdate(){
    let id = +this.props.match.params.item;
    let {sneakersCatalog, loading} = this.context;
    if (!this.state.loading) return;
    let sneakers = sneakersCatalog.find(sneakers => sneakers.id === id);
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
      content = <h1>{sneakers.name}</h1>
    }
    return (
      <div>
        {content}
      </div>
    );
  }
}

export default Item;