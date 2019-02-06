import React from 'react'
import ProductsContainer from './ProductsContainer'
import CartContainer from './CartContainer'
import './App.scss'

const App = () => (
  <div>
    <h1>Acme Store</h1>
    <ProductsContainer />
    <CartContainer />
  </div>
)

export default App
