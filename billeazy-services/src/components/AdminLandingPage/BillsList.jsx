import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import '../component-styles/admin-page.css';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, updateDoc, doc, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

function BillsList() {
    const [key, setKey] = useState('all');
    const [pendingReports, setPendingReports] = useState(null);
    

    const handleGetReports = async e => {
        const getPendingReports = await getDocs(query(collection(db, "reports"), where("status", "==", "pending")));
        console.log(getPendingReports);
        setPendingReports(getPendingReports.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        console.log(pendingReports)
    }

    const handleResolution = async (id) => {
        await updateDoc(doc(db, "reports", id), {
            status: "resolved"
        });
        setPendingReports([]);
    }

    useEffect(() => {
        handleGetReports();
    }, [])
    useEffect(() => {
        console.log(pendingReports);
    }, [pendingReports])

    return (
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
                            {pendingReports?.length > 0 ? (
                                pendingReports.map(report => {
                                    if (report.status == "pending") {
                                        return (
                                            <Stack gap={2}>
                                                <div className="BillsList bg-light shadow-sm p-2">
                                                    <Row>
                                                        <Col>{report.id}</Col>
                                                        <Col>{report.billId}</Col>
                                                        <Col>{report.email}</Col>
                                                        <Col>{report.description}</Col>
                                                        <Col><Button className='AdminResolve' variant="outline-primary" onClick={() =>
                                                            handleResolution(report.id)
                                                        }>Resolve</Button>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Stack>
                                        )
                                    }
                                })
                            ) : (
                                <Stack gap={2}>
                                    <div className="BillsList bg-light shadow-sm p-2">
                                        <Row>
                                            <Col>No Pending Reports</Col>
                                        </Row>
                                    </div>
                                </Stack>
                            )
                        }
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