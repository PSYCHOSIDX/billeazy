import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import '../global-styles/global.css'
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getYYYMMDD } from '../utils/dateConverters';
import { Table } from 'react-bootstrap';

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

                toast.success('Data Fetched Successfully', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
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

        <Table responsive bordered  className='table-hold'>
            <thead>
                    <tr>
                        <th id='thx'>Upload date and Time</th>
                        <th id='thx'>No. of records</th>
                    </tr>
            </thead>
            <tbody gap={2}>
                {uploads.map(upload => 
                     (<tr key={upload.id} className="BillList bg-light shadow-sm p-2">
                            <td>{getYYYMMDD(upload.date)}</td>
                            <td>{upload.noEntries}</td>
                    </tr>)
                )}
            </tbody>
            </Table>
        </>)

                          
    }
    return (<>
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
        <div className='m-5'>
            <h2 className='fw-semibold alertx'>Agent Upload History</h2>
            <div className='mx-5 px-5 my-3 alerty'>
                {loading ?
                    <div>Loading...</div>
                    : returnData}
            </div>
        </div>
        </>
    );
}

export default UploadHistory;