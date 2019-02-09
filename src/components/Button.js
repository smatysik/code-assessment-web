import React from 'react'
import PropTypes from 'prop-types'
import './Button.scss'

const Button = ({ children, styleName, disabled, onClick }) => (
  <button
    className={`Button${styleName ? ' ' + styleName : ''}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
)

Button.propTypes = {
  children: PropTypes.node,
  styleName: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

export default Button
