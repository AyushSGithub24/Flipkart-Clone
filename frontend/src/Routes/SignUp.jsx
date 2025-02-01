import React from 'react'
import Header from "./../components/Header";
import Navigation from "./../components/Navigation";
import Signup from "./../components/signup";
import Footer from "./../components/Footer";
function SignUp() {
    return (
      <>
        <Header />
        <Navigation />
        <main className="main-content">
          {/* Add your sign-up form here */}
          <Signup/>
        </main>
        <Footer />
      </>
    );
  }
export default SignUp