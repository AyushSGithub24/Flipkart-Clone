import React from 'react'
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Forgot from '../components/Forgot';
function ForgotPassword() {
  return (
    <>
    <Header />
    <Navigation />
    <main className="main-content">
     <Forgot/>
    </main>
    <Footer />
  </>
  )
}

export default ForgotPassword