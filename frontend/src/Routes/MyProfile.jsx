import React from 'react'
import UserProfile from '../components/UserProfile';
import Header from '../components/Header';
import Footer from './../components/Footer';
import Navigation from './../components/Navigation';
function MyProfile() {
  return (
    <>
        <Header/>
        <Navigation/>
        <main className="main-content">
            <UserProfile/>
        </main>
        <Footer/>
    </>
  )
}

export default MyProfile