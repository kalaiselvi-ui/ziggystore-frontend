import React from 'react'
import Footer from '../components/Footer'
import MenuList from '../components/Navbar'
import Product from '../components/Product'

const ProductListScreen = () => {
  return (
    <div>
        <MenuList/>
        <Product />
        <Footer/>
    </div>
  )
}

export default ProductListScreen