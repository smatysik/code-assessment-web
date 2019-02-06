import React from 'react'
import PropTypes from 'prop-types'
import Product from './Product'
import Button from './Button'
import './Cart.scss'

const Cart = ({ products, total, onCheckoutClicked }) => {
  const hasProducts = products.length > 0
  const nodes = hasProducts ? (
    products.map(product => (
      <Product
        title={product.title}
        price={product.price}
        quantity={product.quantity}
        key={product.id}
      />
    ))
  ) : (
    <div className="no-items">
      <span>Please add some products to your cart.</span>
    </div>
  )

  return (
    <div className="Cart">
      <div className="items">
        <h2>Your Cart</h2>
        <div>{nodes}</div>
        {hasProducts && <p>Total: &#36;{total}</p>}
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
