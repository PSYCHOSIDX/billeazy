import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../component-styles/admin-page.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { db } from '../../firebaseConfig';
import { doc, setDoc, addDoc, collection } from '@firebase/firestore';
import { useNavigate } from 'react-router-dom';
import NavbarAdminLogout from '../NavbarAdminLogout';
import Footer from '../Footer';

const AddNewRatesModal = () => {

    const [showRates, setShowRates] = useState(false);
    const navigate = useNavigate();

    const [ratesDate, setRatesDate] = useState(new Date().toISOString().split('T')[0]);
    const [domesticRates, setDomesticRates] = useState(
        {
            lt: {
                slab1: 1,
                slab2: 2,
                slab3: 3,
                slab4: 4,
                slab5: 5,
                tension: 'lt'
            },
            ht: {
                slab1: 1,
                tension: 'ht'
            }
        }
    );
    const [commericalRates, setCommericalRates] = useState(
        {
            lt: {
                slab1: 1,
                slab2: 2,
                slab3: 3,
                slab4: 4,
                tension: 'lt'
            },
            ht: {
                slab1: 1,
                tension: 'ht'
            }
        }
    );
    const [industrialRates, setIndustrialRates] = useState(
        {
            lt: {
                slab1: 1,
                slab2: 2,
                tension: 'lt'
            },
            ht: {
                slab1: 1,
                tension: 'ht'
            }
        }
    );

    const handleAddRatesHandler = async () => {
        const rates = {
            tariff: {
                domestic: domesticRates,
                commerial: commericalRates,
                industrial: industrialRates
            },
            date: ratesDate,
        };
        await addDoc(collection(db,"rates"), {
            ...rates
        });
        alert("Rates added successfully");
    }

    return (
        <>
            <NavbarAdminLogout />
            <Row>
                <Col sm={6}>
                    <h2 className='alerty' >Add New Rates</h2>
                </Col>
            </Row>
            <>
                <div className='forms' style={{ width: "60%", textAlign: 'center' }}>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="FormElementConsumerName">
                            <Form.Label column sm={4}>
                                Date
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control type="date" placeholder="" name="ratesDate" value={ratesDate} onChange={e => {
                                    setRatesDate(e.target.value)
                                }} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="FormElementTarrifCategory">
                            <Form.Label column sm={4}>
                                Tarrif Category
                            </Form.Label>
                            <Col sm={8}>
                                <Col sm={8}>
                                    <Form.Label>Domestic</Form.Label>
                                </Col>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="FormElementTension">
                            <Form.Label column sm={4}>
                                Low Tension
                            </Form.Label>
                            <Col sm={8}>
                                
                                <Form.Control type="number" placeholder="e.g 3.5" value={domesticRates.lt.slab1} onChange={e => {
                                    setDomesticRates(values => ({
                                        ...values,
                                        lt: {
                                            ...values.lt,
                                            slab1: Number(e.target.value)
                                        }
                                    }))
                                }} />
                                <Form.Control type="number" placeholder="e.g 3.5" value={domesticRates.lt.slab2} onChange={e => {
                                    setDomesticRates(values => ({
                                        ...values,
                                        lt: {
                                            ...values.lt,
                                            slab2: Number(e.target.value)
                                        }
                                    }))
                                }} />
                                <Form.Control type="number" placeholder="e.g 3.5" value={domesticRates.lt.slab3} onChange={e => {
                                    setDomesticRates(values => ({
                                        ...values,
                                        lt: {
                                            ...values.lt,
                                            slab3: Number(e.target.value)
                                        }
                                    }))
                                }} />
                                <Form.Control type="number" placeholder="e.g 3.5" value={domesticRates.lt.slab4} onChange={e => {
                                    setDomesticRates(values => ({
                                        ...values,
                                        lt: {
                                            ...values.lt,
                                            slab4: Number(e.target.value)
                                        }
                                    }))
                                }} />
                                <Form.Control type="number" placeholder="e.g 3.5" value={domesticRates.lt.slab5} onChange={e => {
                                    setDomesticRates(values => ({
                                        ...values,
                                        lt: {
                                            ...values.lt,
                                            slab5: Number(e.target.value)
                                        }
                                    }))
                                }} />
                            </Col>

                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="FormElementTension">
                            <Form.Label column sm={4}>
                                Low Tension
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control type="number" placeholder="e.g 3.5" value={domesticRates.ht.slab1} onChange={e => {
                                    setDomesticRates(values => ({
                                        ...values,
                                        ht: {
                                            ...values.ht,
                                            slab1: Number(e.target.value)
                                        }
                                    }))
                                }} />
                            </Col>

                        </Form.Group>


                        <Form.Group as={Row} className="mb-3" controlId="FormElementTarrifCategory">
                            <Form.Label column sm={4}>
                                Tarrif Category
                            </Form.Label>
                            <Col sm={8}>

                                <Col sm={8}>
                                    <Form.Label>Commercial</Form.Label>
                                </Col>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="FormElementTension">
                            <Form.Label column sm={4}>
                                Low Tension
                            </Form.Label>

                            <Col sm={8}>

                                <Form.Control type="number" placeholder="e.g 3.5" value={commericalRates.lt.slab1} onChange={e => {
                                    setCommericalRates(values => ({
                                        ...values,
                                        lt: {
                                            ...values.lt,
                                            slab1: Number(e.target.value)
                                        }
                                    }))
                                }} />
                                <Form.Control type="number" placeholder="e.g 3.5" value={commericalRates.lt.slab2} onChange={e => {
                                    setCommericalRates(values => ({
                                        ...values,
                                        lt: {
                                            ...values.lt,
                                            slab2: Number(e.target.value)
                                        }
                                    }))
                                }} />
                                <Form.Control type="number" placeholder="e.g 3.5" value={commericalRates.lt.slab3} onChange={e => {
                                    setCommericalRates(values => ({
                                        ...values,
                                        lt: {
                                            ...values.lt,
                                            slab3: Number(e.target.value)
                                        }
                                    }))
                                }} />
                                <Form.Control type="number" placeholder="e.g 3.5" value={commericalRates.lt.slab4} onChange={e => {
                                    setCommericalRates(values => ({
                                        ...values,
                                        lt: {
                                            ...values.lt,
                                            slab4: Number(e.target.value)
                                        }
                                    }))
                                }} />
                            </Col>

                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="FormElementTension">
                            <Form.Label column sm={4}>
                                High Tension
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control type="number" placeholder="e.g 3.5" value={commericalRates.ht.slab1} onChange={e => {
                                    setCommericalRates(values => ({
                                        ...values,
                                        ht: {
                                            ...values.ht,
                                            slab1: Number(e.target.value)
                                        }
                                    }))
                                }} />
                            </Col>

                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="FormElementTarrifCategory">
                            <Form.Label column sm={4}>
                                Tarrif Category
                            </Form.Label>
                            <Col sm={8}>
                                <Col sm={8}>
                                    <Form.Label>Industrial</Form.Label>
                                </Col>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="FormElementTension">
                            <Form.Label column sm={4}>
                                High Tension
                            </Form.Label>

                            <Col sm={8}>

                                <Form.Control type="number" placeholder="e.g 3.5" value={industrialRates.lt.slab1} onChange={e => {
                                    setIndustrialRates(values => ({
                                        ...values,
                                        lt: {
                                            ...values.lt,
                                            slab1: Number(e.target.value)
                                        }
                                    }))
                                }} />
                                <Form.Control type="number" placeholder="e.g 3.5" value={industrialRates.lt.slab2} onChange={e => {
                                    setIndustrialRates(values => ({
                                        ...values,
                                        lt: {
                                            ...values.lt,
                                            slab2: Number(e.target.value)
                                        }
                                    }))
                                }} />
                            </Col>

                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="FormElementTension">
                            <Form.Label column sm={4}>
                                Low Tension
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control type="number" placeholder="e.g 3.5" value={industrialRates.ht.slab1} onChange={e => {
                                    setIndustrialRates(values => ({
                                        ...values,
                                        ht: {
                                            ...values.ht,
                                            slab1: Number(e.target.value)
                                        }
                                    }))
                                }} />
                            </Col>

                        </Form.Group>
                    </Form>
                    <Button onClick={(e) => {
                    }} className='AdminActionButtons' variant="outline-danger" id='btn-contact'>Close</Button>
                    <Button onClick={(e) => {
                        e.currentTarget.disabled = true;
                        handleAddRatesHandler();
                        e.currentTarget.disabled = false;
                        navigate("/admin");
                    }} className='AdminActionButtons' variant="outline-primary" id='btn-contact'>Add Rates</Button>

                </div>
            </>
            <Footer />
        </>
    )

}
export default AddNewRatesModal;