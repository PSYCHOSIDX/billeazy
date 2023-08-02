import React from 'react'
import AdminLogin from '../components/AdminLogin'

import NavbarBasic from '../components/NavbarBasic'
import { UserAuth } from '../context/UserAuthContext'
import Footer from '../components/Footer'
import '../global-styles/global.css'



const AdminLoginPage = () => {
  const {user} = UserAuth();

  return (
   <>
    {user ?  null: <NavbarBasic/>}
    <AdminLogin />
    <Footer/>
   </>
   
  )
}

export default AdminLoginPage