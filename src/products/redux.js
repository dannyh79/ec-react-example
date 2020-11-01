import { fetchProductsIndex } from './api';

const FETCH = 'products/FETCH';

const initState = {
  data: [],
  page: null
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH: {
      return {
        ...state,
        data: state.data.concat(action.nextPageProducts),
        page: action.page
      }
    }
    default:
      return state
  }
}

export default reducer;

export const fetch = (products, page) => {
  return {
    type: FETCH,
    nextPageProducts: products,
    page: page
  }
}

export const asyncFetch = (page) => {
  return async (dispatch, _getState) => {
    const products = await fetchProductsIndex(page);
    dispatch(fetch(products, page));
  }
}
