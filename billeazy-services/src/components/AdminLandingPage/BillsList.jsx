import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import '../component-styles/admin-page.css';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, updateDoc, doc, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { generateAmount } from '../../utils/billGeneration';
import { getBillingPeriod } from '../../utils/billGeneration';
import Table from 'react-bootstrap/Table';

function BillsList() {
    const [key, setKey] = useState('all');
    const [pendingTickets, setPendingTickets] = useState(null);
    const [resolvedTickets, setResolvedTickets] = useState(null);
    const [bill , setBill] = useState([0]);
    const [billPaid , setBillPaid] = useState([0]);
    const [billPending , setBillPending] = useState([0]);
    const [agentRecords , setAgents] = useState([0]);

    //used for ticket resolution
    const [billData, setBillData] = useState();
    const [dueDate, setDueDate] = useState();
    const [currentReadingDate, setCurrentReadingDate] = useState();
    const [currentReading, setCurrentReading] = useState();
    const [readingDifference, setReadingDifference] = useState();
    const [billingPeriod, setBillingPeriod] = useState();
    const [amount, setAmount] = useState();
    const [billPath, setBillPath] = useState();

    //used for ticket resolution
    const [showResolve, setShowResolve] = useState(false);
    const handleCloseResolve = () => setShowResolve(false);
    const handleShowResolve = () => setShowResolve(true);
    const [customer, setCustomers]= useState([0]);
    const [search , setSearch] = useState('');
    const billsCollectionRef = collection(db,`bills`);
    const agentsCollectionRef = collection(db,`employees`);

    const handleGetTickets = async e => {
        const getPendingTickets = await getDocs(query(collection(db, "tickets"), where("status", "==", "pending")));
        setPendingTickets(getPendingTickets.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const getResolvedTickets = await getDocs(query(collection(db, "tickets"), where("status", "==", "resolved")));
        setResolvedTickets(getResolvedTickets.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }

    //used for resolution
    const getBillData = async (billNo) => {

        const getBill = await getDocs(query(collection(db, "bills"), where("billNo", "==", billNo)));
        const billData = getBill.docs[0].data();

        setDueDate(getBill.docs[0].data().dueDate);
        setCurrentReading(getBill.docs[0].data().currentReading);
        setCurrentReadingDate(getBill.docs[0].data().currentReadingDate);
        setReadingDifference(getBill.docs[0].data().readingDifference);
        setBillingPeriod(getBill.docs[0].data().billingPeriod);
        setAmount(getBill.docs[0].data().amount);

        setBillData(billData);
        setBillPath(getBill.docs[0].ref.path);
    };

     //used for resolution
     const updateAmount = async(meterNo,readingDifference) => {
        
        const getConsumer = await getDocs(query(collection(db, "consumers"), where("meterNo", "==", `${meterNo}`)));

        const consumerRef = getConsumer.docs[0].data();

        const amount = await generateAmount(consumerRef.tariffCategory, consumerRef.tension, readingDifference, consumerRef.sanctionedLoad);

        console.log(amount);
        setAmount(amount);
    };
    
    //used for resolution
    const handleResolution = async(id) => {

        await updateDoc(doc(db,billPath), {
                dueDate : dueDate,
                currentReadingDate : currentReadingDate ,
                currentReading : currentReading ,
                readingDifference : readingDifference ,
                billingPeriod : billingPeriod,
                amount : amount 
            });
        await updateDoc(doc(db, `tickets/${id}`), {
                status: "resolved"
            });
            handleGetTickets()
    
    };


    useEffect(() => {
        handleGetTickets();
    }, [])
    useEffect(() => {
        console.log(pendingTickets);
    }, [pendingTickets])

    // get agents details
    useEffect(() => {
        const getAgents = async () => {
            const q = query(agentsCollectionRef);
            const data = await getDocs(q);
            const newData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
         //   console.log("rendered agents:"+ newData);
            setAgents(newData);
        
        };
        
        
            getAgents()
        },[])

    //get all bills
    useEffect(() => {
        const getBills = async () => {
        const q = query(billsCollectionRef);
        const data = await getDocs(q);
        const newData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        console.log("rendered bills ");
        setBill(newData);
        
        };
    
    
        getBills()
        }, [])

    //paid bills
    useEffect(() => {
        const getPaidBills = async () => {
            const qx = query(billsCollectionRef, where('paymentStatus', '==', 'paid'));
            const data = await getDocs(qx);
            const newData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            console.log("rendered paid bills ");
            setBillPaid(newData);
        };
        
        
            getPaidBills()
        }, [])


    // pending bills
    useEffect(() => {
        const getPendingBills = async () => {
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




        useEffect(() => {
            const getCustomers = async () => {
            const qx = query(collection(db, 'consumers'));
            const data = await getDocs(qx);
            const newData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            console.log("rendered pending bills ");
            setCustomers(newData)
            
            };
    
            getCustomers()
            }, [])

    return (

        <>
         <input style={{fontSize:12, height:44, margin:'.1rem'}}  className='fieldxx' placeholder='Live Search Bill Number ' autoComplete='on' type='text' onChange={(e)=>setSearch(e.target.value)}  />
                <br/>
         <div>
            <div className='my-4'>
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    defaultActiveKey="all"
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                >
                    <Tab eventKey="all" title="Customers">
                    <div id='div'>
                            <Table responsive bordered  className='table-hold'>
                                    <thead >
                                        <tr id='header'>
                                        <th  id='thx'>CA No</th>
                                        <th  id='thx'>Meter No</th>
                                        <th  id='thx'>Name</th >
                                        <th  id='thx'>Telephone No</th >
                                        <th  id='thx'>Email</th>
                                        <th  id='thx'>Address</th>
                                        <th id='thx'>Energization Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                {
                                   customer.length>0 ? customer.map((ag)=>(
                                        <tr className="records bg-light shadow-sm p-2">
                                            
                                                <td>{ag.consumerAccNo}</td>
                                                <td>{ag.meterNo}</td>
                                                <td>{ag.name}</td>
                                                <td>{ag.telephoneNo}</td>
                                                <td>{ag.email}</td>
                                                <td>{ag.address}</td>
                                                <td>{ag.energizationDate}</td>
                                            
                                        </tr>
                                    ))
                                : <p className='paray'> No Employees Found</p>
                            }
                            </tbody>
                            </Table>
                           
                        </div>
                    </Tab>
                    <Tab eventKey="agents" title="Employees">

                    <div id='div'>
                            <Table responsive bordered  className='table-hold'>
                                    <thead >
                                        <tr id='header'>
                                        <th  id='thx'>Agent ID</th>
                                        <th  id='thx'>Name</th >
                                        <th  id='thx'>Contact No</th >
                                        <th  id='thx'>Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                {
                                    agentRecords.length>0 ? agentRecords.map((ag)=>(
                                        <tr className="records bg-light shadow-sm p-2">
                                            
                                                <td>{ag.agentId}</td>
                                                <td>{ag.name}</td>
                                                <td>{ag.telephoneNo}</td>
                                                <td>{ag.email}</td>
                                            
                                        </tr>
                                    ))
                                : <p className='paray'> No Employees Found</p>
                            }
                            </tbody>
                            </Table>
                           
                        </div>
                    </Tab>
                    <Tab eventKey="pending" title="Pending Bills">
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
                                        

                                          </tr>
                                          
                                      </thead>
                                 
                              
                              {
                                  billPending.length>0 ? billPending.filter((item)=>{
  
                                      return search.toLocaleLowerCase() === '' ? item : item.billNo.toLocaleLowerCase().includes(search.toLocaleLowerCase()) //||  item.currentReadingDate.toLocaleLowerCase().includes(search.toLocaleLowerCase()) && item.previousReadingDate.toLocaleLowerCase().includes(search.toLocaleLowerCase()) 
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
                                     
                                      
                                        

                                      </tr>
                                
                                 
                            
                                  ))
                                  :<p className='paray'>No Pending Bills Found</p>
                              }
                                </Table>
                                    
                               </div>
                            
                    </Tab>
                    <Tab eventKey="paid" title="Paid Bills">
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
                                        

                                          </tr>
                                          
                                      </thead>
                                 
                              
                              {
                                  billPaid.length>0 ? billPaid.filter((item)=>{
  
                                      return search.toLocaleLowerCase() === '' ? item : item.billNo.toLocaleLowerCase().includes(search.toLocaleLowerCase()) //||  item.currentReadingDate.toLocaleLowerCase().includes(search.toLocaleLowerCase()) && item.previousReadingDate.toLocaleLowerCase().includes(search.toLocaleLowerCase()) 
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
                                     
                                      
                                        

                                      </tr>
                                
                                 
                            
                                  ))
                                  :<p className='paray'>No Pending Bills Found</p>
                              }
                                </Table>
                                    
                               </div>
                            
                    </Tab>
                    <Tab eventKey="pendingtickets" title="Pending Tickets">

                        <div id='div'>
                            <Table responsive bordered  className='table-hold'>
                                <thead>
                                    <tr id='header'>
                                        <th id='thx'>Ticket ID</th >
                                        <th id='thx'>Bill Number</th >
                                        <th id='thx'>Consumer E-mail</th >
                                        <th id='thx'>Description</th >
                                        <th id='thx'>Action</th >
                                    </tr>
                                </thead>
                           
                            {pendingTickets?.length > 0 ? (
                                pendingTickets.filter((item)=>{
  
                                    return search.toLocaleLowerCase() === '' ? item : item.billNo.toLocaleLowerCase().includes(search.toLocaleLowerCase()) //||  item.currentReadingDate.toLocaleLowerCase().includes(search.toLocaleLowerCase()) && item.previousReadingDate.toLocaleLowerCase().includes(search.toLocaleLowerCase()) 
                                  }).map(ticket => {
                                    return (
                                        <tbody >
                                            <tr>
                                                <td>{ticket.id}</td>
                                                <td>{ticket.billNo}</td>
                                                <td>{ticket.email}</td>
                                                <td>{ticket.description}</td>
                                                <td><Button className='AdminActionButtons' variant="outline-primary" id='btn-contact' onClick={function (e) {
                                                    handleShowResolve(); getBillData(ticket.billNo) ;
                                                }}>
                                                    Resolve
                                                </Button>
                
                                                <Modal show={showResolve} onHide={handleCloseResolve}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>Resolve Dicrepancy</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            {billData?  <div className='forms'>
                                                                <Form>
                                                                    <Form.Group as={Row} className="mb-3" controlId="FormElementConsumerAccNo">
                                                                        <Form.Label column sm={4}>
                                                                            Consumer Account Number
                                                                        </Form.Label>
                                                                        <Col sm={8}>
                                                                            <Form.Label>{billData.consumerAccNo}</Form.Label>
                                                                        </Col>
                                                                    </Form.Group>

                                                                    <Form.Group as={Row} className="mb-3" controlId="FormElementMeterNo">
                                                                        <Form.Label column sm={4}>
                                                                            Meter Number
                                                                        </Form.Label>
                                                                        <Col sm={8}>
                                                                            <Form.Label>{billData.meterNo}</Form.Label>                                                    </Col>
                                                                    </Form.Group>

                                                                    <Form.Group as={Row} className="mb-3" controlId="FormElementConsumerAddress">
                                                                        <Form.Label column sm={4}>
                                                                            Bill Number
                                                                        </Form.Label>
                                                                        <Col sm={8}>
                                                                            <Form.Label>{billData.billNo}</Form.Label>
                                                                        </Col>
                                                                    </Form.Group>

                                                                    <Form.Group as={Row} className="mb-3" controlId="FormElementBillDate">
                                                                        <Form.Label column sm={4}>
                                                                            Bill Date
                                                                        </Form.Label>
                                                                        <Col sm={8}>
                                                                            <Form.Label>{billData.billDate}</Form.Label>
                                                                        </Col>
                                                                    </Form.Group>

                                                                    <Form.Group as={Row} className="mb-3" controlId="FormElementConsumerEmail">
                                                                        <Form.Label column sm={4}>
                                                                            Due Date
                                                                        </Form.Label>
                                                                        <Col sm={8}>
                                                                            <Form.Control type="date" /* id="billId" */ name="dueDate" value={dueDate} onChange={e => setDueDate(e.target.value)} />
                                                                        </Col>
                                                                    </Form.Group>

                                                                    <Form.Group as={Row} className="mb-3" controlId="FormElementConsumerEnergization">
                                                                        <Form.Label column sm={4}>
                                                                            Unit
                                                                        </Form.Label>
                                                                        <Col sm={8}>
                                                                            <Form.Label>{billData.unit}</Form.Label>
                                                                        </Col>
                                                                    </Form.Group>

                                                                    <Form.Group as={Row} className="mb-3" controlId="FormElementMeterNumber">
                                                                        <Form.Label column sm={4}>
                                                                            Current Reading Date
                                                                        </Form.Label>
                                                                        <Col sm={8}>
                                                                            <Form.Control type="date" /* id="billId" */ name="currentReadingDate" value={currentReadingDate} onChange={function (e) { setCurrentReadingDate(e.target.value);  if(billData.prevReadingDate == "N/A"){setBillingPeriod(1)} else {setBillingPeriod(getBillingPeriod(billData.prevReadingDate,e.target.value))}; }} />
                                                                        </Col>
                                                                    </Form.Group>

                                                                    <Form.Group as={Row} className="mb-3" controlId="FormElementMeterNumber">
                                                                        <Form.Label column sm={4}>
                                                                            Current Reading
                                                                        </Form.Label>
                                                                        <Col sm={8}>
                                                                            <Form.Control type="number" /* id="billId" */ name="currentReading" value={currentReading} onChange={function (e) { setCurrentReading(Number(e.target.value));  setReadingDifference(e.target.value - billData.prevReading); updateAmount(billData.meterNo,e.target.value - billData.prevReading);}} />
                                                                        </Col>
                                                                    </Form.Group>

                                                                    <Form.Group as={Row} className="mb-3" controlId="FormElementMeterNumber">
                                                                        <Form.Label column sm={4}>
                                                                            Previous Reading Date
                                                                        </Form.Label>
                                                                        <Col sm={8}>
                                                                            <Form.Label>{billData.prevReadingDate}</Form.Label>
                                                                        </Col>
                                                                    </Form.Group>

                                                                    <Form.Group as={Row} className="mb-3" controlId="FormElementMeterNumber">
                                                                        <Form.Label column sm={4}>
                                                                            Previous Reading
                                                                        </Form.Label>
                                                                        <Col sm={8}>
                                                                            <Form.Label>{billData.prevReading}</Form.Label>
                                                                        </Col>
                                                                    </Form.Group>

                                                                    <Form.Group as={Row} className="mb-3" controlId="FormElementSanctionedLoad">
                                                                        <Form.Label column sm={4}>
                                                                            Reading Difference
                                                                        </Form.Label>
                                                                        <Col sm={8}>
                                                                            <Form.Label>{readingDifference}</Form.Label>
                                                                        </Col>
                                                                    </Form.Group>

                                                                    <Form.Group as={Row} className="mb-3" controlId="FormElementSanctionedLoad">
                                                                        <Form.Label column sm={4}>
                                                                            Billing Period
                                                                        </Form.Label>
                                                                        <Col sm={8}>
                                                                            <Form.Label>{billingPeriod}</Form.Label>
                                                                        </Col>
                                                                    </Form.Group>

                                                                    <Form.Group as={Row} className="mb-3" controlId="FormElementSanctionedLoad">
                                                                        <Form.Label column sm={4}>
                                                                            Amount
                                                                        </Form.Label>
                                                                        <Col sm={8}>
                                                                            <Form.Label>{amount}</Form.Label>
                                                                        </Col>
                                                                    </Form.Group>
                                                                </Form>
                                                            </div> : <p></p>}
                                                            
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <Button variant="secondary" id='btn-contact' onClick={handleCloseResolve}>
                                                                Cancel
                                                            </Button>
                                                            <Button variant="primary" id='btn-contact' onClick={function (event) { handleCloseResolve(); handleResolution(ticket.id) }}>
                                                                Resolve
                                                            </Button>
                                                        </Modal.Footer>
                                                    </Modal>
                                                </td>
                                            </tr>
                                        </tbody>
                                    )
                                })
                            ) : 
                                            <p className='paray'>No Pending Tickets</p>
                        
                            }
                            </Table>
                        </div>
                    </Tab>


                    <Tab eventKey="resolvedtickets" title="Resolved Tickets">
                    
                    <div id='div'>
                            <Table responsive bordered  className='table-hold'>
                                    <thead >
                                        <tr id='header'>
                                        <th id='thx'>Ticket ID</th>
                                        <th id='thx'>Bill Number</th>
                                        <th id='thx'>Consumer E-mail</th>
                                        <th id='thx'>Description</th>
                                        <th id='thx'>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {resolvedTickets?.length > 0 ? (
                                resolvedTickets.filter((item)=>{
  
                                    return search.toLocaleLowerCase() === '' ? item : item.billNo.toLocaleLowerCase().includes(search.toLocaleLowerCase()) //||  item.currentReadingDate.toLocaleLowerCase().includes(search.toLocaleLowerCase()) && item.previousReadingDate.toLocaleLowerCase().includes(search.toLocaleLowerCase()) 
                                  }).map(ticket => {
                                    return (
                                        <tr>
                                                <td>{ticket.id}</td>
                                                <td>{ticket.billNo}</td>
                                                <td>{ticket.email}</td>
                                                <td>{ticket.description}</td>
                                                <td>Resolved</td>
                                            
                                        </tr>
                                    )
                                })
                            ) : <p className='paray'> No Resolved Tickets Found</p>
                        }
                        </tbody>
                        </Table>
                    </div>          
                </Tab>
                    
                </Tabs>
            </div>
        </div>
        </>
       
    );
}

export default BillsList;