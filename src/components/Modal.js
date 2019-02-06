import React from 'react'
import { createPortal } from 'react-dom'
import './Modal.scss'

const modalRoot = document.getElementById('modal')

class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  handleKeyUp(e) {
    const { onCloseRequest } = this.props
    const keys = {
      27: () => {
        e.preventDefault()
        onCloseRequest()
        window.removeEventListener('keyup', this.handleKeyUp, false)
      }
    }

    if (keys[e.keyCode]) {
      keys[e.keyCode]()
    }
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp, false)
    modalRoot.appendChild(this.el)
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp, false)
    modalRoot.removeChild(this.el)
  }

  render() {
    return createPortal(this.props.children, this.el)
  }
}

export default Modal
