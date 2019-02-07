import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Modal from './Modal'

Enzyme.configure({ adapter: new Adapter() })

const setup = props => {
  const modalRoot = global.document.createElement('div')
  modalRoot.setAttribute('id', 'modal')
  const body = global.document.querySelector('body')
  body.appendChild(modalRoot)

  const actions = {
    onCloseRequest: jest.fn()
  }

  const component = Enzyme.mount(
    <Modal {...props} onCloseRequest={actions.onCloseRequest} />
  )

  return {
    actions,
    component,
    children: component.children().at(0)
  }
}

let modalProps

describe('Modal component', () => {
  beforeEach(() => {
    modalProps = {
      children: 'Test Children'
    }
  })

  it('should render modal', () => {
    const { actions, component } = setup()
    expect(component.props()).toEqual({
      onCloseRequest: actions.onCloseRequest
    })
  })
})
