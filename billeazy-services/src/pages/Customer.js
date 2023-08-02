import React from 'react'
import NavbarLogin from '../components/NavbarLogin'
import Footer from '../components/Footer'
import '../global-styles/global.css'
import { UserAuth } from '../context/UserAuthContext'

import CustomerBillPage from '../components/CustomerBillPage'
import NavbarCustomerLogout from '../components/NavbarCustomerLogout'

const Customer = () => {

    const {user} = UserAuth();
  
    return (
      <>
      
      {user ? <NavbarCustomerLogout/> : <NavbarLogin/>}
      <CustomerBillPage/>
      <Footer/>
      </>
    )
  }
  
  export default Customer;