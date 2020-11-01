import React from 'react';
import Products from './products/';
import Cart from './cart/';
import './tailwind.output.css';

const App = () => {

  return (
    <div className="App">
      <Cart />
      <Products />
    </div>
  );
}

export default App;
