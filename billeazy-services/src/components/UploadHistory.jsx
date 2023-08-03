import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';

function UploadHistory(){
    return(
        <div className='m-5'>
            <h2 className='fw-semibold'>Agent Upload History</h2>
            <div className='mx-5 px-5 my-3'>
                <Stack>
                    <div className="ListHeadings shadow-none p-2">
                        <Row>
                            <Col>Upload date and Time</Col>
                            <Col>No. of records</Col>
                        </Row>
                    </div>
                </Stack>
                <Stack gap={2}>
                    <div className="BillList bg-light shadow-sm p-2">
                        <Row>
                            <Col>hh:mm dd/mm/yy</Col>
                            <Col>No. of records</Col>
                        </Row>
                    </div>
                    <div className="BillList bg-light shadow-sm p-2">
                        <Row>
                            <Col>hh:mm dd/mm/yy</Col>
                            <Col>No. of records</Col>
                        </Row>
                    </div>
                    <div className="BillList bg-light shadow-sm p-2">
                        <Row>
                            <Col>hh:mm dd/mm/yy</Col>
                            <Col>No. of records</Col>
                        </Row>
                    </div>
                </Stack>
            </div>
        </div>
    );
}

export default UploadHistory;