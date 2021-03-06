import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Button from './Button'

Enzyme.configure({ adapter: new Adapter() })

const setup = props => {
  const component = Enzyme.shallow(<Button {...props} />)

  return {
    component: component,
    children: component.children().at(0)
  }
}

let buttonProps

describe('Button component', () => {
  beforeEach(() => {
    buttonProps = {
      className: 'button-class',
      disabled: false,
      children: 'Test Children'
    }
  })

  it('should render an enabled button', () => {
    const { component } = setup(buttonProps)
    expect(component.prop('disabled')).toBeFalsy()
  })

  it('should render a disabled button', () => {
    buttonProps.disabled = true
    const { component } = setup(buttonProps)
    expect(component.prop('disabled')).toBeTruthy()
  })

  it('should render children', () => {
    const { children } = setup(buttonProps)
    expect(children.text()).toEqual('Test Children')
  })
})
