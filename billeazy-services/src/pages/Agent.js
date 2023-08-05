import { useEffect, useState } from 'react'
import NavbarAgentLogin from '../components/NavbarAgentLogin'
import Footer from '../components/Footer'
import '../global-styles/global.css'
import { fetchUserData } from '../utils/fetchUser'

import AgentLanding from '../components/AgentLandingPage/AgentLanding'
import AgentFeatures from '../components/AgentLandingPage/AgentFeatures'
import AgentWorkFlow from '../components/AgentLandingPage/AgentWorkFlow'
import NavbarAgentLogout from '../components/NavbarAgentLogout'
import NavbarCustomerLogout from '../components/NavbarCustomerLogout'
import { UserAuth } from '../context/UserAuthContext'

const Agent = () => {
  const { user } = UserAuth();
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user) {
      (async () => {
        const fetchedData = await fetchUserData(user)
        setUserData(fetchedData)
        setLoading(false);
      })();
    }
  }, [user])

  useEffect(() => {
    if (userData) {
      console.log("userData updated:", userData);
    }
  }, [userData]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (userData?.usertype == 'admin' || userData?.usertype == 'employee') {
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
  else {
    return (
      <><NavbarCustomerLogout />
        <h1>You cannot access this page</h1>
        <Footer />
      </>
    )
  }

}

export default Agent
