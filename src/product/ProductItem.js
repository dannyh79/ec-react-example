import React from 'react';

const ProductItem = ({ product }) => (
  <div
    key={product.id}
    className="w-1/4 p-4 border-4 border-double">
    <h3>{`${product.id}. ${product.name}`}</h3>
    <p>{product.description}</p>
  </div>
);

export default ProductItem;
