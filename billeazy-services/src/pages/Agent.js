import React from 'react'
import NavbarAgentLogin from '../components/NavbarAgentLogin'
import Footer from '../components/Footer'
import '../global-styles/global.css'
import { UserAuth } from '../context/UserAuthContext'

import AgentLanding from '../components/AgentLandingPage/AgentLanding'
import AgentFeatures from '../components/AgentLandingPage/AgentFeatures'
import AgentWorkFlow from '../components/AgentLandingPage/AgentWorkFlow'


const Agent = () => {

  const {user} = UserAuth();

  return (
    <>
    
    {user ? null : <NavbarAgentLogin/>}
    <AgentLanding/>
    <AgentFeatures/>
    <AgentWorkFlow/>
    
    <Footer/>
    </>
  )
}

export default Agent
