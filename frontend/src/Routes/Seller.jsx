import React, { useEffect } from 'react'
import Header from '../components/Seller/Header'
import Hero from '../components/Seller/Hero'
import Testimonials from '../components/Seller/Testimonials'
import CreateAccount from '../components/Seller/CreateAccount'
import Footer from '../components/Footer'
import { useSellerAuth } from '../Contexts/SellerAuthContext'
import { useNavigate } from 'react-router-dom'


function Seller() {
  const navigate=useNavigate();
  const {isLoggedIn}=useSellerAuth()
  console.log(isLoggedIn)
  useEffect(()=>{
    if(isLoggedIn){
      return navigate("/seller/dashboard") 
    }
  },[])
  return (
    <div className="min-h-screen ">
      <Header />
      <main className="container mx-auto px-4">
        <Hero />
        <Testimonials />
        <CreateAccount />
      </main>
      <Footer/>
    </div>
  )
}

export default Seller