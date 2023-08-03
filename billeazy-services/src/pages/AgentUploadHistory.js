import Footer from '../components/Footer'
import '../global-styles/global.css'
import { UserAuth } from '../context/UserAuthContext'
import UploadHistory from '../components/UploadHistory'
import NavbarAgentLogin from '../components/NavbarAgentLogin'


const AgentUploadHistory = () => {

  const {user} = UserAuth();

  return (
    <>
    {user ? null : <NavbarAgentLogin/>}
    <UploadHistory/>
   
    <Footer/>
    </>
  )
}

export default AgentUploadHistory;
