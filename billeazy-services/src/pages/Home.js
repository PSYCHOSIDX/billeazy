import React from 'react'
import NavbarLogin from '../components/NavbarLogin'
import '../global-styles/global.css'
import { UserAuth } from '../context/UserAuthContext'
import NavbarLogout from '../components/NavbarLogout'
import CustomerLanding from '../components/CustomerLanding'
const Home = () => {

  const {user} = UserAuth();

  return (
    <>
  
    {user ? <NavbarLogout/> : <NavbarLogin/>}
    <CustomerLanding/>
    </>
  )
}

export default Home
