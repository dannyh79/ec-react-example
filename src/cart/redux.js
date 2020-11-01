import { fetchCart } from './api'

const SET_CART = 'cart/SET_CART';

const initState = {
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

export const asyncFetchCart = () => {
  return async (dispatch, getState) => {
    const token = getState().cart.orderToken;
    const payload = await fetchCart(token);
    dispatch(setCart(payload));
  }
}
