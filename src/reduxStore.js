import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import products from './products/redux';
import cart from './cart/redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    products,
    cart
  }),
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

export default store;
