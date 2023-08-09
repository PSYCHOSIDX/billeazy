import React, { useState, useEffect } from 'react'
import NavbarLogin from '../components/NavbarLogin'
import Footer from '../components/Footer'
import '../global-styles/global.css'
import { UserAuth } from '../context/UserAuthContext'

import CustomerBillPage from '../components/CustomerBillPage'
import NavbarCustomerLogout from '../components/NavbarCustomerLogout'


import {db} from '../firebaseConfig';
import {collection, getDocs, query, orderBy, where, addDoc} from 'firebase/firestore';

import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Customer = () => {

    const {user} = UserAuth();
    const userId = user.uid;
    const [UserData, setUserData] = useState([0]);
    const [usertype, setType] = useState();
    const consumersCollectionRef = collection(db,`users/${userId}/details`);

    useEffect(() => {
      const getUser = async () => {
        const q = query(consumersCollectionRef, where("usertype", "==", "consumer"));
        const data = await getDocs(q);
        const newData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        console.log("rendered")
        newData.map((m)=>(setType(m.usertype)))
      
      };
    
     
        getUser()
      },)
    
   
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
       {user ? <NavbarCustomerLogout/> : <NavbarLogin/>}
      {usertype && usertype === 'consumer' ? <CustomerBillPage/> : <h1 className='alert-admin'> Loading ..</h1>}
        <Footer/> 
        
      
      </> 
      
  
    )
  }
  
  export default Customer;