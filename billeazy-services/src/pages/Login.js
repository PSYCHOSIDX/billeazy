import { useState } from "react";
import { UserAuth } from '../context/UserAuthContext'
import {  useNavigate } from "react-router-dom";

const Login = () => {

    const [username,setUsername] = useState("")
    const [passkey,setPasskey] = useState("")
    const [password,setPassword] = useState("")
    const {signin, createUser} = UserAuth();
    const navigate = useNavigate();
    return (
      <>

        Username: <input onChange={(e) => setUsername(e.target.value)}/>
        {/* First Time Passkey: <input onChange={(e) => setPasskey(e.target.value)}/> */}
        Password: <input onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={()=>{
          try {
            createUser(username,password,passkey);
          } catch (error) {
            console.log(error);
          }
          // navigate("/admin")
        }}>SignUp</button>
        <button onClick={()=>{
          try {
            signin(username,password);
          } catch (error) {
            console.log(error);
          }
          // navigate("/admin")
        }}>SignIn</button>
      </>
      
    )
  }
export default Login;