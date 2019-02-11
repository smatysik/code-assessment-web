import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Button from './Button'
import CartControl from './CartControl'

Enzyme.configure({ adapter: new Adapter() })

const setup = () => {
  const actions = {
    modify: jest.fn(),
    onQuantityChange: jest.fn()
  }

  const component = Enzyme.mount(
    <CartControl modify={actions.modify} value={2} reserves={10} />
  )

  return {
    component,
    actions,
    input: component.find('input'),
    decrement: component.find(Button).at(0),
    increment: component.find(Button).at(1)
  }
}

describe('CartControl component', () => {
  it('should display value in an input', () => {
    const { input } = setup()
    expect(input.props().value).toEqual(2)
  })

  it('should call modify function when decrement button is clicked', () => {
    const { decrement, actions } = setup()
    decrement.simulate('click')
    expect(actions.modify).toBeCalled()
  })

  it('should call modify function when increment button is clicked', () => {
    const { increment, actions } = setup()
    increment.simulate('click')
    expect(actions.modify).toBeCalled()
  })
})
