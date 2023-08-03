import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import '../components/component-styles/forms.css'
import { useState } from 'react';

const RegisterConsumer = ({setIsRegister}) => {
    const [consumerName,setConsumerName] = useState("");
    const [consumerAccNo,setConsumerAccNo] = useState(Math.ceil(Math.random()*Math.pow(10,12)).toString());
    const [instNo,setInstNo] = useState(Math.ceil(Math.random()*Math.pow(10,6)).toString());
    const [address,setAddress] = useState("");
    const [telephoneNo,setTelephoneNo] = useState("");
    const [email,setEmail] = useState("");
    const [energizationDate,setEnergizationDate] = useState("");
    const [meterNo,setMeterNo] = useState("");
    const [tarrifCategory,setTarrifCategory] = useState("");
    const [sanctionedLoad,setSanctionedLoad] = useState("")

    const handleRegister = async e =>{
        e.preventDefault();
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
            await setDoc(doc(db, "consumer", {consumerAccNo}), {
              ...newConsumer
            });
        }catch(error){
            console.log(error);
        }

        setIsRegister(false);
    }
    return (
    <div className='forms'>
        <h2 className='fw-semibold mb-5'>Register Consumer</h2>
        <Form>
            <Form.Group as={Row} className="mb-3" controlId="FormElementConsumerName">
                <Form.Label column sm={4}>
                Name
                </Form.Label>
                <Col sm={8}>
                <Form.Control type="text" placeholder="consumer name" id="consumerName" name="consumerName" value={consumerName} onChange={e=>setConsumerName(e.target.value)}/>
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
                <Form.Control type="number" placeholder="installation number" id="instNo" name="instNo" value={instNo} onChange={e=>setInstNo(e.target.value)} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="FormElementConsumerId">
                <Form.Label column sm={4}>
                Address
                </Form.Label>
                <Col sm={8}>
                <Form.Control type="text" placeholder="address" id="address" name="address" value={address} onChange={e=>setAddress(e.target.value)} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="FormElementConsumerId">
                <Form.Label column sm={4}>
                Telephone Number
                </Form.Label>
                <Col sm={8}>
                <Form.Control type="number" placeholder="telephone no" id="telephoneNo" name="telephoneNo" value={telephoneNo} onChange={e=>setTelephoneNo(e.target.value)} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="FormElementConsumerId">
                <Form.Label column sm={4}>
                Email ID
                </Form.Label>
                <Col sm={8}>
                <Form.Control type="email" placeholder="email" id="email" name="email" value={email} onChange={e=>setEmail(e.target.value)} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="FormElementConsumerId">
                <Form.Label column sm={4}>
                Energization Date
                </Form.Label>
                <Col sm={8}>
                <Form.Control type="date" placeholder="energizationDate" id="energizationDate" name="energizationDate" value={energizationDate} onChange={e=>setEnergizationDate(e.target.value)} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="FormElementMeterNumber">
                <Form.Label column sm={4}>
                Meter Number
                </Form.Label>
                <Col sm={8}>
                <Form.Control type="text" pattern="^[A-Z]{4}[0-9]{8}\z" placeholder="meter number" id="meterNo" name="meterNo" value={meterNo} onChange={e=>setMeterNo(e.target.value)} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="FormElementConsumerType">
                <Form.Label column sm={4}>
                    Consumer Type
                </Form.Label>
                <Col sm={8}>
                    <Form.Select id="tarrifCategory" name="tarrifCategory" value ={tarrifCategory} onChange={e=>setTarrifCategory(e.target.value)}>
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
                <Form.Control type="number" placeholder="sanctioned load" id="sanctionedLoad" name="sanctionedLoad" value={sanctionedLoad} onChange={e=>setSanctionedLoad(e.target.value)} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit">Register</Button>
                </Col>
            </Form.Group>
        </Form>
    </div>
  );
}

export default RegisterConsumer;