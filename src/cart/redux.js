import { fetchCart,
         addItemToCart,
         removeItemFromCart } from './api'
import { fetchProduct } from '../products/api'

const SET_CART = 'cart/SET_CART';
const ADD_ITEM  = 'cart/ADD_ITEM';
const REMOVE_ITEM  = 'cart/REMOVE_ITEM';

const initState = {
  data: [],
  orderToken: '',
  total: null,
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
        data: [...state.data, action.payload.product],
      }
    }
    case REMOVE_ITEM: {
      return {
        ...state,
        total: action.payload.attributes.total,
        data: state.data.filter((item) => (
          item.id !== action.payload.itemId
        ))
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

export const removeItem = (payload) => {
  return {
    type: REMOVE_ITEM,
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
    const relationIndex = payload.relationships.variants.data.findIndex((item) => item.id === itemId)
    payload.product = { ...product, lineItemId: payload.relationships.line_items.data[relationIndex].id };
    dispatch(addItem(payload));
  }
}

export const asyncRemoveItemFromCart = (itemId) => {
  return async (dispatch, getState) => {
    const token = getState().cart.orderToken;
    const lineItemId = getState().cart.data.find((item) => item.id === itemId).lineItemId;
    const payload = await removeItemFromCart(token, lineItemId);
    dispatch(removeItem({ ...payload, itemId: itemId.toString() }));
  }
}
