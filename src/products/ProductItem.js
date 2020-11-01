import React from 'react';
import { useDispatch } from 'react-redux';
import { asyncAddItemToCart } from '../cart/redux'

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="w-1/4 p-4 border-4 border-double">
      <h3>{`${product.id}. ${product.name}`}</h3>
      <p>{product.description}</p>
      <button onClick={() => dispatch(asyncAddItemToCart(product.id))}>
        +
      </button>
    </div>
)};

export default ProductItem;
