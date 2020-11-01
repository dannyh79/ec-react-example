import React from 'react';

const CartItem = ({ product }) => (
  <li>
    <div>
      <span>{product.name} * {/* count */}</span>
    </div>
  </li>
)

export default CartItem;
