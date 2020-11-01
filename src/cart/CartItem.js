import React from 'react';
import { useDispatch } from 'react-redux';
import { asyncRemoveItemFromCart } from './redux';

const CartItem = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <li>
      <div>
        <span>{product.name} * {/* count */}</span>
        <button onClick={() => dispatch(asyncRemoveItemFromCart(product.id))}>-</button>
      </div>
    </li>
)}

export default CartItem;
