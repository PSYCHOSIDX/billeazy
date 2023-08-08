
import React, { useState, useEffect } from 'react'
import { UserAuth } from '../context/UserAuthContext'
import NavbarCustomerLogout from '../components/NavbarCustomerLogout'
import Footer from '../components/Footer';
import NavbarLogin from '../components/NavbarLogin';

import Form from 'react-bootstrap/Form';
import '../components/component-styles/customer-landing.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

import { db } from '../firebaseConfig';
import { collection, getDocs, query, orderBy, where, addDoc, setDoc } from 'firebase/firestore';


import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const AddCustomerConnection = () => {
  const [show, setShow] = useState(0);
  const [userData, setUserData] = useState([0]);
  const [userDetail, setDetail] = useState();

  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const [error, setError] = useState("");
  const consumersCollectionRef = collection(db, "consumers");
  const { user } = UserAuth();
  const [linkInfo, setLinkInfo] = useState('');
  const userId = user.uid;



  //checked if account is linked



  useEffect(() => {

    const fetchData = async () => {

      const userCollection = collection(db, `users/${userId}/details`);
      const userSnapshot = await getDocs(userCollection);
      const userList = userSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log('hello :' + userList);
      userList.map((x) => (setDetail(x)));
      try {
        toast('Verifying ..', {
          position: "top-right",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });

        { userDetail && userDetail.status == 'verified_consumer' ? navigate('/customer') : setShow(1) }

      } catch (err) {
        console.log(err)
      }

    }


    fetchData();


  });





  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const getOtp = async () => {
        const q = query(consumersCollectionRef, where("link_otp", "==", parseInt(pin)));
        //  const qmain = query(q,where("email", "==", user.email));
        const data = await getDocs(q);
        const newData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        
        newData.map((x) => (setLinkInfo(x)));
        if (user.email == linkInfo.email && pin == linkInfo.link_otp) {
          

          const handleLink = async (e) => {
            try {
              await addDoc(collection(db, `users/${userId}/details`), {
                consumerAccNo: linkInfo.consumerAccNo,
                consumerName: linkInfo.name,
                telephoneNo: linkInfo.telephoneNo,
                address: linkInfo.address,
                meterNo: linkInfo.meterNo,
                email: linkInfo.email,
                status: 'verified_consumer',
                usertype: 'consumer'
              });
              
              toast.success('Account Linked Successfully !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            } catch (error) {
              console.log(error.message);
            }

          }
          handleLink();
        } else {
          toast.error('Link Failed !', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }

      };

      getOtp();

    }
    catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };


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

      {user ? <NavbarCustomerLogout /> : <NavbarLogin />}

      {show === 1 ?

        <Card className='car-card' bg='light'>


          <Card.Body >


            <Form xs="auto" className='form-admin' onSubmit={handleSubmit}>
              <Card.Title className='title'>Customer Connection</Card.Title>


              <Form.Group className="mb-3 none " controlId="formBasicPassword">


                <Form.Control style={{ fontSize: 12, height: 44, margin: '.1rem' }} className='field' placeholder='Enter Link OTP' autoComplete='on' type='number' onChange={(e) => setPin(e.target.value)} required />

                <Button type='submit' id='btn-action-admin'> Submit</Button>

              </Form.Group>



            </Form>
          </Card.Body>
        </Card> : <h3 className='alert-admin'> Access Denied </h3>

      }

      <Footer />
    </>



  )
}

export default AddCustomerConnection