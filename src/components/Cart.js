import React from 'react'
import PropTypes from 'prop-types'
import Product from './Product'
import Button from './Button'
import { CurrencyFormatter } from '../utils/CurrencyFormatter'
import './Cart.scss'

const Cart = ({ products, total, onCheckoutClicked, modifyQuantity }) => {
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
        <div className="cart-controls">
          <Button
            styleName="secondary decrease-btn"
            onClick={() => modifyQuantity(product.id, product.quantity - 1)}
          >
            <span className="decrease-icon" />
            <span className="hidden">Decrease</span>
          </Button>
          <input
            value={product.quantity}
            onChange={() => {
              console.log('onChange')
            }}
          />
          <Button
            styleName="secondary right"
            onClick={() => modifyQuantity(product.id, product.quantity + 1)}
          >
            <span className="increase-icon" />
            <span className="hidden">Increase</span>
          </Button>
        </div>
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
        <div className={hasProducts ? 'column' : 'row'}>{nodes}</div>
        {hasProducts && (
          <div className="totals">
            <span>Total:</span>
            <span>{CurrencyFormatter(total)}</span>
          </div>
        )}
      </div>
      {hasProducts && (
        <Button
          styleName="primary checkout-btn"
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
  onCheckoutClicked: PropTypes.func,
  modifyQuantity: PropTypes.func
}

export default Cart
