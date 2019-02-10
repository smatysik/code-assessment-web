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
      .then(json => {
        let products = []
        for (let i = 0; i < json.length; i++) {
          products.push({
            id: json[i].id,
            title: json[i].productTitle,
            price: json[i].price.value,
            inventory: json[i].inventory,
            image: `/images/${json[i].productTitle.toLowerCase()}.jpg`
          })
        }
        cb(products)
      })
  },
  buyProducts: (payload, cb, timeout) =>
    setTimeout(() => cb(), timeout || TIMEOUT)
}
