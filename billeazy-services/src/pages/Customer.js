import React, { useState, useEffect } from 'react'
import NavbarLogin from '../components/NavbarLogin'
import Footer from '../components/Footer'
import '../global-styles/global.css'
import { UserAuth } from '../context/UserAuthContext'

import CustomerBillPage from '../components/CustomerBillPage'
import NavbarCustomerLogout from '../components/NavbarCustomerLogout'


import {db} from '../firebaseConfig';
import {collection, getDocs, query, orderBy, where, addDoc} from 'firebase/firestore';


const Customer = () => {

    const {user} = UserAuth();
    const userId = user.uid;
    const [UserData, setUserData] = useState([0]);
    const [usertype, setType] = useState();
  

    useEffect(() => {
      const fetchData = async () => {
        
        const UserCollection = collection(db,`users/${userId}/details`);
        const UserSnapshot = await getDocs(UserCollection);
        const UserList = UserSnapshot.docs.map(doc => doc.data());
        setUserData(UserList);
      UserData.map((x)=>(setType(x.usertype)));
      };
      fetchData();
  
      
    },[]);

  
    return (
      <>

       {user ? <NavbarCustomerLogout/> : <NavbarLogin/>}
      {usertype === 'consumer' ? <CustomerBillPage/> : <h1 className='alert-admin'> Loading ..</h1>}
        <Footer/> 
        
      
      </> 
      
  
    )
  }
  
  export default Customer;