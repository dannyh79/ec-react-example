import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { asyncFetchCart } from './redux';

const Cart = () => {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(asyncFetchCart()) }, [dispatch]);

  return (
    null
  );
}

export default Cart;
