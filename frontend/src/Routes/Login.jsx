import React from 'react'
import Header from "./../components/Header";
import Navigation from "./../components/Navigation";
import LoginForm from "./../components/LoginForm";
import Footer from "./../components/Footer";
function Login() {
    return (
      <>
        <Header />
        <Navigation />
        <main className="main-content">
          <LoginForm />
        </main>
        <Footer />
      </>
    );
  }

export default Login