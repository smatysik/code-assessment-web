import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Cart from './Cart'
import Product from './Product'
import Button from './Button'

Enzyme.configure({ adapter: new Adapter() })

const setup = (total, products = []) => {
  const actions = {
    onCheckoutClicked: jest.fn(),
    modifyQuantity: jest.fn()
  }

  const component = Enzyme.shallow(
    <Cart products={products} total={total} {...actions} />
  )

  return {
    component: component,
    actions: actions,
    button: component.find(Button).at(1),
    products: component.find(Product),
    em: component.find('.no-items span').at(1),
    p: component.find('.grand-total span').at(1)
  }
}

describe('Cart component', () => {
  it('should display add some products message', () => {
    const { em } = setup()
    expect(em.text()).toMatch(/^Please add some products to your cart/)
  })

  it('should not render checkout button', () => {
    const { button } = setup()
    expect(button.exists()).toBeFalsy()
  })

  describe('when given product', () => {
    const product = [
      {
        id: 1,
        title: 'Product 1',
        price: 9.99,
        quantity: 1,
        image: 'product-image.jpg',
        displayInventory: false
      }
    ]

    it('should render products', () => {
      const { products, actions } = setup('9.99', product)
      const props = {
        title: product[0].title,
        price: product[0].price,
        quantity: product[0].quantity,
        image: 'product-image.jpg',
        displayInventory: false,
        children: [
          null,
          <Button
            onClick={() => {
              actions.modifyQuantity(1, 0)
            }}
            styleName="text-link remove-btn"
          >
            Remove
          </Button>
        ]
      }

      expect(JSON.parse(JSON.stringify(products.at(0).props()))).toEqual(
        JSON.parse(JSON.stringify(props))
      )
    })

    it('should display total', () => {
      const { p } = setup('76', product)
      expect(p.text()).toMatch(/^\$76/)
    })

    it('should render active button', () => {
      const { button } = setup('9.99', product)
      expect(button.prop('disabled')).toBeFalsy()
    })

    it('should call action on button click', () => {
      const { button, actions } = setup('9.99', product)
      button.simulate('click')
      expect(actions.onCheckoutClicked).toBeCalled()
    })
  })
})
