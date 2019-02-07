import React from 'react'
import PropTypes from 'prop-types'
import Product from './Product'
import Button from './Button'
import { CurrencyFormatter } from '../utils/CurrencyFormatter'
import './Cart.scss'

const Cart = ({ products, total, onCheckoutClicked }) => {
  const hasProducts = products.length > 0
  const nodes = hasProducts ? (
    products.map(product => (
      <div key={product.id}>
        <Product
          title={product.title}
          price={product.price}
          quantity={product.quantity}
          image={product.image}
        />
      </div>
    ))
  ) : (
    <div className="no-items">
      <span className="icon-shopping-cart" />
      <span>Please add some products to your cart.</span>
    </div>
  )

  return (
    <div className="Cart">
      <div className="items">
        <h2>Your Cart</h2>
        <div>{nodes}</div>
        {hasProducts && (
          <div className="totals">
            <span>Total:</span>
            <span>{CurrencyFormatter(total)}</span>
          </div>
        )}
      </div>
      {hasProducts && (
        <Button
          className="primary"
          onClick={onCheckoutClicked}
          disabled={hasProducts ? '' : 'disabled'}
        >
          Checkout
        </Button>
      )}
    </div>
  )
}

Cart.propTypes = {
  products: PropTypes.array,
  total: PropTypes.string,
  onCheckoutClicked: PropTypes.func
}

export default Cart
