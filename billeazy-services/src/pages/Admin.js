import React from 'react'
import NavbarLogin from '../components/NavbarLogin'
import Footer from '../components/Footer'
import '../global-styles/global.css'
import { UserAuth } from '../context/UserAuthContext'
import NavbarLogout from '../components/NavbarLogout'
import AdminPage from '../components/AdminLandingPage/AdminPage'



const Admin = () => {

  const {user} = UserAuth();

  return (
    <>
    
    {user ? <NavbarLogout/> : <NavbarLogin/>}
    <AdminPage/>
    <Footer/>
    </>
  )
}

export default Admin
