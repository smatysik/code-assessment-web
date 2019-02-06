import React from 'react'
import PropTypes from 'prop-types'
import './ProductsList.scss'

const ProductsList = ({ children }) => (
  <div className="ProductsList">
    <div>{children}</div>
  </div>
)

ProductsList.propTypes = {
  children: PropTypes.node
}

export default ProductsList
