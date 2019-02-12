import React from 'react'
import PropTypes from 'prop-types'
import Product from './Product'
import Button from './Button'
import CartControl from './CartControl'
import { CurrencyFormatter } from '../utils/CurrencyFormatter'
import './Cart.scss'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.breakpoint = 700
    this.cart = React.createRef()
    this.handleCartResize = this.handleCartResize.bind(this)
    this.renderCartControls = this.renderCartControls.bind(this)
    this.state = {
      cartWidth: 0
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        cartWidth: this.cart.current.clientWidth
      })
    }, 1)

    window.addEventListener('resize', this.handleCartResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleCartResize)
  }

  handleCartResize() {
    this.setState({
      cartWidth: this.cart.current.clientWidth
    })
  }

  renderCartControls(product) {
    return (
      <CartControl
        modify={newValue => {
          this.props.modifyQuantity(product.id, newValue)
        }}
        value={product.quantity}
        reserves={product.inventory}
      />
    )
  }

  render() {
    const {
      products,
      subtotal,
      tax,
      total,
      onCheckoutClicked,
      modifyQuantity
    } = this.props
    const width = this.state.cartWidth
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
            {width > this.breakpoint ? this.renderCartControls(product) : null}
            <Button
              styleName="text-link remove-btn"
              onClick={() => modifyQuantity(product.id, 0)}
            >
              Remove
            </Button>
          </Product>
          {width <= this.breakpoint ? (
            <CartControl
              modify={newValue => {
                this.props.modifyQuantity(product.id, newValue)
              }}
              value={product.quantity}
              reserves={product.inventory}
            />
          ) : null}
        </div>
      ))
    ) : (
      <div className="no-items">
        <span className="icon-shopping-cart" />
        <span>Please add some products to your cart.</span>
      </div>
    )

    return (
      <div className="Cart" ref={this.cart}>
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
