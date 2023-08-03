import Papa from "papaparse";
import { useState, useCallback  } from "react";
import {getFirestore, addDoc, collection} from '@firebase/firestore';
import app from "../firebaseConfig";
import Dropzone from "./DropZone";
import { UserAuth } from "../context/UserAuthContext";
import Footer from "./Footer";
import NavbarAdminLogout  from "./NavbarAdminLogout";
import NavbarLogin from "./NavbarLogin";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

import "./component-styles/upload-file.css"


const allowedExtensions = ["csv"];
const db = getFirestore(app);
const colRef = collection(db,"Meter Reading");
const reqFields=['Meter_Reading', 'Unit', 'Current_Reading_Date', 'Current_Reading', 
        'Prev_Reading_Date', 'Prev_Reading', 'Reading_Difference', 'MF', 'Consumption', 'Reading_Remark'];

const UploadFile = () =>{
  const {user} = UserAuth();
   // This state will store the parsed data
  
   const [cols,setCols] = useState([]);
   const [data, setData] = useState([]);

   // It state will contain the error when
   // correct file extension is not used
   const [error, setError] = useState("");

   // It will store the file uploaded by the user
   const [file, setFile] = useState("");

   const [show,setShow] = useState(false);

     // This function will be called when
    // the file input changes

    const onDrop = useCallback(acceptedFiles => {
      // this callback will be called after files get dropped, we will get the acceptedFiles. If you want, you can even access the rejected files too
      handleFileChange(acceptedFiles);
      // handleParse();
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
        if(!valid){
          setError("All columns not present in csv");
          return;
        }
        setCols(columns);
        setData(parsedData);
        setError("Data Preview")
        console.log("added data");
    };
    reader.readAsText(file);
};

const onAcceptHandler = () =>{
 
  // setData(data.slice(0, -1));
  // console.log(data);
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
   setCols([]);
   setData([]);
   setError("Data pushed successfully")
   setShow(false);
  }
  
   

return (
  <div>
    {user ? <NavbarAdminLogout/> : <NavbarLogin/>}
    <div className="upload-area">
      {/* <label htmlFor="csvInput" style={{ display: "block" }}>
          Upload your CSV file with meter
      </label> */}
      {/* <input
          onChange={handleFileChange}
          id="csvInput"
          name="file"
          type="File"
      /> */}
        <Dropzone className='drop-area' onDrop={onDrop}/>
        {file !=""? <div>{file["name"]}</div>:console.log("")}
      <div>
          <Button variant="outline-primary" className="parse-btn" onClick={handleParse}>Parse</Button>
      </div>
      <div className="preview-table"style={{ marginTop: "3rem" }}>

          {error ?? error }
          <Table striped bordered>
           <thead> <tr>{cols.map(col =><th key={col}>{col}</th>)}</tr></thead>
           <tbody>{data.map((row,idx) => 
            <tr key={idx}>{
              cols.map(c => <td key={row[c]}>{row[c]}</td>)
            }</tr>)}
            </tbody> 
          </Table>
        {file ?<Button variant="outline-primary" className="m-5" onClick={()=> setShow(true)}>Upload</Button>:null}
          
      <Modal show={show} onHide={()=> setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add to database?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=> setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={onAcceptHandler}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      </div>
      <Footer/>
  </div>
);
};
export default UploadFile;