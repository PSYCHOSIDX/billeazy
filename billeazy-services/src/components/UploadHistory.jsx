import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import '../global-styles/global.css'

function UploadHistory() {
    const [uploads, setUploads] = useState([]);
    const [loading, setLoading] = useState(true);
    let returnData;
    useEffect(() => {
        (async () => {
            if (auth.currentUser) {
                // console.log(auth.currentUser.email);
                const fetchedUploads = await getDocs(query(collection(db, 'uploads'), where('email', '==', auth.currentUser.email)
                    , orderBy('date', 'desc')));
                const data = fetchedUploads.docs.map(u => ({
                    id: u.id,
                    ...u.data()
                }))
                setUploads(data)
                setLoading(false);
            }
        })()

    }, [auth.currentUser])
    useEffect(() => { }, [uploads])

    if (uploads.length === 0) {
        returnData = (
            <>
                <div>No Uploads found...</div>
            </>
        )

    } else {
        // console.log(uploads);
        returnData = (<>
            <Stack>
                <div className="ListHeadings shadow-none p-2">
                    <Row>
                        <Col >Upload date and Time</Col>
                        <Col>No. of records</Col>
                    </Row>
                </div>
            </Stack>
            <Stack gap={2}>
                {uploads.map(upload => 
                     (<div key={upload.id} className="BillList bg-light shadow-sm p-2">
                        <Row>
                            <Col>{Date(upload.date)}</Col>
                            <Col>{upload.noEntries}</Col>
                        </Row>
                    </div>)
                )}
            </Stack>
        </>)
    }
    return (
        <div className='m-5'>
            <h2 className='fw-semibold alertx'>Agent Upload History</h2>
            <div className='mx-5 px-5 my-3 alerty'>
                {loading ?
                    <div>Loading...</div>
                    : returnData}
            </div>
        </div>
    );
}

export default UploadHistory;