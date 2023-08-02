import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import '../components/component-styles/forms.css'

function RegisterConsumer() {
  return (
    <div className='forms'>
        <h2 className='fw-semibold mb-5'>Register Consumer</h2>
        <Form>
            <Form.Group as={Row} className="mb-3" controlId="FormElementConsumerId">
                <Form.Label column sm={2}>
                Consumer ID
                </Form.Label>
                <Col sm={5}>
                <Form.Control type="number" placeholder="consumer id" />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="FormElementConsumerName">
                <Form.Label column sm={2}>
                Name
                </Form.Label>
                <Col sm={5}>
                <Form.Control type="text" placeholder="consumer name" />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="FormElementMeterNumber">
                <Form.Label column sm={2}>
                Meter Number
                </Form.Label>
                <Col sm={5}>
                <Form.Control type="number" placeholder="" />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="FormElementSanctionedLoad">
                <Form.Label column sm={2}>
                Sanctioned Load
                </Form.Label>
                <Col sm={5}>
                <Form.Control type="number" placeholder="" />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="FormElementConsumerType">
                <Form.Label column sm={2}>
                    Consumer Type
                </Form.Label>
                <Col sm={5}>
                    <Form.Select>
                        <option>Domestic</option>
                        <option>Commercial</option>
                        <option>Industrial</option>
                    </Form.Select>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="FormElementPassword">
                <Form.Label column sm={2}>
                Password
                </Form.Label>
                <Col sm={5}>
                <Form.Control type="password" placeholder="Password" />
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