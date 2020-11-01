import { makeClient } from '@spree/storefront-api-v2-sdk';

const fetchProductsIndex = async (page) => {
  const client = makeClient({
    host: 'http://localhost:3000'
  });
  let products;

  const productsIndexRequest = await client.products.list({
    include: 'default_variant',
    page: page
  });

  if (productsIndexRequest.isSuccess) {
    products = productsIndexRequest.success().data.map(({ id, attributes }) => ({id, ...attributes}));
  }

  return products
}

export { fetchProductsIndex }
