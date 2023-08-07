import React, { useState, useEffect } from 'react'
import '../components/component-styles/customerpage.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import '../components/component-styles/admin-page.css'
import '../components/component-styles/navbar.css';
import '../components/component-styles/invoice.css';
import { UserAuth } from '../context/UserAuthContext'
import {db} from '../firebaseConfig';
import {collection, getDocs, query, orderBy, where, addDoc, getDoc, updateDoc ,setDoc, doc} from 'firebase/firestore';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

import logo from '../assets/logo.png'
//print to pdf
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import shortid from "shortid";
import '../global-styles/global.css'

function CustomerBillPage() {
    const [key, setKey] = useState('all');
    const [name, setName]= useState();
    const [phone, setPhone]= useState();
    const [caNo, setcaNo]= useState();
    const [meter, setmeter]= useState();
    const [bill , setBill] = useState([0]);
    const [billPayed , setBillPayed] = useState([0]);
    const [billPending , setBillPending] = useState([0]);
    const {user} = UserAuth();
    const userId = user.uid;
    const [tickets, setTickets]= useState([0]);
    const consumersCollectionRef = collection(db,`users/${userId}/details`);
    const billsCollectionRef = collection(db,`bills`);
    const ticketsCollectionRef = collection(db,`tickets`);
    

//get all bills

useEffect(() => {
    const getBills = async () => {
        const q = query(billsCollectionRef, where('email', '==', user.email));
        const qx = query(billsCollectionRef, where('paymentStatus', '==', 'paid'||'pending'));
        const data = await getDocs(qx);
      const newData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
      }));
      console.log("rendered all bills ");
      setBill(newData);
    
    };
  
  
      getBills()
    }, [ ])

//paid bills
    useEffect(() => {
        const getPaidBills = async () => {
          const q = query(billsCollectionRef, where('email', '==', user.email));
          const qx = query(billsCollectionRef, where('paymentStatus', '==', 'paid'));
          const data = await getDocs(qx);
          const newData = data.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
          }));
          console.log("rendered payed bills ");
          setBillPayed(newData);
        
        };
      
      
          getPaidBills()
        }, [])


//get all tickets
    useEffect(() => {
        const getTickets = async () => {
          const q = query(ticketsCollectionRef, where('email', '==', user.email));
          const data = await getDocs(q);
          const newData = data.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
          }));
          console.log("rendered payed bills ");
          setTickets(newData);
        
        };
      
      
          getTickets()
        }, [])


// pending bills
useEffect(() => {
    const getPendingBills = async () => {
      const q = query(billsCollectionRef, where('email', '==', user.email));
      const qx = query(billsCollectionRef, where('paymentStatus', '==', 'pending'));
      const data = await getDocs(qx);
      const newData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
      }));
      console.log("rendered pending bills ");
      setBillPending(newData);
    
    };
  
  
      getPendingBills()
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
            setmeter(m.meterNo),
            setPhone(m.telephoneNo)
        ))
      
      };
    
    
        getUser()
      },[])




//payments


const paymentUpdate = async (billNo , payx) => {
  
    const q = query(billsCollectionRef,where('billNo', '==', billNo));
  const data = (await getDocs(q)).docs[0].ref;

     try{
     
        console.log('triggered update')
        await updateDoc(data, {
          paymentStatus: 'paid' ,
          paymentID:payx
        });
      
     } catch(error){
      alert(error)
     }
     
    
  };

const handlePayment =(amount, billNo) =>{
    
    if( amount === ""){
      alert('please enter a valid amount');
    } else {
      var options = {
        key: process.env.REACT_APP_RAYZORPAY_KEYID ,
        key_secret: process.env.REACT_APP_RAYZORPAY_SECRET ,
        amount: amount*100 ,
        currency:"INR",
        name:"Bill Eazy",
        receipt:'receipt'+shortid.generate() ,
        handler: function(response){
        if(response.razorpay_payment_id){
        paymentUpdate(billNo, response.razorpay_payment_id);
        alert("Payment Success");
        } else { console.log('failure');
        alert("Payment Failure")
      }
        
        },
        prefill:{
          name: user.displayName,
          email: user.email,
      },
      notes:{
        address: "Razorpay corporate Office",
      },
      theme:{
        color:'#00FFA3'
      }
    };
  
    var pay = new window.Razorpay(options);
    pay.open()
  
   } 
  }


//modal for invoice

function InvoiceModal(props) {

 

        const downloadPdfDocument = () => {
            const input = document.getElementById("print-page");
            html2canvas(input)
                .then((canvas) => {
                    const imgWidth=209;
                    const imgHeight=canvas.height * imgWidth/ canvas.width;
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF();
                    pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
                    pdf.save(`Invoice.pdf`);
                    
                })
        }
    

    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   const [fullscreen, setx] = useState(true)
    return (
      <>
        <Button id='btn-contact' onClick={handleShow}>
           View
        </Button>
  
        <Modal show={show} onHide={handleClose}  size="lg" className='modal-invoice'>
          <Modal.Header closeButton>
            <Modal.Title className='invoice'> <b>INVOICE DETAILS </b></Modal.Title>
          </Modal.Header>
  
          <Modal.Body className='body-invoice'>

          <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

<div className="page-content container" id="print-page" >
    <div className="page-header text-blue-d2">
        <h1 className="page-title text-secondary-d1">
            
            <small className="page-info">
                BILL NO : {props.billNo}
            </small>
        </h1>

        <div className="page-tools">
            
        </div>
    </div>

    <div className="container px-0">
        <div className="row mt-4">
            <div className="col-12 col-lg-12">
                <div className="row">
                    <div className="col-12">
                        <div className="text-center text-150">
                            <img className='logo' src={logo}/>
                        </div>
                    </div>
                </div>
              

                <hr className="row brc-default-l1 mx-n1 mb-4" />

                <div className="row">
                    <div className="col-sm-6">
                        <div>
                            <span className="text-sm text-grey-m2 align-middle">To: </span>
                            <span className=" text-blue ">{props.name}</span>
                        </div>
                        <div className="text-grey-m2">
                            <div className="my-1">
                                Street, City
                            </div>
                            <div className="my-1">
                                North-Goa, Goa, India 
                            </div>
                            <div className="my-1"><i className="fa fa-phone fa-flip-horizontal "></i> <b className="text-600">{props.phone}</b></div>
                        </div>
                    </div>
                   

                    <div className="text-95 col-sm-6 align-self-start d-sm-flex justify-content-end">
                        <hr className="d-sm-none" />
                        <div className="text-grey-m2">
                            <div className="mt-1 mb-2 text-secondary-m1 text-600 text-125">
                                Invoice
                            </div>

                            <div className="my-2"> <span className="text-600 text-90">CA NO :</span> {props.caNo}</div>

                            <div className="my-2"> <span className="text-600 text-90">METER NO :</span> {props.meter}</div>

                            <div className="my-2"> <span className="text-600 text-90">Status:</span> <span className="badge ">{props.paymentStatus}</span></div>
                        </div>
                    </div>
            
                </div>
 
    
                    
            <div className="table-responsive">
                <table className="table table-striped table-borderless border-0 border-b-2 brc-default-l1">
                    <thead className="bg-none bgc-default-tp1">
                        <tr className="text-white">
                            <th className="opacity-2"></th>
                            <th>Previous Reading Date</th>
                            <th>Previous Reading</th>
                            <th>Current Reading Date</th>
                            <th>Current Reading</th>
                            <th>Unit Type</th>
                            <th width="140">Amount</th>
                        </tr>
                    </thead>

                    <tbody className="text-95 text-secondary-d3">
                        <tr></tr>
                        <tr>
                            <td> </td>
                            <td>{props.previousReadingDate}</td>
                            <td>{props.previousReading}</td>
                            <td>{props.currentReadingDate}</td>
                            <td>{props.currentReading}</td>
                            <td>{props.unit}</td>
                            <td>₹{props.amount}</td>
                            
                        </tr> 
                    </tbody>
                </table>
            </div>
           

                    <div className="row mt-3">
                        <div className="col-12 col-sm-7 text-grey-d2 text-95 mt-2 mt-lg-0 white">
                         **  Bill Eazy Payment Invoice **
                        </div>

                        <div className="col-12 col-sm-5 text-grey text-90 order-first order-sm-last">
                            

                        

                            <div className="row my-2 align-items-center bgc-primary-l3 p-2 white">
                                <div className="col-7 text-right">
                                    Total Amount
                                </div>
                                <div className="col-5">
                                    <span className="text-150 text-success-d3 opacity-2 white">₹{props.amount}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr />

                    <div>
                        <span className="text-secondary-d1 text-105">Thank you for your business</span>
                       
                    </div>
                </div>
            </div>
        </div>
    </div>

  
          </Modal.Body>
  
          <Modal.Footer>
  
          <div className="action-buttons">
               
               <a onClick={downloadPdfDocument}  id='btn-report' href="#" data-title="PDF">
                   <i className="mr-1 fa fa-file-pdf-o text-danger-m1 text-120 w-2"></i> <span/>
                   Export
               </a>
           </div>
            
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  



  
//modal for Reporting

function ReportModal(props) {



const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const[description, setDescription] = useState('');
const [fullscreen, setx] = useState(true);


const pushTicket = async e =>{
  
    //add data validation here
    const newTicket = {
      billNo: props.billNo,
      email: user.email,
      description: description,
       status:'pending'
    };

    try{
        await addDoc(collection(db, "tickets"), {
          ...newTicket
        });
        alert('Ticket Submitted')
    }catch(error){
        console.log(error);
    }

}

return (
  <>
    <Button id='btn-report' onClick={handleShow}>
       Report
    </Button>

    <Modal show={show} onHide={handleClose}  size="lg" className='modal-invoice'>
      <Modal.Header closeButton>
        <Modal.Title className='title-modal'> Report </Modal.Title>
      </Modal.Header>

      <Modal.Body >

            <h3>Describe Issue</h3>
            
            <input style={{fontSize:12, height:44, margin:'.1rem'}}  className='fieldxx' placeholder='please type issue here' autoComplete='on' type='textarea' onChange={(e)=>setDescription(e.target.value)} required />

      </Modal.Body>

      <Modal.Footer>

      <div className="action-buttons">
           
           <a id='btn-contact' onClick={pushTicket}> Raise</a>
       </div>
        
      </Modal.Footer>
    </Modal>
  </>
);
}


    return (
        <>
        <Card id='cardx'>
      <Card.Body>  
        
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
                    <div  >
                        <Tabs
                        
                            id="controlled-tab-example "
                            size="lg sm"
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
                                                <Col>Unit type</Col>
                                                <Col>Amount Payable</Col>
                                                <Col>Payment Status</Col>
                                                <Col>Action</Col>
                                                <Col>Report</Col>
                                                
                                                
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
                                                <Col>{b.unit}</Col>
                                                <Col>{b.amount}</Col>
                                                
                                            <Col> {  b.paymentStatus === 'pending' ? <p className='paray'>Pending</p> : <p className='parax'>Paid</p>} </Col>
                                            <Col> { 
                                                b.paymentStatus === 'pending' ? <input type="button"  onClick={()=>handlePayment(b.amount,b.billNo)} value="Pay" id="btn-contact"/> : <InvoiceModal billNo={b.billNo}  currentReadingDate={b.currentReadingDate}
                                                currentReading={b.currentReading} previousReadingDate={b.previousReadingDate} previousReading={b.previousReading}
                                                readingDifference={b.readingDifference} unit={b.unit} amount={b.amount} paymentStatus={b.paymentStatus} name={name} caNo={caNo} meter={meter} phone={phone}/>  
                                                  }
                                                </Col>
                                            <Col> <ReportModal billNo={b.billNo}  />
                                                </Col>
                                            
                                              

                                            </Row>
                                        </div>
                                       
                                    </Stack>
                                        ))
                                    }
                                    
                                </div>
                            </Tab>

                            <Tab eventKey="paid" title="Paid Bills" >
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
                                                <Col>Unit type</Col>
                                                <Col>Amount Payable</Col>
                                                <Col>Payment Status</Col>
                                                <Col>Action</Col>
                                                <Col>Report</Col>
                                                
                                            </Row>
                                        </div>
                                    </Stack>


                                    {
                                        billPayed.map((px)=>(
                                            <Stack gap={3}>
                                        <div className="pxillsList pxg-light shadow-sm p-2">
                                            <Row>
                                                <Col>{px.billNo}</Col>
                                                <Col>{px.currentReadingDate}</Col>
                                                <Col>{px.currentReading}</Col>
                                                <Col>{px.previousReadingDate}</Col>
                                                <Col>{px.previousReading}</Col>
                                                <Col>{px.readingDifference}</Col>
                                                <Col>{px.unit}</Col>
                                                <Col>{px.amount}</Col>
                                                <Col> {  px.paymentStatus === 'pending' ? <p className='paray'>Pending</p> : <p className='parax'>Paid</p>} </Col>
                                            <Col> { 
                                                px.paymentStatus === 'pending' ? <input type="button"  onClick={()=>handlePayment(px.amount,px.billNo)} value="Pay" id="btn-contact"/> : <InvoiceModal billNo={px.billNo}  currentReadingDate={px.currentReadingDate}
                                                currentReading={px.currentReading} previousReadingDate={px.previousReadingDate} previousReading={px.previousReading}
                                                readingDifference={px.readingDifference} unit={px.unit} amount={px.amount} paymentStatus={px.paymentStatus} name={name} caNo={caNo} meter={meter} phone={phone}/>  
                                                  }
                                                </Col>
                                            <Col> <ReportModal billNo={px.billNo} />
                                                </Col>

                                            </Row>
                                        </div>
                                       
                                    </Stack>
                                        ))
                                    }
                                    
                                </div>
                            </Tab>
                            <Tab eventKey="pending" title="Pending Bills" >
                                <Stack>
                                    <div className="ListHeadings shadow-none p-2">
                                        <Row>
                                                <Col>Bill Id</Col>
                                                <Col>Current reading date</Col>
                                                <Col>Current reading</Col>
                                                <Col>Previous reading date</Col>
                                                <Col>Previous reading</Col>
                                                <Col>Consumption</Col>
                                                <Col>Unit type</Col>
                                                <Col>Amount Payable</Col>
                                                <Col>Payment Status</Col>
                                                <Col>Action</Col>
                                                <Col>Report</Col>
                                                
                                        </Row>
                                    </div>
                                </Stack>

                                {
                                        billPending.map((bx)=>(
                                            <Stack gap={2}>
                                        <div className="BillsList bg-light shadow-sm p-2">
                                            <Row>
                                            
                                                <Col>{bx.billNo}</Col>
                                                <Col>{bx.currentReadingDate}</Col>
                                                <Col>{bx.currentReading}</Col>
                                                <Col>{bx.previousReadingDate}</Col>
                                                <Col>{bx.previousReading}</Col>
                                                <Col>{bx.readingDifference}</Col>
                                                <Col>{bx.unit}</Col>
                                                <Col>{bx.amount}</Col>
                                                <Col> {  bx.paymentStatus === 'pending' ? <p className='paray'>Pending</p> : <p className='parax'>Paid</p>} </Col>
                                            <Col> { 
                                                bx.paymentStatus === 'pending' ? <input type="button"  onClick={()=>handlePayment(bx.amount,bx.billNo)} value="Pay" id="btn-contact"/> : <InvoiceModal billNo={bx.billNo}  currentReadingDate={bx.currentReadingDate}
                                                currentReading={bx.currentReading} previousReadingDate={bx.previousReadingDate} previousReading={bx.previousReading}
                                                readingDifference={bx.readingDifference} unit={bx.unit} amount={bx.amount} paymentStatus={bx.paymentStatus} name={name} caNo={caNo} meter={meter} phone={phone}/>  
                                                  }
                                                </Col>
                                            <Col> <ReportModal billNo={bx.billNo}  />
                                                </Col>
                                            </Row>
                                        </div>
                                       
                                    </Stack>
                                        ))
                                    }
                                    
                            </Tab>


                            <Tab eventKey="ticket" title="Tickets" >
                                <Stack>
                                    <div className="ListHeadings shadow-none p-2">
                                        <Row>
                                                <Col>Bill ID</Col>
                                                <Col>Decription</Col>
                                                <Col>Status</Col>            
                                        </Row>
                                    </div>
                                </Stack>

                                {
                                        tickets.map((bx)=>(
                                            <Stack gap={2}>
                                        <div className="BillsList bg-light shadow-sm p-2">
                                            <Row>
                                            
                                                <Col>{bx.billNo}</Col>
                                                <Col>{bx.description}</Col>
                                                <Col>{ bx.status==='pending'? <p className='paray'>Pending</p>: <p className='parax'>Resolved</p>}</Col>
                                                
                                            </Row>
                                        </div>
                                       
                                    </Stack>
                                        ))
                                    }
                                    
                            </Tab>


                        </Tabs>

                    </div>
                </div>
            </div>
      </Card.Body>
    </Card>
           


        </>
    );
}









export default CustomerBillPage;
