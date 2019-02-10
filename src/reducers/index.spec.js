import { getSubtotal, getTax, getTotal, getCartProducts } from './index'

describe('selectors', () => {
  describe('getSubtotalTotal', () => {
    it('should return price total', () => {
      const state = {
        cart: {
          addedIds: [1, 2, 3],
          quantityById: {
            1: 4,
            2: 2,
            3: 1
          }
        },
        products: {
          byId: {
            1: {
              id: 1,
              price: 1.99
            },
            2: {
              id: 1,
              price: 4.99
            },
            3: {
              id: 1,
              price: 9.99
            }
          }
        }
      }
      expect(getSubtotal(state)).toBe('27.93')
    })
  })

  describe('getTax', () => {
    it('should return price total', () => {
      const state = {
        cart: {
          addedIds: [1, 2, 3],
          quantityById: {
            1: 4,
            2: 2,
            3: 1
          }
        },
        products: {
          byId: {
            1: {
              id: 1,
              price: 1.99
            },
            2: {
              id: 1,
              price: 4.99
            },
            3: {
              id: 1,
              price: 9.99
            }
          }
        }
      }
      expect(getTax(state)).toBe('2.48')
    })
  })

  describe('getTotal', () => {
    it('should return price total', () => {
      const state = {
        cart: {
          addedIds: [1, 2, 3],
          quantityById: {
            1: 4,
            2: 2,
            3: 1
          }
        },
        products: {
          byId: {
            1: {
              id: 1,
              price: 1.99
            },
            2: {
              id: 1,
              price: 4.99
            },
            3: {
              id: 1,
              price: 9.99
            }
          }
        }
      }
      expect(getTotal(state)).toBe('30.41')
    })
  })

  describe('getCartProducts', () => {
    it('should return products with quantity', () => {
      const state = {
        cart: {
          addedIds: [1, 2, 3],
          quantityById: {
            1: 4,
            2: 2,
            3: 1
          }
        },
        products: {
          byId: {
            1: {
              id: 1,
              price: 1.99
            },
            2: {
              id: 1,
              price: 4.99
            },
            3: {
              id: 1,
              price: 9.99
            }
          }
        }
      }

      expect(getCartProducts(state)).toEqual([
        {
          id: 1,
          price: 1.99,
          quantity: 4
        },
        {
          id: 1,
          price: 4.99,
          quantity: 2
        },
        {
          id: 1,
          price: 9.99,
          quantity: 1
        }
      ])
    })
  })
})
