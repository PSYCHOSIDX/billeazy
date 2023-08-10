import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../component-styles/admin-page.css';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { db } from '../../firebaseConfig';
import { doc, setDoc,updateDoc, addDoc, collection, getDocs, query, orderBy } from '@firebase/firestore';
import { useNavigate } from 'react-router-dom';
import NavbarAdminLogout from '../NavbarAdminLogout';
import Footer from '../Footer';
import { Modal, Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateRates = () => {


    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [ratesDocRef,setRatesDocRef] = useState(null);

    const ratesDate = new Date().toISOString().split('T')[0];
    const [domesticRates, setDomesticRates] = useState(
        {
            lt: {
                slab1: 0,
                slab2: 0,
                slab3: 0,
                slab4: 0,
                slab5: 0,
                fppca1: 0,
                fppca2: 0,
                fppca3: 0,
                fppca4: 0,
                fppca5: 0,
                tension: 'lt'
            },
            ht: {
                slab1: 0,
                fppca1: 0,
                tension: 'ht'
            }
        }
    );
    const [commericalRates, setCommericalRates] = useState(
        {
            lt: {
                slab1: 0,
                slab2: 0,
                slab3: 0,
                slab4: 0,
                fppca1: 0,
                fppca2: 0,
                fppca3: 0,
                fppca4: 0,
                tension: 'lt'
            },
            ht: {
                slab1: 0,
                fppca1: 0,
                tension: 'ht'
            }
        }
    );
    const [industrialRates, setIndustrialRates] = useState(
        {
            lt: {
                slab1: 0,
                slab2: 0,
                fppca1: 0,
                fppca2: 0,
                tension: 'lt'
            },
            ht: {
                slab1: 0,
                fppca1: 0,
                tension: 'ht'
            }
        }
    );

    useEffect(()=>{
        (async()=>{
            const rateSnap = await getDocs(query(collection(db,"rates"), orderBy('date','desc')));
            if (rateSnap.empty)
                return;
            const rates = rateSnap.docs[0].data();
            // console.log(rates);
            setDomesticRates(rates.tariff.domestic);
            setCommericalRates(rates.tariff.commercial);
            setIndustrialRates(rates.tariff.industrial); 
            setRatesDocRef(rateSnap.docs[0].ref);
        })()
    },[])
    useEffect(()=>{},[industrialRates,commericalRates,domesticRates]);
    const handleAddRatesHandler = async () => {
        const rates = {
            tariff: {
                domestic: domesticRates,
                commercial: commericalRates,
                industrial: industrialRates
            },
            date: ratesDate,
        };
        if(ratesDocRef){
            await updateDoc(ratesDocRef, {
                ...rates
            });
        }
        else{
            await addDoc(collection(db, "rates"), {
                ...rates
            });
        }
        
        toast.success('Rates updated successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

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
            <NavbarAdminLogout />
            <Row>
                <Col sm={6}>
                    <h2 className='alerty' >Update Rates</h2>
                </Col>
            </Row>
            <>
                <div style={{ textAlign: 'center', width: "80%" }}>
                    <Modal show={showModal} onHide={() => {
                        setShowModal(false)
                    }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Rates?</Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => { handleAddRatesHandler(); setShowModal(false)}}>
                                Confirm
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

                    }} className='AdminActionButtons' variant="outline-primary" id='btn-contact'>Update Rates</Button>
                </div>
            </>
            <Footer />
        </>
    )

}
export default UpdateRates;