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

function AdminPage(){
    const [key, setKey] = useState('all');
    const [showC, setShowC] = useState(false);
    const [showA, setShowA] = useState(false);
    const [showT, setShowT] = useState(false);
    const handleCloseConsumer = () => setShowC(false);
    const handleCloseAgent = () => setShowA(false);
    const handleShowConsumer = () => setShowC(true);
    const handleShowAgent = () => setShowA(true);

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
                                                <Form.Group as={Row} className="mb-3" controlId="FormElementConsumerId">
                                                    <Form.Label column sm={4}>
                                                    Consumer ID
                                                    </Form.Label>
                                                    <Col sm={8}>
                                                        <Form.Control type="number" placeholder="consumer id" />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} className="mb-3" controlId="FormElementConsumerName">
                                                    <Form.Label column sm={4}>
                                                    Name
                                                    </Form.Label>
                                                    <Col sm={8}>
                                                        <Form.Control type="text" placeholder="consumer name" />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} className="mb-3" controlId="FormElementMeterNumber">
                                                    <Form.Label column sm={4}>
                                                    Meter Number
                                                    </Form.Label>
                                                    <Col sm={8}>
                                                        <Form.Control type="number" placeholder="" />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} className="mb-3" controlId="FormElementSanctionedLoad">
                                                    <Form.Label column sm={4}>
                                                    Sanctioned Load
                                                    </Form.Label>
                                                    <Col sm={8}>
                                                        <Form.Control type="number" placeholder="" />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} className="mb-3" controlId="FormElementConsumerType">
                                                    <Form.Label column sm={4}>
                                                        Consumer Type
                                                    </Form.Label>
                                                    <Col sm={8}>
                                                        <Form.Select>
                                                            <option>Domestic</option>
                                                            <option>Commercial</option>
                                                            <option>Industrial</option>
                                                        </Form.Select>
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} className="mb-3" controlId="FormElementPassword">
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
                                        <Button variant="secondary" onClick={handleCloseConsumer}>
                                            Cancel
                                        </Button>
                                        <Button variant="primary" onClick={handleCloseConsumer}>
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