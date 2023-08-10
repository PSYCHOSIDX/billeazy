import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import '../component-styles/admin-page.css';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, updateDoc, doc, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { generateAmount } from '../../utils/billGeneration';
import { getBillingPeriod } from '../../utils/billGeneration';
import Table from 'react-bootstrap/Table';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BillsList() {
    const [key, setKey] = useState('all');
    const [pendingTickets, setPendingTickets] = useState(null);
    const [resolvedTickets, setResolvedTickets] = useState(null);
    // const [bill , setBill] = useState([]);
    
    const [adminData, setAdminData]=useState([]);
    const [billPaid , setBillPaid] = useState([]);
    const [billPending , setBillPending] = useState([]);
    const [customer, setCustomers]= useState([]);
    const [agentRecords , setAgents] = useState([]);

    //used for ticket resolution
    const [billData, setBillData] = useState();
    const [dueDate, setDueDate] = useState();
    const [currentReadingDate, setCurrentReadingDate] = useState();
    const [currentReading, setCurrentReading] = useState();
    const [readingDifference, setReadingDifference] = useState();
    const [billingPeriod, setBillingPeriod] = useState();
    const [amount, setAmount] = useState();
    const [billPath, setBillPath] = useState();

    //used for storing consumer data
    const [consumerData, setConsumerData] = useState();

    //used for updating consumer data
    const [cName, setCName] = useState("");
    const [address, setAddress] = useState("");
    const [energizationDate, setEnergizationDate] = useState("");
    const [meterNo, setMeterNo] = useState("");
    const [tariffCategory, setTariffCategory] = useState("domestic");
    const [tension, setTension] = useState("lt");
    const [sanctionedLoad, setSanctionedLoad] = useState(0)
    const [consumerId, setConsumerId] = useState();

    //used for updating agent data
    const [aName, setAName] = useState("");
    const [agentId, setAgentId] = useState();

    //used for ticket resolution
    const [showResolve, setShowResolve] = useState(false);
    const handleCloseResolve = () => setShowResolve(false);
    const handleShowResolve = () => setShowResolve(true);
    
    const [search , setSearch] = useState('');
    const billsCollectionRef = collection(db,`bills`);
    const agentsCollectionRef = collection(db,`employees`);
    const adminCollectionRef = collection(db,`users`);

    //used for agent update
    const [showUpdateAgent, setShowUpdateAgent] = useState(false);
    const handleCloseUpdateAgent = () => setShowUpdateAgent(false);
    const handleShowUpdateAgent = () => setShowUpdateAgent(true);

    //used for consumer update
    const [showUpdateConsumer, setShowUpdateConsumer] = useState(false);
    const handleCloseUpdateConsumer = () => setShowUpdateConsumer(false);
    const handleShowUpdateConsumer = () => setShowUpdateConsumer(true);

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

        setBillData(billData);

        setDueDate(billData.dueDate);
        setCurrentReading(billData.currentReading);
        setCurrentReadingDate(billData.currentReadingDate);
        setReadingDifference(billData.readingDifference);
        setBillingPeriod(billData.billingPeriod);
        setAmount(billData.amount);

        getConsumerData(billData.meterNo);

        setBillPath(getBill.docs[0].ref.path);
    };

    //used to get consumer data 

    const getConsumerData = async (meterNo) => {

        const getConsumer = await getDocs(query(collection(db, "consumers"), where("meterNo", "==", meterNo)));
        const consumerData = getConsumer.docs[0].data();

        setCName(consumerData.name);
        setAddress(consumerData.address);
        setMeterNo(consumerData.meterNo);
        setEnergizationDate(consumerData.energizationDate);
        setTariffCategory(consumerData.tariffCategory);
        setTension(consumerData.tension);
        setSanctionedLoad(consumerData.sanctionedLoad);

        setConsumerData(consumerData);
    };


    //used for resolution
    const updateAmount = async (meterNo, readingDifference) => {

        const getConsumer = await getDocs(query(collection(db, "consumers"), where("meterNo", "==", `${meterNo}`)));

        const consumerRef = getConsumer.docs[0].data();

        const amount = await generateAmount(consumerRef.tariffCategory, consumerRef.tension, readingDifference, consumerRef.sanctionedLoad);

        console.log(amount);
        setAmount(amount);
    };

    const handleUpdateAgent = async (id) => {
        try {
            console.log(id);
            await updateDoc(doc(db, `employees/${id}`), {
                name: aName
            });

            toast.success('Agent Data Updated!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (e) {
            toast.error('Data Updation Failed!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    const handleUpdateConsumer = async (id) => {
        try {
            console.log(id);
            await updateDoc(doc(db, `consumers/${id}`), {
                name: cName,
                address: address,
                energizationDate: energizationDate,
                meterNo: meterNo,
                tariffCategory: tariffCategory,
                tension: tension,
                sanctionedLoad: Number(sanctionedLoad),
            });

            toast.success('Consumer Data Updated!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (e) {
            toast.error('Data Updation Failed!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    //used for resolution
    const handleTicketResolution = async (id) => {
        try {
            await updateDoc(doc(db, billPath), {
                dueDate: dueDate,
                currentReadingDate: currentReadingDate,
                currentReading: currentReading,
                readingDifference: readingDifference,
                billingPeriod: billingPeriod,
                amount: Number(amount).toFixed(2)
            });
            await updateDoc(doc(db, `tickets/${id}`), {
                status: "resolved"
            });
            toast.success('Ticket Resolved!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            handleGetTickets()
        } catch (e) {
            toast.error('Ticket Resolution Failed!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };
    useEffect(() => {
        handleGetTickets();
    }, [])
    useEffect(() => {
        // console.log(pendingTickets);
    }, [pendingTickets,customer])

    // get agents details
    useEffect(() => {
        onSnapshot(agentsCollectionRef, docSnap =>{
            const agentsData = docSnap.docs.map((doc)=>({
                ...doc.data(),
                id: doc.id
            }));
            setAgents(agentsData)
        })
        },[])



            // get agents details
    useEffect(() => {
        onSnapshot(agentsCollectionRef, docSnap =>{
            const agentsData = docSnap.docs.map((doc)=>({
                ...doc.data(),
                id: doc.id
            }));
            setAgents(agentsData)
        })
        },[])

    useEffect(() => {
        const getBills = async () => {
        const q = query(billsCollectionRef);
        // const data = await getDocs(q);
        onSnapshot(billsCollectionRef, docSnap =>{
            const billsData = docSnap.docs.map((doc)=>({
                ...doc.data(),
                id: doc.id
            }));
            setBillPending([])
            setBillPaid([])
            billsData.forEach((b) => {
                if (b.paymentStatus == 'pending') {
                    setBillPending(prev =>
                        [...prev,
                            b]
                    );
                    // setBillPending(b);
                }
                if (b.paymentStatus == 'paid') {     
                    setBillPaid(prev => [
                        ...prev,
                        b])
                    // setBillPaid(b);

                }
            });
        })

        };
        getBills()
        }, [])

        useEffect(()=>{
            console.log("Customer changed");
        },[customer])

        useEffect(() => {

            onSnapshot(collection(db,'consumers'), docSnap =>{
                const customerData = docSnap.docs.map((doc)=>({
                    ...doc.data(),
                    id: doc.id
                }));
                setCustomers(customerData)
            })

            // getCustomers()
            }, []) 




// get admins

useEffect(() => {
    const getAdmin = async () => {
        
    const q = query(adminCollectionRef, where('usertype','==','admin'));
    // const data = await getDocs(q);
    onSnapshot(q, docSnap =>{
        const AdminData = docSnap.docs.map((doc)=>({
            ...doc.data(),
            id: doc.id
        }));
        setAdminData([]);

        AdminData.forEach((b) => {
            if (b.usertype === 'admin') {
            
                console.log('this admin:' +b)
                setAdminData(prev =>
                    [...prev,
                        b]
                );
             //  console.log("datax:" +adminCollectionRef) // setBillPending(b);
            }
            
        });
    })

    };
    getAdmin()
    }, [])

         

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
            <input style={{ fontSize: 12, height: 44, margin: '.1rem' }} className='fieldxx' placeholder='Live Search Bill Number ' autoComplete='on' type='text' onChange={(e) => setSearch(e.target.value)} />
            <br />
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
                                <Table responsive bordered className='table-hold'>
                                    <thead >
                                        <tr id='header'>
                                            <th id='thx'>CA No</th>
                                            <th id='thx'>Meter No</th>
                                            <th id='thx'>Name</th >
                                            <th id='thx'>Telephone No</th >
                                            <th id='thx'>Email</th>
                                            <th id='thx'>Address</th>
                                            <th id='thx'>Energization Date</th>
                                            <th id='thx'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            customer.length > 0 ? customer.map((ag) => (
                                                <tr className="records bg-light shadow-sm p-2">

                                                    <td>{ag.consumerAccNo}</td>
                                                    <td>{ag.meterNo}</td>
                                                    <td>{ag.name}</td>
                                                    <td>{ag.telephoneNo}</td>
                                                    <td>{ag.email}</td>
                                                    <td>{ag.address}</td>
                                                    <td>{ag.energizationDate}</td>
                                                    <td><Button className='AdminActionButtons' variant="outline-primary" id='btn-contact' onClick={function (e) {
                                                        handleShowUpdateConsumer(); getConsumerData(ag.meterNo); setConsumerId(ag.id);
                                                    }}>
                                                        Update
                                                    </Button>

                                                        <Modal show={showUpdateConsumer} onHide={handleCloseUpdateConsumer}>
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>Edit Consumer</Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body>
                                                                {consumerData ? <div className='forms'>
                                                                    <Form>

                                                                        <Form.Group as={Row} className="mb-3" controlId="FormElementConsumerName">
                                                                            <Form.Label column sm={4}>
                                                                                Name
                                                                            </Form.Label>
                                                                            <Col sm={8}>
                                                                                <Form.Control type="text" name="cName" value={cName} onChange={e => setCName(e.target.value)} />
                                                                            </Col>
                                                                        </Form.Group>

                                                                        <Form.Group as={Row} className="mb-3" controlId="FormElementConsumerAccNo">
                                                                            <Form.Label column sm={4}>
                                                                                Consumer Account Number
                                                                            </Form.Label>
                                                                            <Col sm={8}>
                                                                                <Form.Label>{consumerData.consumerAccNo}</Form.Label>
                                                                            </Col>
                                                                        </Form.Group>

                                                                        <Form.Group as={Row} className="mb-3" controlId="FormElementMeterNo">
                                                                            <Form.Label column sm={4}>
                                                                                Installation Number
                                                                            </Form.Label>
                                                                            <Col sm={8}>
                                                                                <Form.Label>{consumerData.instNo}</Form.Label>
                                                                            </Col>
                                                                        </Form.Group>

                                                                        <Form.Group as={Row} className="mb-3" controlId="FormElementBillDate">
                                                                            <Form.Label column sm={4}>
                                                                                Address
                                                                            </Form.Label>
                                                                            <Col sm={8}>
                                                                                <Form.Control type="text" name="address" value={address} onChange={e => setAddress(e.target.value)} />
                                                                            </Col>
                                                                        </Form.Group>

                                                                        <Form.Group as={Row} className="mb-3" controlId="FormElementConsumerEnergization">
                                                                            <Form.Label column sm={4}>
                                                                                Telephone Number
                                                                            </Form.Label>
                                                                            <Col sm={8}>
                                                                                <Form.Label>{consumerData.telephoneNo}</Form.Label>
                                                                            </Col>
                                                                        </Form.Group>

                                                                        <Form.Group as={Row} className="mb-3" controlId="FormElementConsumerEmail">
                                                                            <Form.Label column sm={4}>
                                                                                Email
                                                                            </Form.Label>
                                                                            <Col sm={8}>
                                                                                <Form.Label>{consumerData.email}</Form.Label>
                                                                            </Col>
                                                                        </Form.Group>

                                                                        <Form.Group as={Row} className="mb-3" controlId="FormElementConsumerEnergization">
                                                                            <Form.Label column sm={4}>
                                                                                Energization Date
                                                                            </Form.Label>
                                                                            <Col sm={8}>
                                                                                <Form.Control type="date" placeholder="energizationDate" /* id="energizationDate" */ name="energizationDate" value={energizationDate} onChange={e => setEnergizationDate(e.target.value)} />
                                                                            </Col>
                                                                        </Form.Group>

                                                                        <Form.Group as={Row} className="mb-3" controlId="FormElementMeterNumber">
                                                                            <Form.Label column sm={4}>
                                                                                Meter Number
                                                                            </Form.Label>
                                                                            <Col sm={8}>
                                                                                <Form.Control type="text" name="meterNo" value={meterNo} onChange={e => setMeterNo(e.target.value)} />
                                                                            </Col>
                                                                        </Form.Group>

                                                                        <Form.Group as={Row} className="mb-3" controlId="FormElementTarrifCategory">
                                                                            <Form.Label column sm={4}>
                                                                                Tarrif Category
                                                                            </Form.Label>
                                                                            <Col sm={8}>
                                                                                <Form.Select /* id="tarrifCategory" */ name="tariffCategory" value={tariffCategory} onChange={e => setTariffCategory(e.target.value)}>
                                                                                    <option value={"domestic"}>Domestic</option>
                                                                                    <option value={"commercial"}>Commercial</option>
                                                                                    <option value={"industrial"}>Industrial</option>
                                                                                </Form.Select>
                                                                            </Col>
                                                                        </Form.Group>

                                                                        <Form.Group as={Row} className="mb-3" controlId="FormElementTension">
                                                                            <Form.Label column sm={4}>
                                                                                Tension
                                                                            </Form.Label>
                                                                            <Col sm={8}>
                                                                                <Form.Select /* id="tension" */ name="tension" value={tension} onChange={e => setTension(e.target.value)}>
                                                                                    <option value={"lt"}>Low Tension</option>
                                                                                    <option value={"ht"}>High Tension</option>
                                                                                </Form.Select>
                                                                            </Col>
                                                                        </Form.Group>

                                                                        <Form.Group as={Row} className="mb-3" controlId="FormElementMeterNumber">
                                                                            <Form.Label column sm={4}>
                                                                                Sanctioned Load
                                                                            </Form.Label>
                                                                            <Col sm={8}>
                                                                                <Form.Control type="number" min={0} name="sanctionedLoad" value={sanctionedLoad} onChange={e => setSanctionedLoad(e.target.value)} />
                                                                            </Col>
                                                                        </Form.Group>
                                                                    </Form>
                                                                </div> : <></>}

                                                            </Modal.Body>
                                                            <Modal.Footer>
                                                                <Button variant="secondary" id='btn-contact' onClick={handleCloseUpdateConsumer}>
                                                                    Cancel
                                                                </Button>
                                                                <Button variant="primary" id='btn-contact' onClick={function (event) { handleCloseUpdateConsumer(); handleUpdateConsumer(consumerId) }}>
                                                                    Update
                                                                </Button>
                                                            </Modal.Footer>
                                                        </Modal>
                                                    </td>
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
                                <Table responsive bordered className='table-hold'>
                                    <thead >
                                        <tr id='header'>
                                            <th id='thx'>Agent ID</th>
                                            <th id='thx'>Name</th >
                                            <th id='thx'>Contact No</th>
                                            <th id='thx'>Email</th>
                                            <th id='thx'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            agentRecords.length > 0 ? agentRecords.map((ag) => (
                                                <tr key={ag.id} className="records bg-light shadow-sm p-2">

                                                    <td>{ag.agentId}</td>
                                                    <td>{ag.name}</td>
                                                    <td>{ag.telephoneNo}</td>
                                                    <td>{ag.email}</td>
                                                    <td><Button className='AdminActionButtons' variant="outline-primary" id='btn-contact' onClick={function (e) {
                                                        handleShowUpdateAgent(); setAName(ag.name); setAgentId(ag.id);
                                                    }} >
                                                        Update
                                                    </Button>

                                                        <Modal show={showUpdateAgent} onHide={handleCloseUpdateAgent}>
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>Edit Agent</Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body>
                                                                <div className='forms'>
                                                                    <Form>

                                                                        <Form.Group as={Row} className="mb-3" controlId="FormElementConsumerName">
                                                                            <Form.Label column sm={4}>
                                                                                Name
                                                                            </Form.Label>
                                                                            <Col sm={8}>
                                                                                <Form.Control type="text" name="aName" value={aName} onChange={e => setAName(e.target.value)} />
                                                                            </Col>
                                                                        </Form.Group>
                                                                    </Form>
                                                                </div>

                                                            </Modal.Body>
                                                            <Modal.Footer>
                                                                <Button variant="secondary" id='btn-contact' onClick={handleCloseUpdateAgent}>
                                                                    Cancel
                                                                </Button>
                                                                <Button variant="primary" id='btn-contact' onClick={function (e) { handleCloseUpdateAgent(); handleUpdateAgent(agentId) }}>
                                                                    Update
                                                                </Button>
                                                            </Modal.Footer>
                                                        </Modal></td>
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
                                <Table responsive striped bordered className='table-hold'>

                                    <thead>
                                        <tr id='thx'>

                                            <th id='thx'>Consumer No</th>
                                            <th id='thx'>Current reading date</th>
                                            <th id='thx'>Current reading</th>
                                            <th id='thx'>Previous reading date</th>
                                            <th id='thx'>Previous reading</th>
                                            <th id='thx'>Consumption</th>
                                            <th id='thx'>Unit type</th>
                                            <th id='thx'>Amount Payable</th>
                                            <th id='thx'>Payment Status</th>


                                        </tr>

                                    </thead>

                                    <tbody>
                                        {
                                            billPending.length > 0 ? billPending.filter((item) => {

                                                return search.toLocaleLowerCase() === '' ? item : item.billNo.toLocaleLowerCase().includes(search.toLocaleLowerCase()) //||  item.currentReadingDate.toLocaleLowerCase().includes(search.toLocaleLowerCase()) && item.previousReadingDate.toLocaleLowerCase().includes(search.toLocaleLowerCase()) 
                                            }).map((bc) => (


                                                <tr>

                                                    <td>{bc.consumerAccNo}</td>
                                                    <td>{bc.currentReadingDate}</td>
                                                    <td>{bc.currentReading}</td>
                                                    <td>{bc.prevReadingDate}</td>
                                                    <td>{bc.prevReading}</td>
                                                    <td>{bc.readingDifference}</td>
                                                    <td>{bc.unit}</td>
                                                    <td>{bc.amount}</td>
                                                    <td> {bc.paymentStatus === 'pending' ? <p className='paray'>Pending</p> : <p className='parax'>Paid</p>} </td>




                                                </tr>



                                            ))
                                                : <p className='paray'>No Pending Bills Found</p>
                                        }
                                    </tbody>
                                </Table>

                            </div>

                        </Tab>
                        <Tab eventKey="paid" title="Paid Bills">
                            <div id='div'>
                                <Table responsive striped bordered className='table-hold'>

                                    <thead>
                                        <tr id='thx'>

                                            <th id='thx'>Consumer No</th>
                                            <th id='thx'>Current reading date</th>
                                            <th id='thx'>Current reading</th>
                                            <th id='thx'>Previous reading date</th>
                                            <th id='thx'>Previous reading</th>
                                            <th id='thx'>Consumption</th>
                                            <th id='thx'>Unit type</th>
                                            <th id='thx'>Amount Payable</th>
                                            <th id='thx'>Payment Status</th>


                                        </tr>

                                    </thead>

                                    <tbody>
                                        {
                                            billPaid.length > 0 ? billPaid.filter((item) => {

                                                return search.toLocaleLowerCase() === '' ? item : item.billNo.toLocaleLowerCase().includes(search.toLocaleLowerCase()) //||  item.currentReadingDate.toLocaleLowerCase().includes(search.toLocaleLowerCase()) && item.previousReadingDate.toLocaleLowerCase().includes(search.toLocaleLowerCase()) 
                                            }).map((bc) => (


                                                <tr>

                                                    <td>{bc.consumerAccNo}</td>
                                                    <td>{bc.currentReadingDate}</td>
                                                    <td>{bc.currentReading}</td>
                                                    <td>{bc.prevReadingDate}</td>
                                                    <td>{bc.prevReading}</td>
                                                    <td>{bc.readingDifference}</td>
                                                    <td>{bc.unit}</td>
                                                    <td>{bc.amount}</td>
                                                    <td> {bc.paymentStatus === 'pending' ? <p className='paray'>Pending</p> : <p className='parax'>Paid</p>} </td>




                                                </tr>



                                            ))
                                                : <p className='paray'>No Pending Bills Found</p>
                                        }</tbody>
                                </Table>

                            </div>

                        </Tab>
                        <Tab eventKey="pendingtickets" title="Pending Tickets">

                            <div id='div'>
                                <Table responsive bordered className='table-hold'>
                                    <thead>
                                        <tr id='header'>
                                            <th id='thx'>Ticket ID</th >
                                            <th id='thx'>Bill Number</th >
                                            <th id='thx'>Consumer E-mail</th >
                                            <th id='thx'>Description</th >
                                            <th id='thx'>Action</th >
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pendingTickets?.length > 0 ? (
                                            pendingTickets.filter((item) => {

                                                return search.toLocaleLowerCase() === '' ? item : item.billNo.toLocaleLowerCase().includes(search.toLocaleLowerCase()) //||  item.currentReadingDate.toLocaleLowerCase().includes(search.toLocaleLowerCase()) && item.previousReadingDate.toLocaleLowerCase().includes(search.toLocaleLowerCase()) 
                                            }).map(ticket => {
                                                return (
                                                    <tr>
                                                        <td>{ticket.id}</td>
                                                        <td>{ticket.billNo}</td>
                                                        <td>{ticket.email}</td>
                                                        <td>{ticket.description}</td>
                                                        <td><Button className='AdminActionButtons' variant="outline-primary" id='btn-contact' onClick={function (e) {
                                                            handleShowResolve(); getBillData(ticket.billNo);
                                                        }}>
                                                            Resolve
                                                        </Button>

                                                            <Modal show={showResolve} onHide={handleCloseResolve}>
                                                                <Modal.Header closeButton>
                                                                    <Modal.Title>Resolve Dicrepancy</Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                    {billData ? <div className='forms'>
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
                                                                                    <Form.Control type="date" min={billData.dueDate}/* id="billId" */ name="dueDate" value={dueDate} onChange={e => setDueDate(e.target.value)} />
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
                                                                                    <Form.Control type="date" min={billData.prevReadingDate}/* id="billId" */ name="currentReadingDate" value={currentReadingDate} onChange={function (e) { setCurrentReadingDate(e.target.value); if (billData.prevReadingDate == "N/A") { setBillingPeriod(getBillingPeriod(consumerData.energizationDate, e.target.value)) } else { setBillingPeriod(getBillingPeriod(billData.prevReadingDate, e.target.value)) }; }} />
                                                                                </Col>
                                                                            </Form.Group>

                                                                            <Form.Group as={Row} className="mb-3" controlId="FormElementMeterNumber">
                                                                                <Form.Label column sm={4}>
                                                                                    Current Reading
                                                                                </Form.Label>
                                                                                <Col sm={8}>
                                                                                    <Form.Control type="number" min={0}/* id="billId" */ name="currentReading" value={currentReading} onChange={function (e) { setCurrentReading(Number(e.target.value)); setReadingDifference(e.target.value - billData.prevReading); updateAmount(billData.meterNo, e.target.value - billData.prevReading); }} />
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
                                                                    </div> : <></>}

                                                                </Modal.Body>
                                                                <Modal.Footer>
                                                                    <Button variant="secondary" id='btn-contact' onClick={handleCloseResolve}>
                                                                        Cancel
                                                                    </Button>
                                                                    <Button variant="primary" id='btn-contact' onClick={function (event) { handleCloseResolve(); handleTicketResolution(ticket.id) }}>
                                                                        Resolve
                                                                    </Button>
                                                                </Modal.Footer>
                                                            </Modal>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        ) :
                                            <p className='paray'>No Paid Tickets</p>

                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </Tab>


                        <Tab eventKey="resolvedtickets" title="Resolved Tickets">

                            <div id='div'>
                                <Table responsive bordered className='table-hold'>
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
                                            resolvedTickets.filter((item) => {

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

                        <Tab eventKey="aadmin" title="Admin Users">

                    <div id='div'>
                        <Table responsive bordered className='table-hold'>
                            <thead >
                                <tr id='header'>
                                    <th id='thx'>Name</th>
                                    <th id='thx'>Email</th>
                                    <th id='thx'>Phone No</th>
                                    <th id='thx'>User Type</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {adminData?.length > 0 ? (
                                  adminData.map((abc) => {
                                        return (
                                            <tr>
                                                <td>{abc.name}</td>
                                                <td>{abc.email}</td>
                                                <td>{abc.phone}</td>
                                                <td>{abc.usertype}</td>
                                            </tr>
                                        )
                                    })
                                ) : <p className='paray'> No Admins Found</p>
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