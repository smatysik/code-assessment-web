import React from 'react'
import 'react-app-polyfill/ie11'
import ProductsContainer from './ProductsContainer'
import CartContainer from './CartContainer'
import './App.scss'

const App = () => (
  <div>
    <div className="store-header">
      <h1>Acme Store</h1>
      <CartContainer />
    </div>
    <ProductsContainer />
  </div>
)

export default App
