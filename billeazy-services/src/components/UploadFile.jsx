import Papa from "papaparse";
import { useState, useCallback  } from "react";
import {getFirestore, addDoc, collection} from '@firebase/firestore';
import app from "../firebaseConfig";
import Dropzone from "./DropZone";

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

    const onDrop = useCallback(acceptedFiles => {
      // this callback will be called after files get dropped, we will get the acceptedFiles. If you want, you can even access the rejected files too
      handleFileChange(acceptedFiles);
    }, []);
    const handleFileChange = (files) => {
      setError("");
      // console.log(files);
      // Check if user has entered the file
      if (files.length) {
          const inputFile = files[0];

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
    console.log(file);
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
        // if(!valid){
        //   setError("All columns not present in csv");
        //   return;
        // }
        setCols(columns);
        setData(parsedData);
       
        console.log("added data");
    };
    reader.readAsText(file);
};

const onAcceptHandler = () =>{
   data.forEach(row => {
           addDoc(colRef,
            {
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
}
return (
  <div>
      <label htmlFor="csvInput" style={{ display: "block" }}>
          Enter CSV File
      </label>
      {/* <input
          onChange={handleFileChange}
          id="csvInput"
          name="file"
          type="File"
      /> */}
        <Dropzone onDrop={onDrop}/>
        {file !=""? <div>{file["name"]}</div>:console.log("")}
      <div>
          <button onClick={handleParse}>Parse</button>
      </div>
      <div style={{ marginTop: "3rem" }}>

          {error ? error : "All right"}
          <table>
            <tr>{cols.map(col =><th key={col}>{col}</th>)}</tr>
            {data.map((row,idx) => 
            <tr key={idx}>{
              cols.map(c => <td key={row[c]}>{row[c]}</td>)
            }</tr>)}
          </table>
          <button onClick={onAcceptHandler}>Accept</button>
      </div>
  </div>
);
};
export default UploadFile;