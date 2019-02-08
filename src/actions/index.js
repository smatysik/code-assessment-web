import shop from '../api/shop'
import * as types from '../constants/ActionTypes'

const receiveProducts = products => ({
  type: types.RECEIVE_PRODUCTS,
  products: products
})

export const getAllProducts = () => dispatch => {
  shop.getProducts(products => {
    dispatch(receiveProducts(products))
  })
}

const addToCartUnsafe = productId => ({
  type: types.ADD_TO_CART,
  productId
})

export const addToCart = productId => (dispatch, getState) => {
  if (getState().products.byId[productId].inventory > 0) {
    dispatch(addToCartUnsafe(productId))
  }
}

const removeCartItemUnsafe = productId => ({
  type: types.REMOVE_CART_ITEM,
  productId
})

const updateInventoryUnsafe = (productId, newInventory) => ({
  type: types.UPDATE_INVENTORY,
  productId,
  newInventory
})

const modifyQuantityUnsafe = (productId, newQuantity) => ({
  type: types.MODIFY_QUANTITY,
  productId,
  newQuantity
})

export const modifyQuantity = (productId, newQuantity) => (
  dispatch,
  getState
) => {
  const inventory = getState().products.byId[productId].inventory
  const quantity = getState().cart.quantityById[productId]
  const newInventory = inventory + quantity - newQuantity
  if (newQuantity > 0 && newQuantity <= inventory + quantity) {
    dispatch(modifyQuantityUnsafe(productId, newQuantity))
    dispatch(updateInventoryUnsafe(productId, newInventory))
  } else if (newQuantity === 0) {
    dispatch(removeCartItemUnsafe(productId))
    dispatch(updateInventoryUnsafe(productId, newInventory))
  }
}

export const checkout = products => (dispatch, getState) => {
  const { cart } = getState()

  dispatch({
    type: types.CHECKOUT_REQUEST
  })
  shop.buyProducts(products, () => {
    dispatch({
      type: types.CHECKOUT_SUCCESS,
      cart
    })
    // Replace the line above with line below to rollback on failure:
    // dispatch({ type: types.CHECKOUT_FAILURE, cart })
  })
}
