import { makeClient } from '@spree/storefront-api-v2-sdk';

const cartClient = makeClient({ host: 'http://localhost:3000' }).cart

const fetchCart = async (orderToken) => {
  let response, data

  if (orderToken) {
    response = await cartClient.show({ orderToken })
  } else {
    response = await cartClient.create();
  }

  if (response.isSuccess) {
    data = response.success().data
  }

  return data
}

const addItemToCart = async (orderToken, itemId) => {
  const response = await cartClient.addItem({ orderToken }, {
    variant_id: itemId,
    quantity: 1
  })

  return response.success().data
}

export { fetchCart, addItemToCart }
