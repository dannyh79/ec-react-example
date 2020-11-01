import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ products }) => {
  return (
    <section className="w-8/12 flex flex-wrap mt-10 mx-auto">
    {products && products.map((product) => (
      <ProductItem key={product.id} product={product} />
    ))}
  </section>
  )
};

export default ProductList;
