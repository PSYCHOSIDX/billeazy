import React from 'react'
import NavbarLogin from '../components/NavbarLogin'
import '../global-styles/global.css'
import { UserAuth } from '../context/UserAuthContext'
import NavbarLogout from '../components/NavbarLogout'

const Home = () => {

  const {user} = UserAuth();

  return (
    <>
  
    {user ? <NavbarLogout/> : <NavbarLogin/>}
    
    </>
  )
}

export default Home
