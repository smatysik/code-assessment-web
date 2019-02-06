import React from 'react'
import PropTypes from 'prop-types'
import './Button.scss'

const Button = ({ children, className, disabled, onClick }) => (
  <button
    className={`Button ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
)

Button.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.string,
  onClick: PropTypes.func
}

export default Button
