import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ProductsList from './ProductsList'

Enzyme.configure({ adapter: new Adapter() })

const setup = props => {
  const component = Enzyme.shallow(
    <ProductsList>{props.children}</ProductsList>
  )

  return {
    component: component,
    children: component.children().at(0)
  }
}

describe('ProductsList component', () => {
  it('should render children', () => {
    const { children } = setup({
      children: 'Test Children'
    })
    expect(children.text()).toMatch(/^Test Children$/)
  })
})
