import React from 'react'
import PropTypes from 'prop-types'
import { CurrencyFormatter } from '../utils/CurrencyFormatter'
import './Product.scss'

const Product = ({ price, inventory, title, image, children }) => (
  <div className="Product">
    <div className="image">
      <img src={image} alt={title} />
    </div>
    <div className="info">
      <div className="info-title-price">
        <h2>{title}</h2>
        <span className="price">{CurrencyFormatter(price)}</span>
      </div>
      <div className="inventory-wrapper">
        <span className="inventory">
          {inventory ? `${inventory} Remaining` : 'Out of Stock'}
        </span>
      </div>
      {children}
    </div>
  </div>
)

Product.propTypes = {
  price: PropTypes.number,
  inventory: PropTypes.number,
  title: PropTypes.string
}

export default Product
