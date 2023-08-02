import React from 'react'
import NavbarLogin from '../components/NavbarLogin'
import Footer from '../components/Footer'
import '../global-styles/global.css'
import { UserAuth } from '../context/UserAuthContext'
import NavbarLogout from '../components/NavbarLogout'
<<<<<<< Updated upstream
import CustomerWorkFlow from '../components/CustomerLandingPage/CustomerWorkFlow'
import CustomerFeatures from '../components/CustomerLandingPage/CustomerFeatures'
import CustomerLanding from'../components/CustomerLandingPage/CustomerLanding'
=======
import CustomerLanding from '../components/CustomerLanding'
import CustomerFeatures from '../components/CustomerFeatures'
import CustomerWorkFlow from '../components/CustomerWorkFlow'
>>>>>>> Stashed changes

const Home = () => {

  const {user} = UserAuth();

  return (
    <>
  
    {user ? <NavbarLogout/> : <NavbarLogin/>}
    <CustomerLanding/>
    <CustomerFeatures/>
    <CustomerWorkFlow/>
    <Footer/>
    </>
  )
}

export default Home
