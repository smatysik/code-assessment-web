import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FocusTrap from 'focus-trap-react'
import { checkout, modifyQuantity } from '../actions'
import { getTotal, getCartProducts, getSubtotal, getTax } from '../reducers'
import Cart from '../components/Cart'
import Button from '../components/Button'
import Modal from '../components/Modal'
import './CartContainer.scss'
import { getVisibleProducts } from '../reducers/products'

class CartContainer extends React.Component {
  state = { showModal: false }
  toggleModal = () => this.setState({ showModal: !this.state.showModal })
  render() {
    const { showModal } = this.state
    const {
      products,
      subtotal,
      tax,
      total,
      checkout,
      modifyQuantity
    } = this.props
    const hasProducts = products.length > 0
    const cartQuantity = products
      .map(product => product.quantity)
      .reduce((a, b) => a + b, 0)
    return (
      <div className="CartContainer">
        <Button className="text-link" onClick={this.toggleModal}>
          <span className="icon-shopping-cart" />
          {hasProducts ? `View Cart (${cartQuantity})` : 'Your cart is empty'}
        </Button>
        {showModal ? (
          <Modal onCloseRequest={this.toggleModal}>
            <FocusTrap>
              <div className="focus-trap">
                <Button styleName="close-cart" onClick={this.toggleModal}>
                  <span className="hidden">Close Cart</span>
                </Button>
                <Cart
                  products={products}
                  subtotal={subtotal}
                  tax={tax}
                  total={total}
                  onCheckoutClicked={() => checkout(products)}
                  modifyQuantity={modifyQuantity}
                />
              </div>
            </FocusTrap>
          </Modal>
        ) : null}
      </div>
    )
  }
}

CartContainer.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired
    })
  ).isRequired,
  // productInventory: PropTypes.arrayOf(
  //   PropTypes.sha
  // )
  total: PropTypes.string,
  checkout: PropTypes.func.isRequired,
  modifyQuantity: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  products: getCartProducts(state),
  productInventory: getVisibleProducts(state.products),
  subtotal: getSubtotal(state),
  tax: getTax(state),
  total: getTotal(state)
})

export default connect(
  mapStateToProps,
  { checkout, modifyQuantity }
)(CartContainer)
