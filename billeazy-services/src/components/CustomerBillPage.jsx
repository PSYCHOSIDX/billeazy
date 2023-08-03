import React, { useState, useEffect } from 'react'
import '../components/component-styles/customerpage.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import '../components/component-styles/admin-page.css'
import '../components/component-styles/navbar.css';
import { UserAuth } from '../context/UserAuthContext'
import {db} from '../firebaseConfig';
import {collection, getDocs, query, orderBy, where, addDoc} from 'firebase/firestore';

function CustomerBillPage() {
    const [key, setKey] = useState('all');
    const [name, setName]= useState();
    const [caNo, setcaNo]= useState();
    const [meter, setmeter]= useState();
    const [bill , setBill] = useState([0]);
    const {user} = UserAuth();
    const userId = user.uid;

    const consumersCollectionRef = collection(db,`users/${userId}/details`);
    const billsCollectionRef = collection(db,`bills`);

//get all bills

useEffect(() => {
    const getBills = async () => {
      const q = query(billsCollectionRef, where("email", "==", user.email));
      const data = await getDocs(q);
      const newData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
      }));
      console.log("rendered bills"+ newData);
      setBill(newData);
    
    };
  
  
      getBills()
    }, [])


// get consumer details
    useEffect(() => {
      const getUser = async () => {
        const q = query(consumersCollectionRef, where("usertype", "==", "consumer"));
        const data = await getDocs(q);
        const newData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        console.log("rendered consumer")
        newData.map((m)=>(
            setName(m.consumerName),
            setcaNo(m.consumerAccNo),
            setmeter(m.meterNo)
        ))
      
      };
    
    
        getUser()
      },[])

    return (
        <>
           
            <div className='p-5 '>
                <div className='my-3'>
                    <Row>
                       
                            <h4 className='fw-semibold title '>Welcome {name} </h4>
                        
                       
                    </Row>
                </div>
                <div id="mtrca-number">
                    <h5>CA no. :<span>{caNo}</span></h5>
                    <h5>Meter no. :<span>{meter}</span></h5>
                </div>
                <br/>
                <div>
                    <div  className=''>
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={key}
                            defaultActiveKey="all"
                            onSelect={(k) => setKey(k)}
                            className="mb-3"
                        >
                            <Tab eventKey="all" title="All">
                                <div>
                                    <Stack>
                                        <div className="ListHeadings shadow-none p-2">
                                            <Row>
                                                <Col>Bill Id</Col>
                                                <Col>Current reading date</Col>
                                                <Col>Current reading</Col>
                                                <Col>Previous reading date</Col>
                                                <Col>Previous reading</Col>
                                                <Col>Consumption</Col>
                                                <Col>Amount Payable</Col>
                                                <Col>Status</Col>
                                                <Col>Issue</Col>
                                            </Row>
                                        </div>
                                    </Stack>
                                    {
                                        bill.map((b)=>(
                                            <Stack gap={2}>
                                        <div className="BillsList bg-light shadow-sm p-2">
                                            <Row>
                                            
                                                <Col>{b.billNo}</Col>
                                                <Col>{b.currentReadingDate}</Col>
                                                <Col>{b.currentReading}</Col>
                                                <Col>{b.previousReadingDate}</Col>
                                                <Col>{b.previousReading}</Col>
                                                <Col>{b.readingDifference}</Col>
                                                <Col>{b.amount}</Col>
                                                <Col>{b.paymentStatus}</Col>
                                                <Col><a class="bn60" href="/">Report</a></Col>

                                            </Row>
                                        </div>
                                       
                                    </Stack>
                                        ))
                                    }
                                    
                                </div>
                            </Tab>
                            <Tab eventKey="pending" title="Pending">
                                <div>
                                    <Stack>
                                        <div className="ListHeadings shadow-none p-2">
                                            <Row>
                                                <Col>Bill Id</Col>

                                                <Col>Current reading date</Col>
                                                <Col>Current reading</Col>
                                                <Col>Previous reading date</Col>
                                                <Col>Previous reading</Col>
                                                <Col>Consumption</Col>
                                                <Col>Amount Payable</Col>
                                                <Col>Status</Col>
                                            </Row>
                                        </div>
                                    </Stack>


                                    <Stack gap={2}>
                                        <div className="BillsList bg-light shadow-sm p-2">
                                            <Row>
                                                <Col>0000</Col>

                                                <Col>dd/mm/yy</Col>
                                                <Col>0000</Col>
                                                <Col>dd/mm/yy</Col>
                                                <Col>0000</Col>
                                                <Col>00</Col>
                                                <Col>--</Col>
                                                <Col>Pending</Col>
                                            </Row>
                                        </div>
                                    </Stack>
                                </div>
                            </Tab>
                            <Tab eventKey="paid" title="Paid">
                                <Stack>
                                    <div className="ListHeadings shadow-none p-2">
                                        <Row>
                                            <Col>Bill Id</Col>

                                            <Col>Current reading date</Col>
                                            <Col>Current reading</Col>
                                            <Col>Previous reading date</Col>
                                            <Col>Previous reading</Col>
                                            <Col>Consumption</Col>
                                            <Col>Amount Payable</Col>
                                            <Col>Status</Col>
                                        </Row>
                                    </div>
                                </Stack>

                                <Stack gap={2}>
                                    <div className="BillsList bg-light shadow-sm p-2">
                                        <Row>
                                            <Col>0000</Col>

                                            <Col>dd/mm/yy</Col>
                                            <Col>0000</Col>
                                            <Col>dd/mm/yy</Col>
                                            <Col>0000</Col>
                                            <Col>00</Col>
                                            <Col>--</Col>
                                            <Col>Pending</Col>
                                        </Row>
                                    </div>
                                </Stack>
                            </Tab>

                        </Tabs>

                    </div>
                </div>
            </div>


        </>
    );
}









export default CustomerBillPage;
