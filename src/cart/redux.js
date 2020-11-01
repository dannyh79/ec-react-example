import { fetchCart, addItemToCart } from './api'
import { fetchProduct } from '../products/api'

const SET_CART = 'cart/SET_CART';
const ADD_ITEM  = 'cart/ADD_ITEM';
// const REMOVE_ITEM  = 'cart/REMOVE_ITEM';

const initState = {
  data: [],
  orderToken: '',
  total: null
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case SET_CART: {
      return {
        ...state,
        orderToken: action.payload.attributes.token,
        total: action.payload.attributes.total
      }
    }
    case ADD_ITEM: {
      return {
        ...state,
        total: action.payload.attributes.total,
        data: [...state.data, action.payload.product]
      }
    }
    default:
      return state
  }
}

export default reducer;

export const setCart = (payload) => {
  return {
    type: SET_CART,
    payload
  }
}

export const addItem = (payload) => {
  return {
    type: ADD_ITEM,
    payload
  }
}

export const asyncFetchCart = () => {
  return async (dispatch, getState) => {
    const token = getState().cart.orderToken;
    const payload = await fetchCart(token);
    dispatch(setCart(payload));
  }
}

export const asyncAddItemToCart = (itemId) => {
  return async (dispatch, getState) => {
    const token = getState().cart.orderToken;
    const payload = await addItemToCart(token, itemId);
    const product = await fetchProduct(itemId);
    payload.product = product
    dispatch(addItem(payload));
  }
}
