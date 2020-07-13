import React, { Component } from 'react';
import sneakersCatalog from './data';

export const DataContext = React.createContext();

class DataContextProvider extends Component {

  constructor(props){
    super(props);
    this.state = {
      sneakersCatalog: [], 
      inCartItems: [],
      loading: true,
      show: false,
      detailedSneakers: null
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
  }

  // just to imitate getting data from a server
  // and make a deep copy of the data, because usually you don't want to change the reference, what you wanna do is to create a deep copy (in case when there're object in an array obv);
  componentDidMount(){
    let deepCopyCatalog = [];
    for (let sneakers of sneakersCatalog){
      sneakers = {...sneakers};
      deepCopyCatalog = [...deepCopyCatalog, sneakers];
    }

    let inCartItems = this.manageInCart(deepCopyCatalog);
    this.setState({sneakersCatalog: deepCopyCatalog, loading: false, inCartItems});
  }

  // handle Cart click on the home page
  openModal(detailedSneakers){
    //because detailedSneakers is in the state, so we can't change it directly
    let tempDetailedSneakers = {...detailedSneakers, inCart: true};
    //this is the state itself, so also shouldn't be changed directly
    let tempCatalog = [];
    this.state.sneakersCatalog.forEach(sneakers => {
      let tempSneakers = {...sneakers}; 
      tempCatalog = [...tempCatalog, tempSneakers];
    })

    // find an index of the detailedSneakers in the catalog and using the index replace the item in the temp catalog, thus having inCart set to true, and then modify the state
    let detailedIndex = this.state.sneakersCatalog.indexOf(detailedSneakers); 
    tempCatalog.splice(detailedIndex, 1, tempDetailedSneakers);
    let inCartItems = this.manageInCart(tempCatalog);

    this.setState({show: true, detailedSneakers:tempDetailedSneakers, sneakersCatalog:tempCatalog, inCartItems});
  }

  closeModal(e){
    this.setState({show: false});
  }

  handleRemoveFromCart(removeItem, e){
    // which is not exactly correct, cuz there's a direct state change to a certain degree
    let target = e.target;
    let inCartItems = this.state.inCartItems;
    if (target.classList.contains('clear')){
      for (let item of inCartItems){
        item.inCart = false; 
      }
      inCartItems = [];
      this.setState({inCartItems});
    } else {
      removeItem.inCart = false; 
      inCartItems = inCartItems.filter(item => item !== removeItem);
      this.setState({inCartItems});
    }
  }


  // handle cart click on the item page
  // handleAddToCart(e){
  //   let target = e.target; 
  //   console.log(target);
  // }

  manageInCart(catalog){
    return catalog.filter(sneakers => sneakers.inCart);
  }

  render() {
    return (
      <DataContext.Provider value={{...this.state, openModal:this.openModal, closeModal:this.closeModal, handleRemove: this.handleRemoveFromCart}}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}

export default DataContextProvider;