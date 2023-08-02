import React from 'react'
import AdminLogin from '../components/AdminLogin'
import NavbarLogout from '../components/NavbarLogout'
import NavbarBasic from '../components/NavbarBasic'
import { UserAuth } from '../context/UserAuthContext'
import Footer from '../components/Footer'
import '../global-styles/global.css'



const AdminLoginPage = () => {
  const {user} = UserAuth();

  return (
   <>
    {user ? <NavbarLogout/> : <NavbarBasic/> }
    <AdminLogin />
    <Footer/>
   </>
   
  )
}

export default AdminLoginPage