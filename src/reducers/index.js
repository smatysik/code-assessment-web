import { combineReducers } from 'redux'
import cart, * as fromCart from './cart'
import products, * as fromProducts from './products'
import { TaxRate } from '../utils/TaxRules'
export default combineReducers({
  cart,
  products
})

const getAddedIds = state => fromCart.getAddedIds(state.cart)
const getQuantity = (state, id) => fromCart.getQuantity(state.cart, id)
const getProduct = (state, id) => fromProducts.getProduct(state.products, id)

const getSubtotalUnformatted = state =>
  getAddedIds(state).reduce(
    (total, id) => total + getProduct(state, id).price * getQuantity(state, id),
    0
  )

export const getSubtotal = state => getSubtotalUnformatted(state).toFixed(2)

const getTaxUnformatted = state => getSubtotalUnformatted(state) * TaxRate

export const getTax = state => getTaxUnformatted(state).toFixed(2)

export const getTotal = state =>
  (getSubtotalUnformatted(state) + getTaxUnformatted(state)).toFixed(2)

export const getCartProducts = state =>
  getAddedIds(state).map(id => ({
    ...getProduct(state, id),
    quantity: getQuantity(state, id)
  }))
