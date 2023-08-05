import React from 'react';
import {Navigate} from "react-router-dom";
import {UserAuth} from '../context/UserAuthContext';



const ProtectedAgentRoutes = ({children}) => {
  const {user} = UserAuth()

  if (!user){
    return <Navigate to='/employees'/>;
  }
  return children;
};

export default ProtectedAgentRoutes
