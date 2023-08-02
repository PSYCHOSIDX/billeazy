import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import '../component-styles/admin-page.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useState } from 'react';

function BillsList(){
    const [key, setKey] = useState('all');
    return(
        <div>
            <div className='my-4'>
                <Tabs
                id="controlled-tab-example"
                activeKey={key}
                defaultActiveKey="all"
                onSelect={(k) => setKey(k)}
                className="mb-3"
                >
                    <Tab eventKey="all" title="All">
                        <div className='list-container'>
                            <Stack className='list-heading'>
                                <div className="ListHeadings shadow-none p-2">
                                    <Row>
                                        <Col>CA no.</Col>
                                        <Col>Meter No.</Col>
                                        <Col>Current reading date</Col>
                                        <Col>Current reading</Col>
                                        <Col>Previous reading date</Col>
                                        <Col>Previous reading</Col>
                                        <Col>Consumption</Col>
                                        <Col>Amount Payable</Col>
                                        <Col>Status</Col>
                                    </Row>
                                </div>
                            </Stack>
                            <Stack gap={2}>
                                <div className="BillList bg-light shadow-sm p-2">
                                    <Row>
                                        <Col>0000</Col>
                                        <Col>0000</Col>
                                        <Col>dd/mm/yy</Col>
                                        <Col>0000</Col>
                                        <Col>dd/mm/yy</Col>
                                        <Col>0000</Col>
                                        <Col>00</Col>
                                        <Col>--</Col>
                                        <Col>Pending</Col>
                                    </Row>
                                </div>
                                <div className="BillList bg-light shadow-sm p-2">
                                    <Row>
                                        <Col>0000</Col>
                                        <Col>0000</Col>
                                        <Col>dd/mm/yy</Col>
                                        <Col>0000</Col>
                                        <Col>dd/mm/yy</Col>
                                        <Col>0000</Col>
                                        <Col>00</Col>
                                        <Col>--</Col>
                                        <Col>Pending</Col>
                                    </Row>
                                </div>
                                <div className="BillList bg-light shadow-sm p-2">
                                    <Row>
                                        <Col>0000</Col>
                                        <Col>0000</Col>
                                        <Col>dd/mm/yy</Col>
                                        <Col>0000</Col>
                                        <Col>dd/mm/yy</Col>
                                        <Col>0000</Col>
                                        <Col>00</Col>
                                        <Col>--</Col>
                                        <Col>Pending</Col>
                                    </Row>
                                </div>
                            </Stack>
                        </div>
                    </Tab>
                    <Tab eventKey="pending" title="Pending">
                        <div>
                            <Stack gap={2}>
                                <div className="BillList bg-light shadow-sm p-2">
                                    <Row>
                                        <Col>0000</Col>
                                        <Col>0000</Col>
                                        <Col>dd/mm/yy</Col>
                                        <Col>0000</Col>
                                        <Col>dd/mm/yy</Col>
                                        <Col>0000</Col>
                                        <Col>00</Col>
                                        <Col>--</Col>
                                        <Col>Pending</Col>
                                    </Row>
                                </div>
                            </Stack>
                        </div>
                    </Tab>
                    <Tab eventKey="paid" title="Paid">
                        <Stack gap={2}>
                            <div className="BillList bg-light shadow-sm p-2">
                                <Row>
                                    <Col>0000</Col>
                                    <Col>0000</Col>
                                    <Col>dd/mm/yy</Col>
                                    <Col>0000</Col>
                                    <Col>dd/mm/yy</Col>
                                    <Col>0000</Col>
                                    <Col>00</Col>
                                    <Col>--</Col>
                                    <Col>Pending</Col>
                                </Row>
                            </div>
                        </Stack>
                    </Tab>
                    <Tab eventKey="consumertickets" title="Consumer Tickets">
                        <div>
                            <Stack gap={2}>
                                <div className="BillList bg-light shadow-sm p-2">
                                    <Row>
                                        <Col>0000</Col>
                                        <Col>0000</Col>
                                        <Col>dd/mm/yy</Col>
                                        <Col>0000</Col>
                                        <Col>dd/mm/yy</Col>
                                        <Col>0000</Col>
                                        <Col>00</Col>
                                        <Col>--</Col>
                                        <Col>Pending</Col>
                                    </Row>
                                </div>
                            </Stack>
                        </div>
                    </Tab>
                    <Tab eventKey="agents" title="Employees">
                        <Stack gap={2}>
                            <div className="BillList bg-light shadow-sm p-2">
                                <Row>
                                    <Col>0000</Col>
                                    <Col>0000</Col>
                                    <Col>dd/mm/yy</Col>
                                    <Col>0000</Col>
                                    <Col>dd/mm/yy</Col>
                                    <Col>0000</Col>
                                    <Col>00</Col>
                                    <Col>--</Col>
                                    <Col>Pending</Col>
                                </Row>
                            </div>
                        </Stack>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}

export default BillsList;