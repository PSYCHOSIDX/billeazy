import React from 'react';
import {Navigate} from "react-router-dom";
import {UserAuth} from '../context/UserAuthContext';



const ProtectedAdminRoutes = ({children}) => {
  const {user} = UserAuth()

  if (!user){
    return <Navigate to='/adminlogin' />;
  }
  return children;
};

export default ProtectedAdminRoutes
