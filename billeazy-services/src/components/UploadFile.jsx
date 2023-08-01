import Papa from "papaparse";
import { useState } from "react";
import {getFirestore, addDoc, collection} from '@firebase/firestore';
import app from "../firebaseConfig";


const allowedExtensions = ["csv"];
const db = getFirestore(app);
const colRef = collection(db,"Meter Reading");
const reqFields=['Meter_Reading', 'Unit', 'Current_Reading_Date', 'Current_Reading', 
        'Prev_Reading_Date', 'Prev_Reading', 'Reading_Difference', 'MF', 'Consumption', 'Reading_Remark'];

const UploadFile = () =>{
   // This state will store the parsed data
  
   const [cols,setCols] = useState([]);
   const [data, setData] = useState([]);

   // It state will contain the error when
   // correct file extension is not used
   const [error, setError] = useState("");

   // It will store the file uploaded by the user
   const [file, setFile] = useState("");

     // This function will be called when
    // the file input changes
    const handleFileChange = (e) => {
      setError("");

      // Check if user has entered the file
      if (e.target.files.length) {
          const inputFile = e.target.files[0];

          // Check the file extensions, if it not
          // included in the allowed extensions
          // we show the error
          const fileExtension = inputFile?.type.split("/")[1];
          if (!allowedExtensions.includes(fileExtension)) {
              setError("Please input a csv file");
              return;
          }

          // If input type is correct set the state
          setFile(inputFile);
      }
  };
  const handleParse = () => {
 
    // If user clicks the parse button without
    // a file we show a error
    if (!file) return setError("Enter a valid file");

    // Initialize a reader which allows user
    // to read any file or blob.
    const reader = new FileReader();

    // Event listener on reader when the file
    // loads, we parse it and set the data.
    reader.onload = async ({ target }) => {
        const csv = Papa.parse(target.result, { header: true });
        const parsedData = csv?.data
        const columns = Object.keys(parsedData[0]);
        // console.log(parsedData);
        const valid = reqFields.every(value =>{
          return columns.includes(value);
        })
        if(!valid){
          setError("All columns not present in csv");
          return;
        }
        // setCols(columns);
        // setData(parsedData);
        parsedData.forEach(row => {
          addDoc(colRef,{
            "Meter Reading": row.Meter_Reading,
            "Unit": row.Unit,
            "Current Reading Date": row.Current_Reading_Date,
            "Current Reading" :row.Current_Reading ,
            "Prev Reading Date" : row.Prev_Reading_Date,
            "Prev Reading" : row.Prev_Reading,
            "Reading Difference" : row.Reading_Difference,
            "MF" : row.MF,
            "Consumption" : row.Consumption,
            "Reading Remark" : row.Reading_Remark,
          });
        }); 
        console.log("added data");
    };
    reader.readAsText(file);
};
return (
  <div>
      <label htmlFor="csvInput" style={{ display: "block" }}>
          Enter CSV File
      </label>
      <input
          onChange={handleFileChange}
          id="csvInput"
          name="file"
          type="File"
      />
      <div>
          <button onClick={handleParse}>Parse</button>
      </div>
      <div style={{ marginTop: "3rem" }}>

          {error ? error : "All right"}
          {/* cols.map((col,
              idx) => <div key={idx}>{col}</div>)}
              {data.map((d)=><div key={d.Index}>{d.Name}</div>)} */}
      </div>
  </div>
);
};
export default UploadFile;