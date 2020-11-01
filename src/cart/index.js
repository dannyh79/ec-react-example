import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { asyncFetchCart } from './redux';

import SelectedProductsList from './SelectedProductsList'

const Cart = () => {
  const selectedProducts = useSelector((state) => state.cart.data);
  const total = useSelector((state) => state.cart.total);
  const dispatch = useDispatch();
  useEffect(() => { dispatch(asyncFetchCart()) }, [dispatch]);

  return (
    <SelectedProductsList selectedProducts={selectedProducts} total={total} />
  );
}

export default Cart;
