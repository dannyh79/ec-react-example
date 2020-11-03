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

const addItemToCart = async (orderToken, itemId, desiredItemSize) => {
  const cart = await fetchCart(orderToken);
  const relationships = cart.relationships
  const itemIndex = relationships.variants.data.findIndex((item) => item.id === itemId)

  let response;
  if (itemIndex !== -1) {
    const lineItemId = relationships.line_items.data[itemIndex].id
    response = await cartClient.setQuantity({ orderToken }, {
      line_item_id: lineItemId,
      quantity: desiredItemSize
    })
  } else {
    response = await cartClient.addItem({ orderToken }, {
      variant_id: itemId,
      quantity: 1
    })
  }

  return response.success().data
}

// FIXME: server responds 404 upon removin last item in cart
const removeItemFromCart = async (orderToken, lineItemId, desiredItemSize) => {
  let response;
  if (desiredItemSize === 0) {
    response = await cartClient.removeItem({ orderToken }, lineItemId)
  } else {
    response = await cartClient.setQuantity({ orderToken }, {
      line_item_id: lineItemId,
      quantity: desiredItemSize
    })
  }

  return response.success().data
}

export { fetchCart, addItemToCart, removeItemFromCart }
