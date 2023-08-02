import React from 'react'
import NavbarLogin from '../components/NavbarLogin'
import Footer from '../components/Footer'
import '../global-styles/global.css'
import { UserAuth } from '../context/UserAuthContext'
import NavbarLogout from '../components/NavbarLogout'
import AgentLanding from '../components/AgentLandingPage/AgentLanding'
import AgentFeatures from '../components/AgentLandingPage/AgentFeatures'
import AgentWorkFlow from '../components/AgentLandingPage/AgentWorkFlow'


const Agent = () => {

  const {user} = UserAuth();

  return (
    <>
    
    {user ? <NavbarLogout/> : <NavbarLogin/>}
    {/* <AgentLanding/> */}
    <AgentFeatures/>
    <AgentWorkFlow/>
    
    <Footer/>
    </>
  )
}

export default Agent
