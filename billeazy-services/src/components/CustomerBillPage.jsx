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
import Table from 'react-bootstrap/Table';
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
    const billsCollectionRef = collection(db,'bills');
    const ticketsCollectionRef = collection(db,`tickets`);
    const [search , setSearch] = useState('')

//get all bills

useEffect(() => {
    const getBills = async () => {
        const q = query(billsCollectionRef, where('email', '==', user.email));
        const data = await getDocs(q);
      const newData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
      }));
      console.log("rendered all bills ");
      console.log(user.email);
      console.log('all bills :'+bill);
      setBill(newData);
    
    };
  
  
      getBills()
    },[])

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
          const q = query(ticketsCollectionRef, where('email', '==',user.email.toString()));
          const data = await getDocs(q);
          const newData = data.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
          }));
          console.log("rendered tickets ");
          setTickets(newData);
        
        };
      
      
          getTickets()
        }, [])


// pending bills
useEffect(() => {
    const getPendingBills = async () => {
      const q = query(billsCollectionRef, where('email', '==', user.email.toString()));
      const qx = query(q, where('paymentStatus', '==', 'pending'));
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
            
            <small className="page-info cc">
                BILL NO : {props.billNo} 
                <div className="my-1">
                    <b className='parax'> Issued By Goa Electricity Department - North Goa , Goa</b>
                </div>
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
 
    
                    
            <div className="table-responsive" >
                <Table responsive striped='columns'>
                    <thead className="bg-none bgc-default-tp1">
                        <tr className="text-white">
                       
                            <th id='thx'>Previous Reading Date</th>
                            <th id='thx'>Previous Reading</th>
                            <th id='thx'>Current Reading Date</th>
                            <th id='thx'>Current Reading</th>
                            <th id='thx'>Unit Type</th>
                            <th width="140" id='thx'>Amount</th>
                        </tr>
                    </thead>

                    <tbody className="text-95 text-secondary-d3">
                        <tr></tr>
                        <tr>
                            
                            <td>{props.prevReadingDate}</td>
                            <td>{props.prevReading}</td>
                            <td>{props.currentReadingDate}</td>
                            <td>{props.currentReading}</td>
                            <td>{props.unit}</td>
                            <td>₹{props.amount}</td>
                            
                        </tr> 
                    </tbody>
                </Table>
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
        
      <div className='table-hold'>
                <div className='my-3'>
                    <Row>
                       
                            <h4 className='fw-semibold title '>Welcome {name} </h4>
                        
                       
                    </Row>
                </div>
                <div id="mtrca-number">
                    <h5 className='green' ><b >CA NO : <span>{caNo}</span> </b></h5>
                    <h5 className='green'> <b >METER NO : <span>{meter}</span>  </b> </h5>
                </div>
                 
            <input style={{fontSize:12, height:44, margin:'.1rem'}}  className='fieldxx' placeholder='Live Search Bill Number ' autoComplete='on' type='text' onChange={(e)=>setSearch(e.target.value)}  />
                <br/>
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
                                <div id='div'>
                                <Table responsive  striped  bordered className='table-hold'>
                                      
                                      <thead>
                                          <tr id='thx'>
                                          
                                          <th  id='thx'>Bill Id</th>
                                          <th  id='thx'>Current reading date</th>
                                          <th  id='thx'>Current reading</th>
                                          <th id='thx'>Previous reading date</th>
                                          <th id='thx'>Previous reading</th>
                                          <th id='thx'>Consumption</th>
                                          <th id='thx'>Unit type</th>
                                          <th id='thx'>Amount Payable</th>
                                          <th id='thx'>Payment Status</th>
                                          <th id='thx'>Action</th>
                                          <th id='thx'>Report</th>

                                          </tr>
                                          
                                      </thead>
                                 
                              
                              {
                                  bill.length>0 ? bill.filter((item)=>{
  
                                      return search.toLocaleLowerCase() === '' ? item : item.billNo.toLocaleLowerCase().includes(search.toLocaleLowerCase()) //||  item.currentReadingDate.toLocaleLowerCase().includes(search.toLocaleLowerCase()) && item.prevReadingDate.toLocaleLowerCase().includes(search.toLocaleLowerCase()) 
                                    }).map((b)=>(
                                      
                                  
                                      <tr>
                                      
                                          <td>{b.billNo}</td>
                                          <td>{b.currentReadingDate}</td>
                                          <td>{b.currentReading}</td>
                                          <td>{b.prevReadingDate}</td>
                                          <td>{b.prevReading}</td>
                                          <td>{b.readingDifference}</td>
                                          <td>{b.unit}</td>
                                          <td>{b.amount}</td>
                                          
                                      <td> {  b.paymentStatus === 'pending' ? <p className='paray'>Pending</p> : <p className='parax'>Paid</p>} </td>
                                      <td> { 
                                          b.paymentStatus === 'pending' ? <input type="button"  onClick={()=>handlePayment(b.amount,b.billNo)} value="Pay" id="btn-contact"/> : <InvoiceModal billNo={b.billNo}  currentReadingDate={b.currentReadingDate}
                                          currentReading={b.currentReading} prevReadingDate={b.prevReadingDate} prevReading={b.prevReading}
                                          readingDifference={b.readingDifference} unit={b.unit} amount={b.amount} paymentStatus={b.paymentStatus} name={name} caNo={caNo} meter={meter} phone={phone}/>  
                                            }
                                          </td>
                                      <td> <ReportModal billNo={b.billNo}  />
                                          </td>
                                      
                                        

                                      </tr>
                                
                                 
                            
                                  ))
                                  :<p className='paray'>No Bills Found</p>
                              }
                                </Table>
                      
                                </div>
                                   

                                
                            </Tab>

                            <Tab eventKey="paid" title="Paid Bills" >
                                <div id='div'>
                                   
                                <Table responsive  striped  bordered className='table-hold'>
                                      
                                      <thead>
                                          <tr id='thx'>
                                          
                                          <th  id='thx'>Bill Id</th>
                                          <th  id='thx'>Current reading date</th>
                                          <th  id='thx'>Current reading</th>
                                          <th id='thx'>Previous reading date</th>
                                          <th id='thx'>Previous reading</th>
                                          <th id='thx'>Consumption</th>
                                          <th id='thx'>Unit type</th>
                                          <th id='thx'>Amount Payable</th>
                                          <th id='thx'>Payment Status</th>
                                          <th id='thx'>Action</th>
                                          <th id='thx'>Report</th>

                                          </tr>
                                          
                                      </thead>
                                 
                              
                              {
                                  billPayed.length>0 ? billPayed.filter((item)=>{
  
                                      return search.toLocaleLowerCase() === '' ? item : item.billNo.toLocaleLowerCase().includes(search.toLocaleLowerCase()) //||  item.currentReadingDate.toLocaleLowerCase().includes(search.toLocaleLowerCase()) && item.prevReadingDate.toLocaleLowerCase().includes(search.toLocaleLowerCase()) 
                                    }).map((bc)=>(
                                      
                                  
                                      <tr>
                                      
                                          <td>{bc.billNo}</td>
                                          <td>{bc.currentReadingDate}</td>
                                          <td>{bc.currentReading}</td>
                                          <td>{bc.prevReadingDate}</td>
                                          <td>{bc.prevReading}</td>
                                          <td>{bc.readingDifference}</td>
                                          <td>{bc.unit}</td>
                                          <td>{bc.amount}</td>
                                          
                                      <td> {  bc.paymentStatus === 'pending' ? <p className='paray'>Pending</p> : <p className='parax'>Paid</p>} </td>
                                      <td> { 
                                          bc.paymentStatus === 'pending' ? <input type="button"  onClick={()=>handlePayment(bc.amount,bc.billNo)} value="Pay" id="btn-contact"/> : <InvoiceModal billNo={bc.billNo}  currentReadingDate={bc.currentReadingDate}
                                          currentReading={bc.currentReading} prevReadingDate={bc.prevReadingDate} prevReading={bc.prevReading}
                                          readingDifference={bc.readingDifference} unit={bc.unit} amount={bc.amount} paymentStatus={bc.paymentStatus} name={name} caNo={caNo} meter={meter} phone={phone}/>  
                                            }
                                          </td>
                                      <td> <ReportModal billNo={bc.billNo}  />
                                          </td>
                                      
                                        

                                      </tr>
                                
                                 
                            
                                  ))
                                  :<p className='paray'>No Paid Bills Found</p>
                              }
                                </Table>
                      
                                    
                                </div>
                            </Tab>
                            <Tab eventKey="pending" title="Pending Bills" >
                               <div id='div'>
                               <Table responsive  striped  bordered className='table-hold'>
                                      
                                      <thead>
                                          <tr id='thx'>
                                          
                                          <th  id='thx'>Bill Id</th>
                                          <th  id='thx'>Current reading date</th>
                                          <th  id='thx'>Current reading</th>
                                          <th id='thx'>Previous reading date</th>
                                          <th id='thx'>Previous reading</th>
                                          <th id='thx'>Consumption</th>
                                          <th id='thx'>Unit type</th>
                                          <th id='thx'>Amount Payable</th>
                                          <th id='thx'>Payment Status</th>
                                          <th id='thx'>Action</th>
                                          <th id='thx'>Report</th>

                                          </tr>
                                          
                                      </thead>
                                 
                              
                              {
                                  billPending.length>0 ? billPending.filter((item)=>{
  
                                      return search.toLocaleLowerCase() === '' ? item : item.billNo.toLocaleLowerCase().includes(search.toLocaleLowerCase()) //||  item.currentReadingDate.toLocaleLowerCase().includes(search.toLocaleLowerCase()) && item.prevReadingDate.toLocaleLowerCase().includes(search.toLocaleLowerCase()) 
                                    }).map((bc)=>(
                                      
                                  
                                      <tr>
                                      
                                          <td>{bc.billNo}</td>
                                          <td>{bc.currentReadingDate}</td>
                                          <td>{bc.currentReading}</td>
                                          <td>{bc.prevReadingDate}</td>
                                          <td>{bc.prevReading}</td>
                                          <td>{bc.readingDifference}</td>
                                          <td>{bc.unit}</td>
                                          <td>{bc.amount}</td>
                                          
                                      <td> {  bc.paymentStatus === 'pending' ? <p className='paray'>Pending</p> : <p className='parax'>Paid</p>} </td>
                                      <td> { 
                                          bc.paymentStatus === 'pending' ? <input type="button"  onClick={()=>handlePayment(bc.amount,bc.billNo)} value="Pay" id="btn-contact"/> : <InvoiceModal billNo={bc.billNo}  currentReadingDate={bc.currentReadingDate}
                                          currentReading={bc.currentReading} prevReadingDate={bc.prevReadingDate} prevReading={bc.prevReading}
                                          readingDifference={bc.readingDifference} unit={bc.unit} amount={bc.amount} paymentStatus={bc.paymentStatus} name={name} caNo={caNo} meter={meter} phone={phone}/>  
                                            }
                                          </td>
                                      <td> <ReportModal billNo={bc.billNo}  />
                                          </td>
                                      
                                        

                                      </tr>
                                
                                 
                            
                                  ))
                                  :<p className='paray'>No Pending Bills Found</p>
                              }
                                </Table>
                                    
                               </div>
                            
                            </Tab>


                            <Tab eventKey="ticket" title="Tickets" >  

                            <div id='div'>
                            <Table responsive bordered  className='table-hold'>
                                    <thead >
                                        <tr id='header'>
                                        
                                            <th  id='thx' >Bill ID</th>
                                            <th  id='thx'>Description</th>
                                            <th  id='thx'>Ticket Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                    tickets.length >0 ?    tickets.filter((item)=>{
        
                                        return search.toLocaleLowerCase() === '' ? item : item.billNo.toLocaleLowerCase().includes(search.toLocaleLowerCase()) //||  item.currentReadingDate.toLocaleLowerCase().includes(search.toLocaleLowerCase()) && item.prevReadingDate.toLocaleLowerCase().includes(search.toLocaleLowerCase()) 
                                      }).map((bx)=>(
                                    <tr>
                                        
                                            <td >{bx.billNo}</td>
                                            <td >{bx.description}</td>
                                            <td >{ bx.status==='pending'? <p className='paray'>Pending</p>: <p className='parax'>Resolved</p>}</td>
                                        </tr>
                                     )) : <p className='paray'> No Tickets Found</p>
                                    }
                                    </tbody>
                                    </Table>
                                </div>          
                                 
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
