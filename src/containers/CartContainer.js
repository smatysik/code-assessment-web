import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkout } from '../actions'
import { getTotal, getCartProducts } from '../reducers'
import Cart from '../components/Cart'
import Button from '../components/Button'
import Modal from '../components/Modal'
import './CartContainer.scss'

class CartContainer extends React.Component {
  state = { showModal: false }
  toggleModal = () => this.setState({ showModal: !this.state.showModal })
  render() {
    const { showModal } = this.state
    const hasProducts = this.props.products.length > 0
    const cartQuantity = this.props.products
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
            <Cart
              products={this.props.products}
              total={this.props.total}
              onCheckoutClicked={() => checkout(this.props.products)}
            />
            <Button className="close-cart" onClick={this.toggleModal}>
              <span className="hidden">Close Cart</span>
            </Button>
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
  total: PropTypes.string,
  checkout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  products: getCartProducts(state),
  total: getTotal(state)
})

export default connect(
  mapStateToProps,
  { checkout }
)(CartContainer)
