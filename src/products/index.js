import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { asyncFetch } from './redux';
import ProductList from './ProductList'

const Products = () => {
  const page = useSelector((state) => state.products.page);
  const products = useSelector((state) => state.products.data);
  const dispatch = useDispatch();
  useEffect(() => { dispatch(asyncFetch(1)) }, [dispatch])

  return (
    <>
      <ProductList products={products} />
      <div className="mt-4 mx-auto text-center">
        <button
          onClick={() => {
            dispatch(asyncFetch(page + 1))
          }}>
          Next Page
        </button>
      </div>
    </>
  );
}

export default Products;
