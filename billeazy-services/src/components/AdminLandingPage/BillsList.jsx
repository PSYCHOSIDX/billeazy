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

function BillsList() {
    const [key, setKey] = useState('all');
    const [pendingTickets, setPendingTickets] = useState(null);
    const [resolvedTickets, setResolvedTickets] = useState(null);
    const [bill , setBill] = useState([0]);
    const [billPaid , setBillPaid] = useState([0]);
    const [billPending , setBillPending] = useState([0]);
    const [agentRecords , setAgents] = useState([0]);

    const billsCollectionRef = collection(db,`bills`);
    const agentsCollectionRef = collection(db,`employees`);

    const handleGetTickets = async e => {
        const getPendingTickets = await getDocs(query(collection(db, "tickets"), where("status", "==", "pending")));
        setPendingTickets(getPendingTickets.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const getResolvedTickets = await getDocs(query(collection(db, "tickets"), where("status", "==", "resolved")));
        setResolvedTickets(getResolvedTickets.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }

    const handleResolution = async (id) => {
        await updateDoc(doc(db, "tickets", id), {
            status: "resolved"
        });
        handleGetTickets()
    }

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
                                <div className="ListHeadings shadow-none p-2">
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
                    <Tab eventKey="pending" title="Pending">
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

                    <Tab eventKey="agents" title="Employees">
                        <Stack gap={2}>
                            <div className="BillList bg-light shadow-sm p-2">
                                <Row>
                                    <Col>0000</Col>
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
                    <Tab eventKey="pending" title="Pending">

                    <Tab eventKey="paid" title="Paid">
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
                                                <Col><Button className='AdminResolve' variant="outline-primary" onClick={() =>
                                                    handleResolution(ticket.id)
                                                }>Resolve</Button>
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
