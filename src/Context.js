import React, { Component } from 'react';
import sneakersCatalog from './data';

export const DataContext = React.createContext();

class DataContextProvider extends Component {

  constructor(props){
    super(props);
    this.state = {
      sneakersCatalog: [], 
      loading: true,
      show: false,
      detailedSneakers: null
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  // just to imitate getting data from a server
  // and make a deep copy of the data, because usually you don't want to change the reference, what you wanna do is to create a deep copy (in case when there're object in an array obv);
  componentDidMount(){
    let deepCopyCatalog = [];
    for (let sneakers of sneakersCatalog){
      sneakers = {...sneakers};
      deepCopyCatalog = [...deepCopyCatalog, sneakers];
    }
    this.setState({sneakersCatalog: deepCopyCatalog, loading: false});
  }

  // handle Cart click on the home page
  openModal(detailedSneakers){
    this.setState({show: true, detailedSneakers});
  }

  closeModal(e){
    this.setState({show: false});
  }

  // handle cart click on the item page
  // handleAddToCart(e){
  //   let target = e.target; 
  //   console.log(target);
  // }

  render() {
    return (
      <DataContext.Provider value={{...this.state, openModal:this.openModal, closeModal:this.closeModal}}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}

export default DataContextProvider;