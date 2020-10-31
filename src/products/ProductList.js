import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ products }) => (
  <section className="w-8/12 flex flex-wrap mt-10 mx-auto">
    {products.map((product) => (
      <ProductItem product={product} />
    ))}
  </section>
);

export default ProductList;
