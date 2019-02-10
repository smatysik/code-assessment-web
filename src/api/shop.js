/**
 * Mocking client-server processing
 */
import fetch from 'cross-fetch'

const TIMEOUT = 100

export default {
  getProducts: (cb, timeout) => {
    fetch('http://tech.work.co/shopping-cart/products.json')
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json => cb(json))
  },
  buyProducts: (payload, cb, timeout) =>
    setTimeout(() => cb(), timeout || TIMEOUT)
}
