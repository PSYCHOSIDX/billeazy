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
import { Modal, Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddNewRatesModal = () => {


    const [showModal, setShowModal] = useState(false);
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
                fppca1: 1,
                fppca2: 2,
                fppca3: 3,
                fppca4: 4,
                fppca5: 5,
                tension: 'lt'
            },
            ht: {
                slab1: 1,
                fppca1: 1,
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
                fppca1: 1,
                fppca2: 2,
                fppca3: 3,
                fppca4: 4,
                tension: 'lt'
            },
            ht: {
                slab1: 1,
                fppca1: 1,
                tension: 'ht'
            }
        }
    );
    const [industrialRates, setIndustrialRates] = useState(
        {
            lt: {
                slab1: 1,
                slab2: 2,
                fppca1: 1,
                fppca2: 2,
                tension: 'lt'
            },
            ht: {
                slab1: 1,
                fppca1: 1,
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
        await addDoc(collection(db, "rates"), {
            ...rates
        });
        toast.success('Rates added successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        // alert("Rates added successfully");

    }

    return (
        <>
            <ToastContainer />
            <NavbarAdminLogout />
            <Row>
                <Col sm={6}>
                    <h2 className='alerty' >Add New Rates</h2>
                </Col>
            </Row>
            <>
                {/* <div className='forms' style={{ width: "60%", textAlign: 'center' }}>
                    <Table>
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
                    </Table>
                    <Button onClick={(e) => {
                        navigate('/admin');
                    }} className='AdminActionButtons' variant="outline-danger" id='btn-contact'>Close</Button>
                    <Button onClick={(e) => {
                        e.currentTarget.disabled = true;
                        handleAddRatesHandler();
                        e.currentTarget.disabled = false;
                        navigate("/admin");
                    }} className='AdminActionButtons' variant="outline-primary" id='btn-contact'>Add Rates</Button>

                </div> */}
                <div style={{ textAlign: 'center', width: "80%" }}>
                    <Modal show={showModal} onHide={() => {
                        setShowModal(false)
                    }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add to database?</Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => { handleAddRatesHandler(); setShowModal(false)}}>
                                Add
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Table borderless>
                        <tr>
                            <Form.Group as={Row} className="mb-3" controlId="FormElementConsumerName">
                                <Form.Label column sm={4}>
                                    Date
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control disabled type="date" placeholder="" name="ratesDate" value={ratesDate} />
                                </Col>
                            </Form.Group>
                        </tr>
                        <tbody>

                            <tr>
                                <td> Tariff Category</td>
                                <td> Domestic </td>
                            </tr>
                            <tr>
                                <td> Low tension</td>
                                <td> Electricity charges </td>
                                <td> FPPCA charges </td>
                            </tr>
                            <tr>
                                <td> Slab 1</td>
                                <td> <input type="number" min={0} value={domesticRates.lt.slab1} onChange={e => {
                                    setDomesticRates(values => ({
                                        ...values,
                                        lt: {
                                            ...values.ht,
                                            slab1: Number(e.target.value)
                                        }
                                    }))
                                }} /> </td>
                                <td> <input type="number" min={0} value={domesticRates.lt.fppca1} onChange={e => {
                                    setDomesticRates(values => ({
                                        ...values,
                                        lt: {
                                            ...values.lt,
                                            fppca1: Number(e.target.value)
                                        }
                                    }))
                                }} /> </td>
                            </tr>
                            <tr>
                                <td> Slab 2</td>
                                <td> <input type="number" min={0} value={domesticRates.lt.slab2} onChange={e => {
                                    setDomesticRates(values => ({
                                        ...values,
                                        lt: {
                                            ...values.lt,
                                            slab2: Number(e.target.value)
                                        }
                                    }))
                                }} /> </td>
                                <td> <input type="number" min={0} value={domesticRates.lt.fppca2} onChange={e => {
                                    setDomesticRates(values => ({
                                        ...values,
                                        lt: {
                                            ...values.lt,
                                            fppca2: Number(e.target.value)
                                        }
                                    }))
                                }} /> </td>
                            </tr>
                            <tr>
                                <td> Slab 3</td>
                                <td> <input type="number" min={0} value={domesticRates.lt.slab3} onChange={e => {
                                    setDomesticRates(values => ({
                                        ...values,
                                        lt: {
                                            ...values.lt,
                                            slab3: Number(e.target.value)
                                        }
                                    }))
                                }} /> </td>
                                <td> <input type="number" min={0} value={domesticRates.lt.fppca3} onChange={e => {
                                    setDomesticRates(values => ({
                                        ...values,
                                        lt: {
                                            ...values.lt,
                                            fppca3: Number(e.target.value)
                                        }
                                    }))
                                }} /> </td>
                            </tr>
                            <tr>
                                <td> Slab 4</td>
                                <td> <input type="number" min={0} value={domesticRates.lt.slab4} onChange={e => {
                                    setDomesticRates(values => ({
                                        ...values,
                                        lt: {
                                            ...values.lt,
                                            slab4: Number(e.target.value)
                                        }
                                    }))
                                }} /> </td>
                                <td> <input type="number" min={0} value={domesticRates.lt.fppca4} onChange={e => {
                                    setDomesticRates(values => ({
                                        ...values,
                                        lt: {
                                            ...values.lt,
                                            fppca4: Number(e.target.value)
                                        }
                                    }))
                                }} /> </td>
                            </tr>
                            <tr>
                                <td> Slab 5</td>
                                <td> <input type="number" min={0} value={domesticRates.lt.slab5} onChange={e => {
                                    setDomesticRates(values => ({
                                        ...values,
                                        lt: {
                                            ...values.lt,
                                            slab5: Number(e.target.value)
                                        }
                                    }))
                                }} /> </td>
                                <td> <input type="number" min={0} value={domesticRates.lt.fppca5} onChange={e => {
                                    setDomesticRates(values => ({
                                        ...values,
                                        lt: {
                                            ...values.lt,
                                            fppca5: Number(e.target.value)
                                        }
                                    }))
                                }} /> </td>
                            </tr>
                            <tr>
                                <td> High tension</td>
                                <td> Electricity Charges </td>
                                <td> FPPCA charges </td>
                            </tr>
                            <tr>
                                <td> Slab 1</td>
                                <td> <input type="number" min={0} value={domesticRates.ht.slab1} onChange={e => {
                                    setDomesticRates(values => ({
                                        ...values,
                                        ht: {
                                            ...values.ht,
                                            slab1: Number(e.target.value)
                                        }
                                    }))
                                }} /> </td>
                                <td> <input type="number" min={0} value={domesticRates.ht.fppca1} onChange={e => {
                                    setDomesticRates(values => ({
                                        ...values,
                                        ht: {
                                            ...values.ht,
                                            fppca1: Number(e.target.value)
                                        }
                                    }))
                                }} /> </td>
                            </tr>
                            <tr>
                                <td> Tariff Category </td>
                                <td> Commercial </td>
                            </tr>
                            <tr>
                                <td> Low Tension</td>
                                <td> Electricity Charges </td>
                                <td> FPPCA charges </td>
                            </tr>
                            <tr>
                                <td> Slab 1</td>
                                <td> <input type="number" min={0} value={commericalRates.lt.slab1} onChange={e => {
                                    setCommericalRates(values => ({
                                        ...values,
                                        lt: {
                                            ...values.lt,
                                            slab1: Number(e.target.value)
                                        }
                                    }))
                                }} /> </td>
                                <td> <input type="number" min={0} value={commericalRates.lt.fppca1} onChange={e => {
                                    setCommericalRates(values => ({
                                        ...values,
                                        lt: {
                                            ...values.lt,
                                            fppca1: Number(e.target.value)
                                        }
                                    }))
                                }} /> </td>
                            </tr>
                            <tr>
                                <td> Slab 2</td>
                                <td> <input type="number" min={0} value={commericalRates.lt.slab2} onChange={e => {
                                    setCommericalRates(values => ({
                                        ...values,
                                        lt: {
                                            ...values.lt,
                                            slab2: Number(e.target.value)
                                        }
                                    }))
                                }} /> </td>
                                <td> <input type="number" min={0} value={commericalRates.lt.fppca2} onChange={e => {
                                    setCommericalRates(values => ({
                                        ...values,
                                        lt: {
                                            ...values.lt,
                                            fppca2: Number(e.target.value)
                                        }
                                    }))
                                }} /> </td>
                            </tr>
                            <tr>
                                <td> Slab 3</td>
                                <td> <input type="number" min={0} value={commericalRates.lt.slab3} onChange={e => {
                                    setCommericalRates(values => ({
                                        ...values,
                                        lt: {
                                            ...values.lt,
                                            slab3: Number(e.target.value)
                                        }
                                    }))
                                }} /> </td>
                                <td> <input type="number" min={0} value={commericalRates.lt.fppca3} onChange={e => {
                                    setCommericalRates(values => ({
                                        ...values,
                                        lt: {
                                            ...values.lt,
                                            fppca3: Number(e.target.value)
                                        }
                                    }))
                                }} /> </td>
                            </tr>
                            <tr>
                                <td> Slab 4</td>
                                <td> <input type="number" min={0} value={commericalRates.lt.slab4} onChange={e => {
                                    setCommericalRates(values => ({
                                        ...values,
                                        lt: {
                                            ...values.lt,
                                            slab4: Number(e.target.value)
                                        }
                                    }))
                                }} /> </td>
                                <td> <input type="number" min={0} value={commericalRates.lt.fppca4} onChange={e => {
                                    setCommericalRates(values => ({
                                        ...values,
                                        lt: {
                                            ...values.lt,
                                            fppca4: Number(e.target.value)
                                        }
                                    }))
                                }} /> </td>
                            </tr>
                            <tr>
                                <td> High tension</td>
                                <td> Electricity Charges </td>
                                <td> FPPCA charges </td>
                            </tr>

                            <tr>
                                <td> Slab 1</td>
                                <td> <input type="number" min={0} value={commericalRates.ht.slab1} onChange={e => {
                                    setCommericalRates(values => ({
                                        ...values,
                                        ht: {
                                            ...values.ht,
                                            slab1: Number(e.target.value)
                                        }
                                    }))
                                }} /> </td>
                                <td> <input type="number" min={0} value={commericalRates.ht.fppca1} onChange={e => {
                                    setCommericalRates(values => ({
                                        ...values,
                                        ht: {
                                            ...values.lt,
                                            fppca1: Number(e.target.value)
                                        }
                                    }))
                                }} /> </td>
                            </tr>
                            <tr>
                                <td> Tariff Category </td>
                                <td> Industrial </td>
                            </tr>
                            <tr>
                                <td> Low Tension</td>
                                <td> Electricity Charges </td>
                                <td> FPPCA charges </td>
                            </tr>
                            <tr>
                                <td> Slab 1</td>
                                <td> <input type="number" min={0} value={industrialRates.lt.slab1} onChange={e => {
                                    setIndustrialRates(values => ({
                                        ...values,
                                        lt: {
                                            ...values.lt,
                                            slab1: Number(e.target.value)
                                        }
                                    }))
                                }} /> </td>
                                <td> <input type="number" min={0} value={industrialRates.lt.fppca1} onChange={e => {
                                    setIndustrialRates(values => ({
                                        ...values,
                                        lt: {
                                            ...values.lt,
                                            fppca1: Number(e.target.value)
                                        }
                                    }))
                                }} /> </td>
                            </tr>
                            <tr>
                                <td> Slab 2</td>
                                <td> <input type="number" min={0} value={industrialRates.lt.slab2} onChange={e => {
                                    setIndustrialRates(values => ({
                                        ...values,
                                        lt: {
                                            ...values.lt,
                                            slab2: Number(e.target.value)
                                        }
                                    }))
                                }} /> </td>
                                <td> <input type="number" min={0} value={industrialRates.lt.fppca2} onChange={e => {
                                    setIndustrialRates(values => ({
                                        ...values,
                                        lt: {
                                            ...values.lt,
                                            fppca2: Number(e.target.value)
                                        }
                                    }))
                                }} /> </td>
                            </tr>
                            <tr>
                                <td> High tension</td>
                                <td> Electricity Charges </td>
                                <td> FPPCA charges </td>
                            </tr>
                            <tr>
                                <td> Slab 1</td>
                                <td> <input type="number" min={0} value={industrialRates.ht.slab1} onChange={e => {
                                    setIndustrialRates(values => ({
                                        ...values,
                                        ht: {
                                            ...values.ht,
                                            slab1: Number(e.target.value)
                                        }
                                    }))
                                }} /> </td>
                                <td> <input type="number" min={0} value={industrialRates.ht.fppca1} onChange={e => {
                                    setIndustrialRates(values => ({
                                        ...values,
                                        ht: {
                                            ...values.ht,
                                            fppca1: Number(e.target.value)
                                        }
                                    }))
                                }} /> </td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button onClick={(e) => {
                        navigate('/admin');
                    }} className='AdminActionButtons' variant="outline-danger" id='btn-contact'>Close</Button>
                    <Button onClick={(e) => {
                        // e.currentTarget.disabled = true;
                        setShowModal(true);
                        // e.currentTarget.disabled = false;

                    }} className='AdminActionButtons' variant="outline-primary" id='btn-contact'>Add Rates</Button>
                </div>
            </>
            <Footer />
        </>
    )

}
export default AddNewRatesModal;