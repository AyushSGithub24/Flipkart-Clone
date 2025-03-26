import React from 'react'
import Header from "./../components/Header";
import Navigation from "./../components/Navigation";
import Product from './../components/Product';
function ProducctDetail({productDetail}) {
  return (
    <>
        <Header />
        <Navigation />
        <Product productDetail={productDetail} />
    </>
  )
}

export default ProducctDetail   