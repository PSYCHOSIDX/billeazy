import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import '../component-styles/admin-page.css';
import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import BillsList from './BillsList';
import { db } from '../../firebaseConfig';
import { doc,setDoc } from '@firebase/firestore';

function AdminPage(){
    const [key, setKey] = useState('all');
    const [showC, setShowC] = useState(false);
    const [showA, setShowA] = useState(false);
    const [showT, setShowT] = useState(false);
    const handleCloseConsumer = () => setShowC(false);
    const handleCloseAgent = () => setShowA(false);
    const handleShowConsumer = () => setShowC(true);
    const handleShowAgent = () => setShowA(true);

    const [consumerName,setConsumerName] = useState("");
    const [consumerAccNo,setConsumerAccNo] = useState(`${Math.ceil(Math.random()*Math.pow(10,12))}`);
    const [instNo,setInstNo] = useState(Math.ceil(Math.random()*Math.pow(10,6)).toString());
    const [address,setAddress] = useState("");
    const [telephoneNo,setTelephoneNo] = useState("");
    const [email,setEmail] = useState("");
    const [energizationDate,setEnergizationDate] = useState("");
    const [meterNo,setMeterNo] = useState("");
    const [tarrifCategory,setTarrifCategory] = useState("");
    const [sanctionedLoad,setSanctionedLoad] = useState("")

    const handleRegister = async e =>{
        //add data validation here
        const newConsumer = {
            consumerName,
            consumerAccNo,
            instNo,
            address,
            telephoneNo,
            email,
            energizationDate,
            meterNo,
            tarrifCategory,
            sanctionedLoad
        };

        try{
            await setDoc(doc(db, "consumers", `${consumerAccNo}`), {
              ...newConsumer
            });
        }catch(error){
            console.log(error);
        }
    }

    return(
        <div className='p-5'>
            <div className='my-3'>
                <Row>
                    <Col sm={6}>
                        <h2 className='fw-semibold'>Admin Page</h2>
                    </Col>
                    <Col sm={6}>
                        <Row>
                            <Col>
                                <Button className='AdminActionButtons' variant="outline-primary" onClick={handleShowConsumer}>
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
                                                    <Form.Control type="text" placeholder="consumer name" /* name="consumerName" */ value={consumerName} onChange={e=>setConsumerName(e.target.value)}/>
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} className="mb-3" controlId="FormElementConsumerId">
                                                    <Form.Label column sm={4}>
                                                    Consumer Account Number
                                                    </Form.Label>
                                                    <Col sm={8}>
                                                    <Form.Label>{consumerAccNo}</Form.Label>
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} className="mb-3" controlId="FormElementConsumerId">
                                                    <Form.Label column sm={4}>
                                                    Installation Number
                                                    </Form.Label>
                                                    <Col sm={8}>
                                                    <Form.Label>{instNo}</Form.Label>                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} className="mb-3" controlId="FormElementConsumerId">
                                                    <Form.Label column sm={4}>
                                                    Address
                                                    </Form.Label>
                                                    <Col sm={8}>
                                                    <Form.Control type="text" placeholder="address" /* id="address" */ name="address" value={address} onChange={e=>setAddress(e.target.value)} />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} className="mb-3" controlId="FormElementConsumerId">
                                                    <Form.Label column sm={4}>
                                                    Telephone Number
                                                    </Form.Label>
                                                    <Col sm={8}>
                                                    <Form.Control type="text" placeholder="telephone no" /* id="telephoneNo" */ name="telephoneNo" value={telephoneNo} onChange={e=>setTelephoneNo(e.target.value)} />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} className="mb-3" controlId="FormElementConsumerId">
                                                    <Form.Label column sm={4}>
                                                    Email ID
                                                    </Form.Label>
                                                    <Col sm={8}>
                                                    <Form.Control type="email" placeholder="email" /* id="email" */ name="email" value={email} onChange={e=>setEmail(e.target.value)} />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} className="mb-3" controlId="FormElementConsumerId">
                                                    <Form.Label column sm={4}>
                                                    Energization Date
                                                    </Form.Label>
                                                    <Col sm={8}>
                                                    <Form.Control type="date" placeholder="energizationDate" /* id="energizationDate" */ name="energizationDate" value={energizationDate} onChange={e=>setEnergizationDate(e.target.value)} />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} className="mb-3" controlId="FormElementMeterNumber">
                                                    <Form.Label column sm={4}>
                                                    Meter Number
                                                    </Form.Label>
                                                    <Col sm={8}>
                                                    <Form.Control type="text" pattern="^[A-Z]{4}[0-9]{8}\z" placeholder="meter number" /* id="meterNo" */ name="meterNo" value={meterNo} onChange={e=>setMeterNo(e.target.value)} />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} className="mb-3" controlId="FormElementConsumerType">
                                                    <Form.Label column sm={4}>
                                                        Consumer Type
                                                    </Form.Label>
                                                    <Col sm={8}>
                                                        <Form.Select /* id="tarrifCategory" */ name="tarrifCategory" value ={tarrifCategory} onChange={e=>setTarrifCategory(e.target.value)}>
                                                            <option>Domestic</option>
                                                            <option>Commercial</option>
                                                            <option>Industrial</option>
                                                        </Form.Select>
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} className="mb-3" controlId="FormElementSanctionedLoad">
                                                    <Form.Label column sm={4}>
                                                    Sanctioned Load
                                                    </Form.Label>
                                                    <Col sm={8}>
                                                    <Form.Control type="number" placeholder="sanctioned load" /* id="sanctionedLoad" */ name="sanctionedLoad" value={sanctionedLoad} onChange={e=>setSanctionedLoad(e.target.value)} />
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
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleCloseConsumer}>
                                            Cancel
                                        </Button>
                                        <Button variant="primary" onClick={function(event){handleCloseConsumer(); handleRegister()}}>
                                            Register
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </Col>
                            <Col>
                                <Button className='AdminActionButtons' variant="outline-primary" onClick={handleShowAgent}>Register Agent</Button>
                                <Modal show={showA} onHide={handleCloseAgent}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Register Agent</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className='forms'>
                                        <Form>
                                                <Form.Group as={Row} className="mb-3" controlId="FormElementAgentId">
                                                    <Form.Label column sm={4}>
                                                    Agent ID
                                                    </Form.Label>
                                                    <Col sm={8}>
                                                    <Form.Control type="number" placeholder="agent id" />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} className="mb-3" controlId="FormElementAgentName">
                                                    <Form.Label column sm={4}>
                                                    Name
                                                    </Form.Label>
                                                    <Col sm={8}>
                                                    <Form.Control type="text" placeholder="Agent name" />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} className="mb-3" controlId="FormElementAgentPassword">
                                                    <Form.Label column sm={4}>
                                                    Password
                                                    </Form.Label>
                                                    <Col sm={8}>
                                                    <Form.Control type="password" placeholder="Password" />
                                                    </Col>
                                                </Form.Group>
                                            </Form>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleCloseAgent}>
                                            Cancel
                                        </Button>
                                        <Button variant="primary" onClick={handleCloseAgent}>
                                            Register
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            <BillsList/>
        </div>
    );
}

export default AdminPage;