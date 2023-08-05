import { useEffect, useState } from 'react'
import NavbarAgentLogin from '../components/NavbarAgentLogin'
import Footer from '../components/Footer'
import '../global-styles/global.css'
import { fetchUserData } from '../utils/fetchUser'

import { Link, useNavigate} from "react-router-dom";
import AgentLanding from '../components/AgentLandingPage/AgentLanding'
import AgentFeatures from '../components/AgentLandingPage/AgentFeatures'
import AgentWorkFlow from '../components/AgentLandingPage/AgentWorkFlow'
import NavbarAgentLogout from '../components/NavbarAgentLogout'
import NavbarCustomerLogout from '../components/NavbarCustomerLogout'
import { UserAuth } from '../context/UserAuthContext'

const Agent = () => {
  const {user} = UserAuth();
  const navigate = useNavigate();
    (user&& navigate('/addemployeelink') )
  
    return (
      <>
        {user ? <NavbarAgentLogout /> : <NavbarAgentLogin />}
        <AgentLanding />
        <AgentFeatures />
        <AgentWorkFlow />
        <Footer />
      </>
    )
  }




export default Agent
