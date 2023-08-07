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
            console.log("rendered agents");
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

    return (
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
                        <div className='list-container'>
                            <Stack gap={2} className='list-heading'>
                                <div className="ListHeadings shadow-none m-2 pb-2">
                                    <Row>
                                        {/* <Col>CA no.</Col> */}
                                        <Col>Bill No.</Col>
                                        <Col>Current reading date</Col>
                                        <Col>Current reading</Col>
                                        <Col>Previous reading date</Col>
                                        <Col>Previous reading</Col>
                                        <Col>Consumption</Col>
                                        <Col>Amount Payable</Col>
                                        <Col>Status</Col>
                                    </Row>
                                </div>
                                {
                                    bill.map((b)=>(
                                        <div className="records bg-light shadow-sm p-2">
                                            <Row>
                                                {/* <Col>{}</Col> */}
                                                <Col>{b.billNo}</Col>
                                                <Col>{b.currentReadingDate}</Col>
                                                <Col>{b.currentReading}</Col>
                                                <Col>{b.previousReadingDate}</Col>
                                                <Col>{b.previousReading}</Col>
                                                <Col>{b.readingDifference}</Col>
                                                <Col>{b.amount}</Col>
                                                <Col>{b.paymentStatus}</Col>
                                            </Row>
                                        </div>
                                    ))
                                }
                            </Stack>
                        </div>
                    </Tab>
                    <Tab eventKey="agents" title="Employees">
                        <div>
                            <Stack gap={2} className='list-heading'>
                                <div className="ListHeadings shadow-none m-2 pb-2">
                                    <Row>
                                        <Col>Agent ID</Col>
                                        <Col>Name</Col>
                                        <Col>Contact No.</Col>
                                        <Col>Email</Col>
                                    </Row>
                                </div>
                                {
                                    agentRecords.map((ag)=>(
                                        <div className="records bg-light shadow-sm p-2">
                                            <Row>
                                                <Col>{ag.agentId}</Col>
                                                <Col>{ag.name}</Col>
                                                <Col>{ag.telephoneNo}</Col>
                                                <Col>{ag.email}</Col>
                                            </Row>
                                        </div>
                                    ))
                                }
                            </Stack>
                        </div>
                    </Tab>
                    <Tab eventKey="pending" title="Pending Bills">
                        <div>
                            <Stack className='list-heading'>
                                <div className="ListHeadings shadow-none m-2 pb-2">
                                    <Row>
                                        {/* <Col>CA no.</Col> */}
                                        <Col>Bill No.</Col>
                                        <Col>Current reading date</Col>
                                        <Col>Current reading</Col>
                                        <Col>Previous reading date</Col>
                                        <Col>Previous reading</Col>
                                        <Col>Consumption</Col>
                                        <Col>Amount Payable</Col>
                                        <Col>Status</Col>
                                    </Row>
                                </div>
                                {
                                    billPending.map((bx)=>(
                                        <div className="records bg-light shadow-sm p-2">
                                            <Row>
                                                {/* <Col>{}</Col> */}
                                                <Col>{bx.billNo}</Col>
                                                <Col>{bx.currentReadingDate}</Col>
                                                <Col>{bx.currentReading}</Col>
                                                <Col>{bx.previousReadingDate}</Col>
                                                <Col>{bx.previousReading}</Col>
                                                <Col>{bx.readingDifference}</Col>
                                                <Col>{bx.amount}</Col>
                                                <Col>{bx.paymentStatus}</Col>
                                            </Row>
                                        </div>
                                    ))
                                }
                            </Stack>
                        </div>
                    </Tab>
                    <Tab eventKey="paid" title="Paid Bills">
                        <div>
                            <Stack gap={2} className='list-heading'>
                                <div className="ListHeadings shadow-none m-2 pb-2">
                                    <Row>
                                        {/* <Col>CA no.</Col> */}
                                        <Col>Bill No.</Col>
                                        <Col>Current reading date</Col>
                                        <Col>Current reading</Col>
                                        <Col>Previous reading date</Col>
                                        <Col>Previous reading</Col>
                                        <Col>Consumption</Col>
                                        <Col>Amount Payable</Col>
                                        <Col>Status</Col>
                                    </Row>
                                </div>
                                {
                                    billPaid.map((px)=>(
                                        <div className="records bg-light shadow-sm p-2">
                                            <Row>
                                                {/* <Col>{}</Col> */}
                                                <Col>{px.billNo}</Col>
                                                <Col>{px.currentReadingDate}</Col>
                                                <Col>{px.currentReading}</Col>
                                                <Col>{px.previousReadingDate}</Col>
                                                <Col>{px.previousReading}</Col>
                                                <Col>{px.readingDifference}</Col>
                                                <Col>{px.amount}</Col>
                                                <Col>{px.paymentStatus}</Col>
                                            </Row>
                                        </div>
                                    ))
                                }
                            </Stack>
                        </div>
                    </Tab>
                    <Tab eventKey="pendingtickets" title="Pending Tickets">
                        <div>
                            <Stack className='list-heading'>
                                <div className="ListHeadings shadow-none p-2">
                                    <Row>
                                        <Col>Ticket ID</Col>
                                        <Col>Bill Number</Col>
                                        <Col>Consumer E-mail</Col>
                                        <Col>Description</Col>
                                        <Col>Action</Col>
                                    </Row>
                                </div>
                            </Stack>
                            {pendingTickets?.length > 0 ? (
                                pendingTickets.map(ticket => {
                                    return (
                                        <div className="BillsList bg-light shadow-sm p-2">
                                            <Row>
                                                <Col>{ticket.id}</Col>
                                                <Col>{ticket.billId}</Col>
                                                <Col>{ticket.email}</Col>
                                                <Col>{ticket.description}</Col>
                                                <Col><Button className='AdminActionButtons' variant="outline-primary" id='btn-contact' onClick={function (e) {
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
                                                </Col>
                                            </Row>
                                        </div>
                                    )
                                })
                            ) : (
                                <Stack gap={2}>
                                    <div className="BillsList bg-light shadow-sm p-2">
                                        <Row>
                                            <Col>No Pending Tickets</Col>
                                        </Row>
                                    </div>
                                </Stack>
                            )
                            }
                        </div>
                    </Tab>
                    <Tab eventKey="resolvedtickets" title="Resolved Tickets">
                        <div>
                            <Stack className='list-heading'>
                                <div className="ListHeadings shadow-none p-2">
                                    <Row>
                                        <Col>Ticket ID</Col>
                                        <Col>Bill Number</Col>
                                        <Col>Consumer E-mail</Col>
                                        <Col>Description</Col>
                                        <Col>Status</Col>
                                    </Row>
                                </div>
                            </Stack>
                            {resolvedTickets?.length > 0 ? (
                                resolvedTickets.map(ticket => {
                                    return (
                                        <div className="BillsList bg-light shadow-sm p-2">
                                            <Row>
                                                <Col>{ticket.id}</Col>
                                                <Col>{ticket.billId}</Col>
                                                <Col>{ticket.email}</Col>
                                                <Col>{ticket.description}</Col>
                                                <Col>Resolved</Col>
                                            </Row>
                                        </div>
                                    )
                                })
                            ) : (
                                <Stack gap={2}>
                                    <div className="BillsList bg-light shadow-sm p-2">
                                        <Row>
                                            <Col>No Resolved Tickets</Col>
                                        </Row>
                                    </div>
                                </Stack>
                            )
                            }
                        </div>
                    </Tab>
                    
                </Tabs>
            </div>
        </div>
    );
}

export default BillsList;