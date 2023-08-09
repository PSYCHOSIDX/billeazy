import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../component-styles/admin-page.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import BillsList from './BillsList';
import { db } from '../../firebaseConfig';
import { doc, setDoc, addDoc, collection } from '@firebase/firestore';
import { useNavigate } from 'react-router-dom';
import AddNewRatesModal from './AddNewRatesModal';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AdminPage() {
    const [showC, setShowC] = useState(false);
    const [showA, setShowA] = useState(false);
    // const [showBill, setShowBill] = useState(false);
    const handleCloseConsumer = () => setShowC(false);
    const handleCloseAgent = () => setShowA(false);
    const handleShowConsumer = () => setShowC(true);
    const handleShowAgent = () => setShowA(true);


    //used to create consumer
    const [cName, setCName] = useState("");
    const [consumerAccNo, setConsumerAccNo] = useState(`${Math.ceil(Math.random() * Math.pow(10, 12))}`);
    const [instNo, setInstNo] = useState(`${Math.ceil(Math.random() * Math.pow(10, 6)).toString()}`);
    const [address, setAddress] = useState("");
    const [cTelephoneNo, setCTelephoneNo] = useState("");
    const [cEmail, setCEmail] = useState("");
    const [energizationDate, setEnergizationDate] = useState("");
    const [meterNo, setMeterNo] = useState("");
    const [tariffCategory, setTariffCategory] = useState("domestic");
    const [tension, setTension] = useState("lt");
    const [sanctionedLoad, setSanctionedLoad] = useState(0)
    const [link_otp, setLink_otp] = useState(null);

    const [aName, setAName] = useState("");
    const [agentId, setAgentId] = useState(`${Math.ceil(Math.random() * Math.pow(10, 12))}`);
    const [aTelephoneNo, setATelephoneNo] = useState("");
    const [aEmail, setAEmail] = useState("");


    const [number, setNumber] = useState('');
    const [body, setBody] = useState('');

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        console.log('triggered');

        const res = await fetch("../../../api/sendMessage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ to: '+91' + cTelephoneNo, body: '\n Bill Eazy Account Registration  \n' + cName + ' complete your account linking for email id :' + cEmail + '\n with your link otp :' + link_otp }),
        });


        console.log('data: ' + cTelephoneNo, cName, link_otp);
        const data = await res.json();
        if (data.success) {
            await setNumber("");
            await setBody("");
        } else {
            await setNumber("An Error has occurred.");
            await setBody("An Error has occurred.");
        }
        //alert('Signin Information Sent To User');
        toast.success('Signin Information Sent To User', {
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



    const onSubmitAgent = async (e) => {
        console.log('triggered');

        const res = await fetch("../../../api/sendMessage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ to: '+91' + aTelephoneNo, body: '\n Bill Eazy Account Registration  \n' + aName + ' complete your account linking for email id :' + aEmail + '\n with your link otp  :' + link_otp }),
        });


        console.log('data: ' + cTelephoneNo, cName, link_otp);
        const data = await res.json();
        if (data.success) {
            await setNumber("");
            await setBody("");
        } else {
            await setNumber("An Error has occurred.");
            await setBody("An Error has occurred.");
        }
        // alert('Signin Information Sent To User');
        toast.success('Signin Information Sent To User', {
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





    const handleConsumerRegister = async e => {
        //add data validation here
        const newConsumer = {
            name: cName,
            consumerAccNo,
            instNo,
            address,
            telephoneNo: cTelephoneNo,
            email: cEmail,
            energizationDate,
            meterNo,
            tariffCategory,
            tension,
            sanctionedLoad: Number(sanctionedLoad),
            link_otp
        };

        try {
            await addDoc(collection(db, "consumers"), {
                ...newConsumer
            });
            //  console.log('Sms sent')
            onSubmit();
        } catch (error) {
            //console.log(error);
            toast.error('failed to add consumer', {
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

    const handleAgentRegister = async e => {
        //add data validation here
        const newAgent = {
            name: aName,
            agentId,
            telephoneNo: aTelephoneNo,
            email: aEmail,
            link_otp
        };

        try {
            await addDoc(collection(db, "employees"), {
                ...newAgent
            });
            console.log('Sms sent')
            onSubmitAgent();

        } catch (error) {
            console.log(error);
            toast.error('failed to add employee', {
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

            <div className='p-2'>
                <div className='my-3 main'>
                    <Row>
                        <Col sm={6} className='textx'>
                            <h2 className='alerty' >Admin Page</h2>
                        </Col>
                        <br />
                        <div className='btn-holder'>
                            <Col sm={6}>
                                <Row>
                                    <Col>
                                        <Button className='AdminActionButtons' variant="outline-primary" id='btn-contactx' onClick={() => navigate("/admin/generate-bill")}>
                                            Generate Bill
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button className='AdminActionButtons' variant="outline-primary" id='btn-contactx' onClick={() => navigate("/admin/add-rates")}>
                                            Add New Rates
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button className='AdminActionButtons' variant="outline-primary" id='btn-contactx' onClick={function (e) {
                                            setConsumerAccNo(`${Math.ceil(Math.random() * Math.pow(10, 12))}`);
                                            setInstNo(`${Math.ceil(Math.random() * Math.pow(10, 6)).toString()}`);
                                            setLink_otp(Math.ceil(Math.random() * Math.pow(10, 6)));
                                            handleShowConsumer();
                                        }}>
                                            Register Consumer
                                        </Button>
                                        <Modal show={showC} onHide={handleCloseConsumer}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Register Consumer</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <div className='forms'>
                                                    <Form>
                                                        <Form.Group as={Row} className="mb-3" controlId="FormElementConsumerName">
                                                            <Form.Label column sm={4}>
                                                                Name
                                                            </Form.Label>
                                                            <Col sm={8}>
                                                                <Form.Control type="text" pattern="^[A-Za-z .']+\z" placeholder="consumer name" /* id="consumerName" */ name="cName" value={cName} onChange={e => setCName(e.target.value)} />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row} className="mb-3" controlId="FormElementConsumerAccNo">
                                                            <Form.Label column sm={4}>
                                                                Consumer Account Number
                                                            </Form.Label>
                                                            <Col sm={8}>
                                                                <Form.Label>{consumerAccNo}</Form.Label>
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row} className="mb-3" controlId="FormElementConsumerInstNo">
                                                            <Form.Label column sm={4}>
                                                                Installation Number
                                                            </Form.Label>
                                                            <Col sm={8}>
                                                                <Form.Label>{instNo}</Form.Label>                                                    </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row} className="mb-3" controlId="FormElementConsumerAddress">
                                                            <Form.Label column sm={4}>
                                                                Address
                                                            </Form.Label>
                                                            <Col sm={8}>
                                                                <Form.Control type="text" pattern="^[a-zA-Z ,./']\z+" placeholder="address" /* id="address" */ name="address" value={address} onChange={e => setAddress(e.target.value)} />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row} className="mb-3" controlId="FormElementConsumerId">
                                                            <Form.Label column sm={4}>
                                                                Telephone Number
                                                            </Form.Label>
                                                            <Col sm={8}>
                                                                <Form.Control type="text" pattern="^[0-9]{10}\z" placeholder="telephone no" /* id="telephoneNo" */ name="cTelephoneNo" value={cTelephoneNo} onChange={e => setCTelephoneNo(e.target.value)} />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row} className="mb-3" controlId="FormElementConsumerEmail">
                                                            <Form.Label column sm={4}>
                                                                Email ID
                                                            </Form.Label>
                                                            <Col sm={8}>
                                                                <Form.Control type="email" placeholder="email" /* id="email" */ name="cEmail" value={cEmail} onChange={e => setCEmail(e.target.value)} />
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
                                                                <Form.Control type="text" pattern="^[A-Z]{2}[0-9]{5}\z" placeholder="e.g SA01011" /* id="meterNo" */ name="meterNo" value={meterNo} onChange={e => setMeterNo(e.target.value)} />
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
                                                                    <option defaultValue value={"lt"}>Low Tension</option>
                                                                    <option value={"ht"}>High Tension</option>
                                                                </Form.Select>
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row} className="mb-3" controlId="FormElementSanctionedLoad">
                                                            <Form.Label column sm={4}>
                                                                Sanctioned Load
                                                            </Form.Label>
                                                            <Col sm={8}>
                                                                <Form.Control type="number" min={0} placeholder="e.g 3.5" /* id="sanctionedLoad" */ name="sanctionedLoad" value={sanctionedLoad} onChange={e => setSanctionedLoad(e.target.value)} />
                                                            </Col>
                                                        </Form.Group>

                                                        {/* <Form.Group as={Row} className="mb-3" controlId="FormElementPassword">
                                                    <Form.Label column sm={4}>
                                                    Password
                                                    </Form.Label>
                                                    <Col sm={8}>
                                                        <Form.Control type="password" placeholder="Password" />
                                                    </Col>
                                                </Form.Group> */}
                                                    </Form>
                                                </div>
                                            </Modal.Body>
                                            <Modal.Footer>f
                                                <Button variant="secondary" id='btn-contactx' onClick={handleCloseConsumer}>
                                                    Cancel
                                                </Button>
                                                <Button variant="primary" id='btn-contactx' onClick={function (event) { handleCloseConsumer(); handleConsumerRegister() }}>
                                                    Register
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </Col>
                                    <Col>
                                        <Button className='AdminActionButtons' variant="outline-primary" id='btn-contactx' onClick={function (e) {
                                            setAgentId(`${Math.ceil(Math.random() * Math.pow(10, 12))}`);
                                            setLink_otp(Math.ceil(Math.random() * Math.pow(10, 6)));
                                            handleShowAgent();
                                        }}>Register <br /> Agent</Button>
                                        <Modal show={showA} onHide={handleCloseAgent}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Register Agent</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <div className='forms'>
                                                    <Form>
                                                        <Form.Group as={Row} className="mb-3" controlId="FormElementAgentName">
                                                            <Form.Label column sm={4}>
                                                                Name
                                                            </Form.Label>
                                                            <Col sm={8}>
                                                                <Form.Control type="text" pattern="^[A-Za-z .']+\z" placeholder="agent name" /* id="agentName" */ name="aName" value={aName} onChange={e => setAName(e.target.value)} />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row} className="mb-3" controlId="FormElementAgentId">
                                                            <Form.Label column sm={4}>
                                                                Agent ID
                                                            </Form.Label>
                                                            <Col sm={8}>
                                                                <Form.Label>{agentId}</Form.Label>
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row} className="mb-3" controlId="FormElementAgentContact">
                                                            <Form.Label column sm={4}>
                                                                Telephone Number
                                                            </Form.Label>
                                                            <Col sm={8}>
                                                                <Form.Control type="text" placeholder="telephone no" /* id="aTelephoneNo" */ name="aTelephoneNo" value={aTelephoneNo} onChange={e => setATelephoneNo(e.target.value)} />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row} className="mb-3" controlId="FormElementAgentEmail">
                                                            <Form.Label column sm={4}>
                                                                Email
                                                            </Form.Label>
                                                            <Col sm={8}>
                                                                <Form.Control type="email" placeholder="email" /* id="email" */ name="aEmail" value={aEmail} onChange={e => setAEmail(e.target.value)} />
                                                            </Col>
                                                        </Form.Group>

                                                    </Form>
                                                </div>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleCloseAgent}>
                                                    Cancel
                                                </Button>
                                                <Button variant="primary" onClick={function (event) { handleCloseAgent(); handleAgentRegister() }}>
                                                    Register
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </Col>
                                </Row>
                            </Col>

                        </div>

                    </Row>
                </div>
                <BillsList />
            </div>
        </>

    );
}

export default AdminPage;