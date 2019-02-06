import React from 'react'
import PropTypes from 'prop-types'
import './ProductsList.scss'

const ProductsList = ({ title, children }) => (
  <div className="ProductsList">
    <div>{children}</div>
  </div>
)

ProductsList.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired
}

export default ProductsList
