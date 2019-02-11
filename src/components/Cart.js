import React from 'react'
import PropTypes from 'prop-types'
import Product from './Product'
import Button from './Button'
import CartControl from './CartControl'
import { CurrencyFormatter } from '../utils/CurrencyFormatter'
import './Cart.scss'

const Cart = ({
  products,
  subtotal,
  tax,
  total,
  onCheckoutClicked,
  modifyQuantity
}) => {
  const hasProducts = products.length > 0
  const nodes = hasProducts ? (
    products.map(product => (
      <div className="cart-item" key={product.id}>
        <Product
          title={product.title}
          price={product.price}
          quantity={product.quantity}
          inventory={product.inventory}
          image={product.image}
          displayInventory={false}
        >
          <Button
            styleName="text-link remove-btn"
            onClick={() => modifyQuantity(product.id, 0)}
          >
            Remove
          </Button>
        </Product>
        <CartControl
          modify={newValue => {
            modifyQuantity(product.id, newValue)
          }}
          value={product.quantity}
          reserves={product.inventory}
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
        <div className={`cart-items ${hasProducts ? 'column' : 'row'}`}>
          {nodes}
        </div>
        {hasProducts && (
          <div className="totals">
            <div className="subtotal">
              <span>Subtotal:</span>
              <span>{CurrencyFormatter(subtotal)}</span>
            </div>
            <div className="tax">
              <span>Tax:</span>
              <span>{CurrencyFormatter(tax)}</span>
            </div>
            <div className="grand-total">
              <span>Total:</span>
              <span>{CurrencyFormatter(total)}</span>
            </div>
          </div>
        )}
      </div>
      {hasProducts && (
        <Button
          styleName="primary checkout-btn"
          onClick={onCheckoutClicked}
          disabled={!hasProducts}
        >
          Checkout
        </Button>
      )}
    </div>
  )
}

Cart.propTypes = {
  products: PropTypes.array,
  subtotal: PropTypes.string,
  tax: PropTypes.string,
  total: PropTypes.string,
  onCheckoutClicked: PropTypes.func,
  modifyQuantity: PropTypes.func
}

export default Cart
