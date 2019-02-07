import React from 'react'
import PropTypes from 'prop-types'
import Product from './Product'
import Button from './Button'
import './ProductItem.scss'

const ProductItem = ({ product, onAddToCartClicked }) => (
  <div className="ProductItem">
    <Product
      title={product.title}
      price={product.price}
      inventory={product.inventory}
      image={product.image}
    >
      <Button
        className="primary add-to-cart"
        onClick={onAddToCartClicked}
        disabled={product.inventory > 0 ? '' : 'disabled'}
      >
        {product.inventory > 0 ? 'Add to cart' : 'Sold Out'}
      </Button>
    </Product>
  </div>
)

ProductItem.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired
  }).isRequired,
  onAddToCartClicked: PropTypes.func.isRequired
}

export default ProductItem
