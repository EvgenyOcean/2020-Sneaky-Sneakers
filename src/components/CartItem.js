import React from 'react';
import {FaRegTrashAlt, FaPlus, FaMinus} from 'react-icons/fa';

function CartItem({item, handleQuantityChange, quantity, total, handleRemove}) {
  return (
    <tr>
      <td><img src={item.imgs[2]} alt={item.name}/></td>
      <td>{item.name}</td>
      <td>{item.price}$</td>
      <td>
        <button type="button" className="less" onClick={(e) => handleQuantityChange(item, e)}><FaMinus/></button>
        <span className="current-quantity">{quantity}</span>
        <button type="button" className="more" onClick={(e) => handleQuantityChange(item, e)}><FaPlus/></button>
      </td>
      <td>{total}$</td> 
      <td><button type="button" className="remove" onClick={(e) => handleRemove(item, e)}><FaRegTrashAlt/></button></td> 
    </tr>
  );
}

export default CartItem;