import React from 'react'
import NavbarLogin from '../components/NavbarLogin'
import Footer from '../components/Footer'
import '../global-styles/global.css'
import { UserAuth } from '../context/UserAuthContext'
import AdminPage from '../components/AdminLandingPage/AdminPage'
import NavbarAdminLogout from '../components/NavbarAdminLogout'



const Admin = () => {

  const {user} = UserAuth();

  return (
    <>
    
    {user ? <NavbarAdminLogout/> : <NavbarLogin/>}
    <AdminPage/>
    <Footer/>
    </>
  )
}

export default Admin
