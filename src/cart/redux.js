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

const addToCart = (itemList, incomingItem) => {
  const itemIndex = itemList.findIndex((i) => i.id === incomingItem.id)
  if (itemIndex === -1) {
    return itemList.concat({ ...incomingItem, size: 1 })
  } else {
    const item = itemList[itemIndex]
    const updated = { ...item, size: item.size + 1  }
    return [
      ...itemList.slice(0, itemIndex),
      updated,
      ...itemList.slice(itemIndex + 1)
    ]
  }
};

const removeFromCart = (itemList, toBeRemovedItem) => {
  const itemIndex = itemList.findIndex((i) => i.id === toBeRemovedItem.id)
  if (itemList[itemIndex].size === 1) {
    return itemList.splice(itemIndex, 1)
  } else {
    const item = itemList[itemIndex]
    const updated = { ...item, size: item.size - 1  }
    return [
      ...itemList.slice(0, itemIndex),
      updated,
      ...itemList.slice(itemIndex + 1)
    ]
  }
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
        data: addToCart(state.data, action.payload.product),
        total: action.payload.attributes.total
      }
    }
    case REMOVE_ITEM: {
      return {
        ...state,
        data: removeFromCart(state.data, action.payload.product),
        total: action.payload.attributes.total,
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
    let desiredItemSize
    const item = getState().cart.data.find((item) => item.id === itemId)
    if (item) {
      desiredItemSize = item.size + 1
    } else {
      desiredItemSize = 1
    }
    const payload = await addItemToCart(token, itemId, desiredItemSize);
    const product = await fetchProduct(itemId);
    const relationIndex = payload.relationships.variants.data.findIndex((item) => item.id === itemId)
    payload.product = { ...product, lineItemId: payload.relationships.line_items.data[relationIndex].id };
    dispatch(addItem(payload));
  }
}

export const asyncRemoveItemFromCart = (itemId) => {
  return async (dispatch, getState) => {
    const token = getState().cart.orderToken;
    const product = getState().cart.data.find((item) => item.id === itemId);
    const item = getState().cart.data.find((item) => item.id === itemId)
    const payload = await removeItemFromCart(token, product.lineItemId, item.size - 1);
    dispatch(removeItem({ ...payload, product }));
  }
}
