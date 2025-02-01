import React from 'react'
import Header from "./../components/Header";
import Navigation from "./../components/Navigation";
import Footer from "./../components/Footer";
import Carousel from './../components/Casrousal';
function Home() {
  
    return (
      <>
        <Header />
        <Navigation />
        <main className="main-content">
        <Carousel/>
        </main>
        <Footer />
      </>
    );
  }
  

export default Home