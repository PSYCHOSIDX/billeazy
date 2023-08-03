import '../component-styles/customer-landing.css'
import line from '../../assets/line.png'
import React , {useState}from 'react'

import { useNavigate} from "react-router-dom";
import '../component-styles/navbar.css';
import { UserAuth } from "../../context/UserAuthContext.js";

const CustomerLanding = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signin , googleSignIn, user} = UserAuth();

  const handleGoogleSignIn = async() =>{
    setError('');
    try{
      await googleSignIn(); 
    } catch(e){
      setError(e.message);
      console.log(e.message);
    }

  }
  return (
  
    
    <>
    
    <div className="call-box" >

        <div className="holder">

            <h1 className='customer-text'>Track and Pay Electricity Bills Easily with BillEazy</h1>
            <button className='btn-action' onClick={handleGoogleSignIn} ><b>Let's Start</b></button>
        <img className='line-imgx' src={line} alt="......." />
        </div>

   
    </div>
    
    </>

  )
}

export default CustomerLanding