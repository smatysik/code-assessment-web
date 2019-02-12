import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Button from './Button'
import CartControl from './CartControl'

Enzyme.configure({ adapter: new Adapter() })

const setup = (value = 2, reserves = 10) => {
  const actions = {
    modify: jest.fn(),
    onQuantityChange: jest.fn()
  }

  const component = Enzyme.mount(
    <CartControl modify={actions.modify} value={value} reserves={reserves} />
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

  it('should call modify function with decremented value when decrement button is clicked', () => {
    const { decrement, actions } = setup()
    decrement.simulate('click')
    expect(actions.modify).toHaveBeenCalledWith(1)
  })

  it('should call modify function with incremented value when increment button is clicked', () => {
    const { increment, actions } = setup()
    increment.simulate('click')
    expect(actions.modify).toHaveBeenCalledWith(3)
  })

  it('should render disabled decrement button when input is 1', () => {
    const { decrement } = setup(1, 0)
    expect(decrement.prop('disabled')).toBeTruthy()
  })

  it('should render disabled decrement button when reserves are 0', () => {
    const { increment } = setup(5, 0)
    expect(increment.prop('disabled')).toBeTruthy()
  })
})
