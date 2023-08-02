import React from 'react'
import NavbarLogin from '../components/NavbarLogin'
import Footer from '../components/Footer'
import '../global-styles/global.css'
import { UserAuth } from '../context/UserAuthContext'
import NavbarLogout from '../components/NavbarAdminLogout'
import CustomerBillPage from '../components/CustomerBillPage'

const Customer = () => {

    const {user} = UserAuth();
  
    return (
      <>
      
      {user ? <NavbarLogout/> : <NavbarLogin/>}
      <CustomerBillPage/>
      <Footer/>
      </>
    )
  }
  
  export default Customer;