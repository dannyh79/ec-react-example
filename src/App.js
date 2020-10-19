import React, { useState, useEffect } from 'react';
import { makeClient } from '@spree/storefront-api-v2-sdk';
import ProductList from './product/ProductList';
import './tailwind.output.css';

const App = () => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const client = makeClient({
      host: 'http://localhost:3000'
    });

    (async () => {
      const productsIndexReq = await client.products.list({
        include: 'default_variant',
        page: page
      });

      if (productsIndexReq.isSuccess) {
        const data = productsIndexReq.success().data.map(({ id, attributes }) => ({id, ...attributes}));
        setProducts(data);
      }
    })();
  }, [page])

  return (
    <div className="App">
      <ProductList products={products} />
      <div className="mt-4 mx-auto text-center">
        <button onClick={() => setPage(page + 1)}>
          Next Page
        </button>
      </div>
    </div>
  );
}

export default App;
