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
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Agent = () => {
  const {user} = UserAuth();
  const navigate = useNavigate();
    (user&& navigate('/addemployeelink') )
    
  { !user&&toast('Welcome To BillEazy Employee Portal', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
  }
  
    return (
      <>
        <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
        {user ? <NavbarAgentLogout /> : <NavbarAgentLogin />}
        <AgentLanding />
        <AgentFeatures />
        <AgentWorkFlow />
        <Footer />
      </>
    )
  }




export default Agent
