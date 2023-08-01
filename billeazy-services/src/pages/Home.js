import React from 'react'
import NavbarLogin from '../components/NavbarLogin'
import Footer from '../components/Footer'
import '../global-styles/global.css'
import { UserAuth } from '../context/UserAuthContext'
import NavbarLogout from '../components/NavbarLogout'
import CustomerLanding from '../components/CustomerLanding'
import CustomerFeatures from '../components/CustomerFeatures'
import CustomerWorkFlow from '../components/CustomerWorkFlow'
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
