import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../components/component-styles/customerpage.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import '../components/component-styles/admin-page.css'

import React from 'react'




import logo from '../assets/logo.png';
import '../components/component-styles/navbar.css';

function CustomerBillPage() {
    const [key, setKey] = useState('all');
    return (
        <>
           
            <div className='p-5'>
                <div className='my-3'>
                    <Row>
                        <Col sm={4}>
                            <h2 className='fw-semibold'>Customer Page</h2>
                        </Col>
                       
                    </Row>
                </div>
                <div id="mtrca-number">
                    <h4>CA no. :<span>0000</span></h4>
                    <h4>Meter no. :<span>0000</span></h4>
                </div>
                <div>
                    <div>
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={key}
                            defaultActiveKey="all"
                            onSelect={(k) => setKey(k)}
                            className="mb-3"
                        >
                            <Tab eventKey="all" title="All">
                                <div>
                                    <Stack>
                                        <div className="ListHeadings shadow-none p-2">
                                            <Row>
                                                <Col>Bill Id</Col>
                                                <Col>Current reading date</Col>
                                                <Col>Current reading</Col>
                                                <Col>Previous reading date</Col>
                                                <Col>Previous reading</Col>
                                                <Col>Consumption</Col>
                                                <Col>Amount Payable</Col>
                                                <Col>Status</Col>
                                                <Col>Issue</Col>
                                            </Row>
                                        </div>
                                    </Stack>
                                    <Stack gap={2}>
                                        <div className="BillsList bg-light shadow-sm p-2">
                                            <Row>
                                                <Col>0000</Col>

                                                <Col>dd/mm/yy</Col>
                                                <Col>0000</Col>
                                                <Col>dd/mm/yy</Col>
                                                <Col>0000</Col>
                                                <Col>00</Col>
                                                <Col>--</Col>
                                                <Col>Pending</Col>
                                                <Col><a class="bn60" href="/">Report</a></Col>
                                            </Row>
                                        </div>
                                        <div className="BillsList bg-light shadow-sm p-2">
                                            <Row>
                                                <Col>0000</Col>

                                                <Col>dd/mm/yy</Col>
                                                <Col>0000</Col>
                                                <Col>dd/mm/yy</Col>
                                                <Col>0000</Col>
                                                <Col>00</Col>
                                                <Col>--</Col>
                                                <Col>Pending</Col>
                                                <Col><a class="bn60" href="/">Report</a></Col>
                                            </Row>
                                        </div>
                                        <div className="BillsList bg-light shadow-sm p-2">
                                            <Row>
                                                <Col>0000</Col>

                                                <Col>dd/mm/yy</Col>
                                                <Col>0000</Col>
                                                <Col>dd/mm/yy</Col>
                                                <Col>0000</Col>
                                                <Col>00</Col>
                                                <Col>--</Col>
                                                <Col>Pending</Col>
                                                <Col><a class="bn60" href="/">Report</a></Col>
                                                    
                                                
                                            </Row>
                                        </div>
                                    </Stack>
                                </div>
                            </Tab>
                            <Tab eventKey="pending" title="Pending">
                                <div>
                                    <Stack>
                                        <div className="ListHeadings shadow-none p-2">
                                            <Row>
                                                <Col>Bill Id</Col>

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
                                        <div className="BillsList bg-light shadow-sm p-2">
                                            <Row>
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
                                <Stack>
                                    <div className="ListHeadings shadow-none p-2">
                                        <Row>
                                            <Col>Bill Id</Col>

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
                                    <div className="BillsList bg-light shadow-sm p-2">
                                        <Row>
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
            </div>


        </>
    );
}









export default CustomerBillPage;
