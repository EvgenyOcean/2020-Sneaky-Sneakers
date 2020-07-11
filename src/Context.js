import React, { Component } from 'react';
import sneakersCatalog from './data';

export const DataContext = React.createContext();

class DataContextProvider extends Component {

  constructor(props){
    super(props);
    this.state = {
      sneakersCatalog: [], 
      loading: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  // just to imitate getting data from a server
  componentDidMount(){
    this.setState({sneakersCatalog, loading: false});
  }

  // handle Cart click on the home page
  handleClick(e){
    let target = e.target; 
    console.log(target);
  }

  // handle cart click on the item page
  handleAddToCart(e){
    let target = e.target; 
    console.log(target);
  }

  render() {
    return (
      <DataContext.Provider value={{...this.state, handleAddToCart:this.handleAddToCart,handleClick:this.handleClick}}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}

export default DataContextProvider;