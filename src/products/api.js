import { makeClient } from '@spree/storefront-api-v2-sdk';

const productsClient = makeClient({ host: 'http://localhost:3000' }).products

const fetchProductsIndex = async (page) => {
  let products;

  const productsIndexRequest = await productsClient.list({
    include: 'default_variant',
    page: page
  });

  if (productsIndexRequest.isSuccess) {
    products = productsIndexRequest.success().data.map(({ id, attributes }) => ({id, ...attributes}));
  }

  return products
}

const fetchProduct = async (itemId) => {
  let product;

  const productsIndexRequest = await productsClient.show(itemId);

  if (productsIndexRequest.isSuccess) {
    product = productsIndexRequest.success().data
  }

  return { id: itemId, ...product.attributes }
}

export { fetchProductsIndex, fetchProduct }
