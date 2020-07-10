import styled from 'styled-components';
import React from 'react';
import {DataContext} from '../Context';
import CartItem from '../components/CartItem';
import {surfing} from '../data';
import Partition from '../components/Partition';

class Cart extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      inCartItems: [], 
      loading: true,
      extraInfo: new WeakMap(),
      handleRemove: () => {},
    };
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }

  static contextType = DataContext;

  componentDidMount(){
    window.scrollTo(0,0);
    const {loading, inCartItems, handleRemove} = this.context;
    this.handleRemove = handleRemove;
    if (loading) return; 
    let extraInfo = new Map();
    for (let item of inCartItems){
      extraInfo.set(item, {
        requestAmount: 1, 
        get total(){return +item.price * this.requestAmount}
      })
    }
    this.setState({loading, inCartItems, extraInfo});
  }

  componentDidUpdate(){
    const {loading, inCartItems, handleRemove} = this.context;
    if (inCartItems === this.state.inCartItems) return;
    this.handleRemove = handleRemove;
    let oldExtraInfo = this.state.extraInfo;
    let extraInfo = new Map();
    for (let item of inCartItems){
      if (oldExtraInfo.has(item)){
        extraInfo.set(item, oldExtraInfo.get(item));
      } else {
        extraInfo.set(item, {
          requestAmount: 1, 
          get total(){return +item.price * this.requestAmount}
        })
      }
    }
    this.setState({loading, inCartItems, extraInfo});

  }

  handleQuantityChange(item, e){
    let target = e.target.closest('button');
    let extra = this.state.extraInfo;
    let inStock = +item.quantity;
    if (target.classList.contains('more')){
      if (extra.get(item).requestAmount + 1 > inStock) return; 
      extra.get(item).requestAmount = extra.get(item).requestAmount + 1;
    }else {
      if (extra.get(item).requestAmount === 1) return; 
      extra.get(item).requestAmount = extra.get(item).requestAmount - 1;
    }
    this.setState({extraInfo: extra});
  }

  render(){
    const items = this.state.inCartItems;
    const extraInfo = this.state.extraInfo;
    let content; 
    if (!items.length){
      content = (
        <div className="empty">
          <div className="empty-text">
            <h3>Your cart is currently empty.<br/>Go ahead and surf the market!</h3>
          </div>
          <div className="empty-img">
            <img src={surfing} alt="surfing"/>
          </div>
        </div>
      )
    } else {
      const subtotal = items.reduce((prev, current)=> prev + extraInfo.get(current).total ,0);
      console.log(extraInfo);
      content = (
        <CartDiv>
          <table>
            <thead>
              <tr>
                <th>Products</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => <CartItem item={item} quantity={extraInfo.get(item).requestAmount} total={extraInfo.get(item).total} handleQuantityChange={this.handleQuantityChange} key={item.path} handleRemove={this.handleRemove}/>)}
            </tbody>
          </table>
          <div className="divider">
            <Partition title="Safe Payment"/>
            <button className="btn clear" onClick={(e) => this.handleRemove(null, e)}>Clear the cart</button>
          </div>
          <div className="payment">
            <ul>
              <li>Subtotal: {subtotal}$</li>
              <li>Tax: {subtotal / 100 * 10}$</li>
              <li>Total: {subtotal + (subtotal / 100 * 10)}$</li>
            </ul>
            <button className="btn pay" type="button">Pay with Paypal</button>
          </div>
        </CartDiv>
      )
    }
    return content; 
  }
}

const CartDiv = styled.div`
  max-width: 1200px; 
  margin: 0 auto;
  padding: 0 1rem;
  margin-top: 2rem; 
  color: #4a4a4a;
  font-family: Montserrat-SemiBold, sans-serif; 

  table{
    width: 100%;
    table-layout: fixed;
    text-align: center;
    border-collapse: collapse;
  }

  thead{
    text-transform: uppercase;
    
    th{
      border-bottom: 1rem solid transparent; 
      background-clip: padding-box; 
    }
  }

  td{
    border-bottom: 5px solid #4a4a4a;
    padding: 0.7rem 0;
  }

  button{
    border: none;
    background: transparent;
    cursor: pointer;
  }

  .btn{
    text-transform: uppercase; 
    background: #C93636;
    border-radius: 14px;
    color: white;
    padding: 0 1rem;
  }

  .current-quantity{
    color: #4a4a4a; 
    border: 1px solid black;
    padding: 0.5rem;
  }

  .more, .less{
    svg{
      color: #4a4a4a;
    }
  }

  svg{
    vertical-align: bottom;
    font-size: 1.5rem;
    color: red;
  }


  img{
    width: 100px;
    height: 100px;
    object-fit: cover;
  }

  // Payment section
  
  .divider{
    color: white;
    display: flex;
    justify-content: space-between;
    margin: 2rem 0;

    div{
      flex-grow: 1;
      margin: 0;
    }

    button{
      margin-left: 3rem;
    }
  }

  .payment{

    ul{
      list-style-type: none;
      padding: 0;
      margin: 0;
    }

    li{
      margin-bottom: 0.8rem;
      font-size: 1.5rem;
    }

    button{
      padding: 1rem; 
      background: #FFBB0E;
    }
  }


  @media (max-width: 840px){
    tbody{
      display: grid; 
      grid-gap: 1rem;
      grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
    }
    thead{display: none};
    tr, td{
      display: block;
      border: none;
    }
    tr{
      border: 5px solid #4a4a4a;
    }

    .divider{
      flex-direction: column;
      align-items: center; 

      div{
        width: 100%; 
        margin-top: 1rem; 
        order: 1;
      }

      button{
        padding: 1rem; 
        order: 0;
        margin-left: 0;
      }
    }

    .payment{
      button{
        display: block;
        margin: 0 auto;
        margin-bottom: 1rem;
      }
    }
  }
`

export default Cart;