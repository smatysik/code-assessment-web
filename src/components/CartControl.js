import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import './CartControl.scss'

class CartControl extends React.Component {
  onQuantityChange(newValue) {
    newValue = parseInt(newValue, 10)
    if (newValue) {
      this.props.modify(newValue)
    }
  }

  render() {
    console.log('render cartControl')
    const { value, reserves } = this.props
    return (
      <div className="CartControl">
        <Button
          styleName="secondary decrease-btn"
          onClick={() => this.onQuantityChange(value - 1)}
          disabled={value - 1 === 0}
        >
          <span className="decrease-icon" />
          <span className="hidden">Decrease</span>
        </Button>
        <label>
          <span className="hidden">Quantity:</span>
          <input
            value={value}
            onClick={event => {
              event.target.select()
            }}
            onChange={event => this.onQuantityChange(event.target.value)}
          />
        </label>
        <Button
          styleName="secondary right"
          onClick={() => this.onQuantityChange(value + 1)}
          disabled={reserves === 0}
        >
          <span className="increase-icon" />
          <span className="hidden">Increase</span>
        </Button>
      </div>
    )
  }
}

CartControl.propTypes = {
  modify: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  reserves: PropTypes.number
}

export default CartControl
