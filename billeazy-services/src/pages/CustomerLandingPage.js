import React from 'react'
import NavbarLogin from '../components/NavbarLogin'
import Footer from '../components/Footer'
import '../global-styles/global.css'
import { UserAuth } from '../context/UserAuthContext'

import CustomerWorkFlow from '../components/CustomerLandingPage/CustomerWorkFlow'
import CustomerFeatures from '../components/CustomerLandingPage/CustomerFeatures'
import CustomerLanding from'../components/CustomerLandingPage/CustomerLanding'
import NavbarCustomerLogout from '../components/NavbarCustomerLogout'

const CustomerLandingPage = () => {

  const {user} = UserAuth();

  return (
    <>
  
    {user ? <NavbarCustomerLogout/> : <NavbarLogin/>}
    <CustomerLanding/>
    <CustomerFeatures/>
    <CustomerWorkFlow/>
    <Footer/>
    </>
  )
}

export default CustomerLandingPage
