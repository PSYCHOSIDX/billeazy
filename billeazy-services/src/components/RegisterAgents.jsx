import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import '../components/component-styles/forms.css'

function RegisterAgent() {
  return (
    <div className='forms'>
        <h2 className='fw-semibold mb-5'>Register Agent</h2>
        <Form>
            <Form.Group as={Row} className="mb-3" controlId="FormElementAgentId">
                <Form.Label column sm={2}>
                Agent ID
                </Form.Label>
                <Col sm={5}>
                <Form.Control type="number" placeholder="agent id" />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="FormElementAgentName">
                <Form.Label column sm={2}>
                Name
                </Form.Label>
                <Col sm={5}>
                <Form.Control type="text" placeholder="Agent name" />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="FormElementAgentPassword">
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

export default RegisterAgent;