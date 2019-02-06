import React from 'react'
import PropTypes from 'prop-types'
import { CurrencyFormatter } from '../utils/CurrencyFormatter'
import './Product.scss'

const Product = ({ price, inventory, title }) => (
  <div className="Product">
    <div className="info">
      <h2>{title}</h2>
      <span className="price">{CurrencyFormatter(price)}</span>
      <span className="inventory">
        {inventory ? `${inventory} remaining` : 'Out of Stock'}
      </span>
    </div>
  </div>
)

Product.propTypes = {
  price: PropTypes.number,
  inventory: PropTypes.number,
  title: PropTypes.string
}

export default Product
