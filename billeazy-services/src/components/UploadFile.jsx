import Papa from "papaparse";
import { useState, useCallback } from "react";
import { getFirestore, addDoc, collection, getDoc, doc } from '@firebase/firestore';
import app from "../firebaseConfig";
import Dropzone from "./DropZone";
import { UserAuth } from "../context/UserAuthContext";
import Footer from "./Footer";
import NavbarAdminLogout from "./NavbarAdminLogout";
import NavbarLogin from "./NavbarLogin";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { auth } from "../firebaseConfig";

import "./component-styles/upload-file.css"
import NavbarAgentLogout from "./NavbarAgentLogout";
// import { getYYYMMDD } from "../utils/dateConverters";


const allowedExtensions = ["csv"];
const db = getFirestore(app);
const colRef = collection(db, "Meter Reading");
const reqFields = ['Meter_No', 'Current_Reading_Date', 'Current_Reading', 'Reading_Remark'];

const UploadFile = () => {
  const { user } = UserAuth();
  // This state will store the parsed data
  const [cols, setCols] = useState([]);
  const [data, setData] = useState([]);

  // It state will contain the error when
  // correct file extension is not used
  const [error, setError] = useState("");

  // It will store the file uploaded by the user
  const [file, setFile] = useState("");

  const [show, setShow] = useState(false);

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

      const reader = new FileReader();
      // Event listener on reader when the file
      // loads, we parse it and set the data.
      reader.onload = async ({ target }) => {
        const csv = Papa.parse(target.result, { header: true });
        const parsedData = csv?.data
        const columns = Object.keys(parsedData[0]);
        // console.log(parsedData);
        const valid = reqFields.every(value => {
          return columns.includes(value);
        })
        if (!valid) {
          setError("All columns not present in csv");
          return;
        }
        setCols(columns);
        setData(parsedData);
        setError("Data Preview")
        console.log("added data");
      };
      reader.readAsText(inputFile);
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
      const valid = reqFields.every(value => {
        return columns.includes(value);
      })
      if (!valid) {
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

  const onAcceptHandler = () => {
    // console.log(auth.currentUser.email)x
    let count = 0;
    data.forEach(row => {
      // getDocs(db,"Meter Readings",)
      const valid = reqFields.every(value => {
        return row.hasOwnProperty(value);
      })
      if (valid) {
        addDoc(colRef,
          {
            "meterNo": row.Meter_No,
            "unit": row.Unit,
            "currentReadingDate": row.Current_Reading_Date,
            "currentReading": row.Current_Reading,
            "readingRemark": row.Reading_Remark,
            "billGenerated": false
          });
        count += 1;
      }

    });
    if (auth.currentUser) {
      console.log(auth.currentUser.email);
      const employeeRef = collection(db, "uploads")
      addDoc(employeeRef, {
        email: auth.currentUser.email,
        date: Date.now(),
        noEntries: count
      });
    }

    setCols([]);
    setData([]);
    setError("Data pushed successfully")
    setShow(false);
  }

  return (
    <div>

      {user ? <NavbarAgentLogout/> : <NavbarLogin />}
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
        <Dropzone className='drop-area' onDrop={onDrop} />
        {file != "" ? <div>{file["name"]}</div> : console.log("")}
        <div>
          {/* <Button variant="outline-primary" className="parse-btn" onClick={handleParse}>Parse</Button> */}
        </div>
        <div className="preview-table" style={{ marginTop: "3rem" }}>

          {error && <h4>{error}</h4>}
          {data.length && <Table striped bordered>
            <thead> <tr>{reqFields.map(col => <th key={col}>{col}</th>)}</tr></thead>
            <tbody>{data.map((row, idx) =>
              <tr key={idx}>{
                reqFields.map(c => <td key={row[c]}>{row[c]}</td>)
              }</tr>)}
            </tbody>
          </Table>}
          {file ? <Button variant="outline-primary" className="m-5" onClick={() => setShow(true)}>Upload</Button> : null}

          <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Add to database?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShow(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={onAcceptHandler}>
                Add
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default UploadFile;