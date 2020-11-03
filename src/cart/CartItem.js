import React from 'react';
import { useDispatch } from 'react-redux';

import { asyncAddItemToCart,
         asyncRemoveItemFromCart } from './redux';

const CartItem = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <li>
      <div>
        <span>{product.name} * {product.size}</span>
        <button onClick={() => dispatch(asyncAddItemToCart(product.id))}>[+]</button>
        <button onClick={() => dispatch(asyncRemoveItemFromCart(product.id))}>[-]</button>
      </div>
    </li>
)}

export default CartItem;
