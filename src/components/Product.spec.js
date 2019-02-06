import React from 'react'
import { shallow } from 'enzyme'
import Product from './Product'

const setup = props => {
  const component = shallow(<Product {...props} />)

  return {
    component: component
  }
}

describe('Product component', () => {
  it('should render title', () => {
    const { component } = setup({ title: 'Test Product', price: 9.99 })
    expect(component.find('h2').text()).toBe('Test Product')
  })

  it('should render formatted price', () => {
    const { component } = setup({ title: 'Test Product', price: 9.99 })
    expect(component.find('.price').text()).toBe('$9.99')
  })

  describe('when given positive inventory', () => {
    it('should render title', () => {
      const { component } = setup({ title: 'Test Product', price: 9.99 })
      expect(component.find('h2').text()).toBe('Test Product')
    })

    it('should render formatted price', () => {
      const { component } = setup({ title: 'Test Product', price: 9.99 })
      expect(component.find('.price').text()).toBe('$9.99')
    })

    it('should render inventory', () => {
      const { component } = setup({
        title: 'Test Product',
        price: 9.99,
        inventory: 6
      })
      expect(component.find('.inventory').text()).toBe('6 Remaining')
    })
  })

  describe('when given zero inventory', () => {
    it('should render out of stock message', () => {
      const { component } = setup({
        title: 'Test Product',
        price: 9.99,
        inventory: 0
      })
      expect(component.find('.inventory').text()).toBe('Out of Stock')
    })
  })
})
