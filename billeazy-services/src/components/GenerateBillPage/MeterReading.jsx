import Table from 'react-bootstrap/Table';
import { db } from '../../firebaseConfig';
import { collection, getDocs, getDoc, limit, orderBy, query, where, addDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import '../component-styles/meter-reading.css'
import { useNavigate } from 'react-router-dom';
import '../../global-styles/global.css'
import { generateAmount } from '../../utils/billGeneration';

const reqFields = ['Meter_No', 'Unit', 'Current_Reading_Date', 'Current_Reading', 'Reading_Remark'];

const fetchReadings = async () => {
  const readings = []
  const colRef = collection(db, "Meter Reading");
  const q = query(colRef, where("billGenerated", "==", false));
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


// const onGenerateBill = async (readings) =>{
//     for(const row of readings)
//     {
//         let consumption = 0,lastBillDate = null;
//         const oldReadingSnap = await getDocs(query(collection(db, "Meter Reading"), where("meterNo","==",row["meterNo"]),
//                 where("billGenerated","==",true),orderBy("currentReadingDate","desc"),limit(1)));
//         console.log(oldReadingSnap);
//         if(oldReadingSnap.empty)
//         {
//             consumption = row["currentReading"];
//         }else{
//             consumption = row["currentReading"]-oldReadingSnap.docs[0].data()['currentReading'];
//             lastBillDate = oldReadingSnap.docs[0].data('currentReadingDate')
//         }
//         console.log("consumption: ",consumption);
//     }

// }
Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

const getBillingPeriod = (start,end) =>{
  const s = new Date(start);
  const e = new Date(end);
  const seconds = Number((s-e)/1000);
  const days= Math.floor(seconds / (3600 * 24));
  return days;
}

const onGenerateBill = async (readings) => {

  const date = new Date();
  for (const doc of readings) {

    try {
      let newBill = {}


      const getConsumer = await getDocs(query(collection(db, "consumers"), where("meterNo", "==", `${doc.meterNo}`)));
      //   console.log(getConsumer);

      const consumerRef = getConsumer.docs[0].data();

      const getPrevBill = await getDocs(query(collection(db, "bills"), where("meterNo", "==", `${doc.meterNo}`), orderBy("date", "desc")));

      //   const prevBill = getPrevBill.docs[0].data();

      if (getPrevBill.empty) {

        const readingDifference = (Math.floor(doc.currentReading));

        const amount = generateAmount(consumerRef.tariffCategory, consumerRef.tension, readingDifference, consumerRef.sanctionedLoad);

        newBill = {
          consumerAccNo: consumerRef.consumerAccNo,
          meterNo: doc.meterNo,
          billNo: `${Math.ceil(Math.random() * Math.pow(10, 10))}`,
          billDate: date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate(),
          dueDate: date.addDays(7),
          unit: (consumerRef.tension === 'lt') ? 'KWH' : 'KVAH',
          currentReadingDate: doc.currentReadingDate,
          currentReading: doc.currentReading,
          prevReadingDate: "N/A",
          prevReading: 0,
          billingPeriod: getBillingPeriod(Date.now(),consumerRef.energizationDate) ,  
          readingDifference,
          overdueAmount: 0,
          amount,
          paymentStatus: "pending"
        }

      } else {

        const prevBill = getPrevBill.docs[0].data();

        const readingDifference = (Math.floor(doc.currentReading) - Math.floor(prevBill.currentReading));

        const amount = generateAmount(consumerRef.tariffCategory, consumerRef.tension, readingDifference, consumerRef.sanctionedLoad);

        newBill = {

          consumerAccNo: consumerRef.consumerAccNo,
          meterNo: doc.meterNo,
          billNo: `${Math.ceil(Math.random() * Math.pow(10, 10))}`,
          billDate: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
          dueDate: date.addDays(7),
          unit: (consumerRef.tension === 'lt') ? 'KWH' : 'KVAH',
          currentReadingDate: doc.currentReadingDate,
          currentReading: doc.currentReading,
          prevReadingDate: prevBill.currentReadingDate,
          prevReading: prevBill.currentReadingReading,
          billingPeriod: getBillingPeriod(Date.now(),prevBill.currentReadingDate),
          readingDifference,
          overdueAmount: prevBill.paymentStatus == "pending" ? prevBill.amount : 0,
          amount: prevBill.amount + amount,
          paymentStatus: "pending"
        };

      }

      await addDoc(collection(db, "bills"), {

        ...newBill

      });
      const meterRef = (await getDocs(query(collection(db, "Meter Reading"), where("meterNo", "==", newBill.meterNo)))).docs[0].ref;
      await updateDoc(meterRef, {
        billGenerated: true
      });
      alert("Bills added successfully");                  
    }

    catch (e) {
      console.log(e);
      alert("Something went wrong");
    }

    // const reads = await getDocs(query(collection(db,"Meter Reading"), where("billGenerated","==",false)))
    // for (const read of reads.docs)
    // {
    //     await updateDoc(read.ref,{
    //         billGenerated : true
    //     })
    // }
  }

};

const MeterReading = () => {

  const [readings, setReadings] = useState([])
  const navigate = useNavigate();
  // console.log(fetchReadings);
  useEffect(() => {
    fetchReadings().then(res => {
      // console.log(res);
      setReadings(res)
    });
  }, []);

  return (
    <>
      <h3 className='alerty'>Pending Meter Readings</h3>
      {readings.length ?
        <div className='meter-readings-table'>
          <Table striped bordered>
            <thead> <tr>{reqFields.map(col => <th key={col}>{col}</th>)}</tr></thead>
            <tbody>{readings.map((row, idx) =>
              <tr key={idx}>{
                <>
                  <td>{row["meterNo"]}</td>
                  <td>{row["unit"]}</td>
                  <td>{Date(row["currentReadingDate"])}</td>
                  <td>{row["currentReading"]}</td>
                  {/* <td>{row["prevReadingDate"]}</td> */}
                  {/* <td>{row["prevReading"]}</td> */}
                  {/* <td>{row["readingDifference"]}</td> */}
                  {/* <td>{row["consumption"]}</td> */}
                  <td>{row["readingRemark"]}</td>
                </>
              }</tr>)}
            </tbody>
          </Table>
        </div> : <div className='alertx'>No results found...</div>}

      <Button onClick={() => {
        onGenerateBill(readings)
        navigate("/admin")
      }} className='AdminActionButtons' variant="outline-primary" id='btn-contact'>Generate Bills</Button>
    </>
  )
}
export default MeterReading;