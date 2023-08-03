import Table from 'react-bootstrap/Table';
import { db } from '../../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import '../component-styles/meter-reading.css'

const reqFields=['Meter_No', 'Unit', 'Current_Reading_Date', 'Current_Reading', 
        'Prev_Reading_Date', 'Prev_Reading', 'Reading_Difference', 'Consumption', 'Reading_Remark'];

const fetchReadings =async () =>{
    const readings = []
    const colRef = collection(db,"Meter Reading");
    const q = query(colRef, where("billGenerated","==",false));
    const querySnap = await getDocs(q);
    console.log("fetched");
    querySnap.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        readings.push(doc.data())
    });
    return readings;
    // console.log(readings);
    // return    getDocs(q).then(snap => snap.docs.map(x => x.data()));
}

const MeterReading = () =>{
    
    const [readings, setReadings] = useState([])
    // console.log(fetchReadings);
    useEffect(() => {
        fetchReadings().then(res => {
            console.log(res);
            setReadings(res)});
      },[]);
    
    return(
        <>
        <h3>Meter Readings</h3>
        {readings.length ?
        <div className='meter-readings-table'>
         <Table striped bordered>
           <thead> <tr>{reqFields.map(col =><th key={col}>{col}</th>)}</tr></thead>
           <tbody>{readings.map((row,idx) => 
            <tr key={idx}>{
                // reqFields.map(c => <td key={row[c]}>{row[c]}</td>)
                <>
                <td>{row["meterNo"]}</td>
                <td>{row["unit"]}</td>
                <td>{row["currentReadingDate"]}</td>
                <td>{row["currentReading"]}</td>
                <td>{row["prevReadingDate"]}</td>
                <td>{row["prevReading"]}</td>
                <td>{row["readingDifference"]}</td>
                <td>{row["consumption"]}</td>
                <td>{row["readingRemark"]}</td>
                </>
            }</tr>)}
            </tbody> 
          </Table>
          </div> : <div>Loading...</div> }

        <Button className='AdminActionButtons' variant="outline-primary">Generate Bills</Button>
        </>
    )
}
export default MeterReading;