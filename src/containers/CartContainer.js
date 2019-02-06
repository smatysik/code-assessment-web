import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkout } from '../actions'
import { getTotal, getCartProducts } from '../reducers'
import Cart from '../components/Cart'
import Button from '../components/Button'
import Modal from '../components/Modal'

class CartContainer extends React.Component {
  state = { showModal: false }
  toggleModal = () => this.setState({ showModal: !this.state.showModal })
  render() {
    const { showModal } = this.state
    return (
      <div className="CartContainer">
        <Button
          className="text-link"
          onClick={this.toggleModal}
          disabled={this.props.products.length > 0 ? '' : 'disabled'}
        >
          {this.props.products.length
            ? `View Cart (${this.props.products.length})`
            : 'Your cart is empty'}
        </Button>
        {showModal ? (
          <Modal>
            <Cart
              products={this.props.products}
              total={this.props.total}
              onCheckoutClicked={() => checkout(this.props.products)}
            />
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
