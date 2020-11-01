import React from 'react';
import CartItem from './CartItem'

const SelectedProductsList =
  ({ selectedProducts, total }) => (
  <>
    <ul>
      {selectedProducts && selectedProducts.map((product) => ( 
        <CartItem key={product.id} product={product} />
      ))}
    </ul>
    <div>Total: {total}</div>
  </>
)

export default SelectedProductsList;
