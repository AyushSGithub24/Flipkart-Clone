import React from 'react'
import Header from '../components/Header';
import Navigation from './../components/Navigation';
import Footer from './../components/Footer';
import { useLocation } from 'react-router-dom';
import Product from '../components/Product';

function ProductDetails() {
    const location = useLocation();
    const products = location.state?.products; // Use optional chaining to avoid crashes
    

    return (
        <>  
            <Header />
            <Navigation />
           <Product product={products} />
            <Footer />
        </>
    );
}
export default ProductDetails