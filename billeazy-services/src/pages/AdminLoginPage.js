import React from 'react'
import AdminLogin from '../components/AdminLogin'

import NavbarBasic from '../components/NavbarBasic'
import { UserAuth } from '../context/UserAuthContext'
import Footer from '../components/Footer'
import '../global-styles/global.css'
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const AdminLoginPage = () => {
  const {user} = UserAuth();
  
  { !user&&toast('Welcome To BillEazy Admin Portal', {
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
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    />
  <NavbarBasic/>
    <AdminLogin />
    <Footer/>
   </>
   
  )
}

export default AdminLoginPage