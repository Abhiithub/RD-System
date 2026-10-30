import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import './App.css';

export default function App() {

  // --------------------------------------------------
  // STATE VARIABLES
  // --------------------------------------------------

  // arr stores the list of RD users received from the backend API.
  // Initially, it is an empty array because we don't have any data yet.
  const [arr, setArr] = useState([]);

  // show controls whether the Add User modal is visible or hidden.
  // false = modal is closed
  // true  = modal is open
  const [show, setShow] = useState(false);

  // gender stores the gender selected from the radio buttons.
  // Initially, no gender is selected.
  const [gender, setGender] = useState("");


  // --------------------------------------------------
  // MODAL FUNCTIONS
  // --------------------------------------------------

  // This function closes the modal.
  // setShow(false) changes the show state from true to false.
  const handleClose = () => {
    setShow(false);
  };

  // This function opens the modal.
  // setShow(true) changes the show state from false to true.
  const handleShow = () => {
    setShow(true);
  };


  // --------------------------------------------------
  // GET RD USERS FROM BACKEND
  // --------------------------------------------------

  // rduser() calls the Spring Boot API and gets all RD users.
  const rduser = () => {

    axios
      .get("http://localhost:8080/rduser")

      // .then() runs when the API request is successful.
      .then((res) => {

        // Display API response in browser console.
        console.log(res.data);

        // Store the API data inside arr state variable.
        // This causes React to re-render the table.
        setArr(res.data);
      })

      // .catch() handles API errors.
      .catch((error) => {
        console.error("Error fetching RD users:", error);
      });
  };


  // --------------------------------------------------
  // useEffect
  // --------------------------------------------------

  // useEffect is used to perform an action when the component loads.
  //
  // [] means this effect runs only ONE TIME
  // when the App component is loaded.
  //
  // Therefore, rduser() is called automatically
  // when the page opens.
  useEffect(() => {
    rduser();
  }, []);


  // --------------------------------------------------
  // JSX / USER INTERFACE
  // --------------------------------------------------

  return (
    <>
      {/* Page Heading */}
      <center>
        <h1>RD User System</h1>
      </center>


      <div className="table-container">

        {/* 
          Add User button.

          When the user clicks this button,
          handleShow() changes show from false to true,
          which opens the modal.
        */}
        <Button variant="primary" onClick={handleShow}>
          + Add User
        </Button>


        {/* 
          MODAL

          show={show}

          React-Bootstrap uses the show variable to decide
          whether the modal should be displayed.

          show = false → Modal hidden
          show = true  → Modal visible
        */}
        <Modal show={show} onHide={handleClose}>

          {/* Modal Header */}
          <Modal.Header closeButton>
            <Modal.Title>Add RD User</Modal.Title>
          </Modal.Header>


          {/* Modal Body */}
          <Modal.Body>

            {/* Name input */}
            <Form.Control
              type="text"
              placeholder="Name"
            />

            <br />


            {/* Account number input */}
            <Form.Control
              type="text"
              placeholder="Account No"
            />

            <br />


            {/* Date of Birth input */}
            <Form.Control
              type="date"
              placeholder="Date of Birth"
            />

            <br />


            {/* Gender */}
            <label>Gender</label>
            <br />

            {/* Male radio button */}
            <label>
              <input
                type="radio"
                value="Male"

                // Radio button becomes checked
                // when gender state contains "Male".
                checked={gender === "Male"}

                // When user selects Male,
                // gender state becomes "Male".
                onChange={(e) => setGender(e.target.value)}
              />

              {' '}Male
            </label>

            {' '}

            {/* Female radio button */}
            <label>
              <input
                type="radio"
                value="Female"

                // Radio button becomes checked
                // when gender state contains "Female".
                checked={gender === "Female"}

                // When user selects Female,
                // gender state becomes "Female".
                onChange={(e) => setGender(e.target.value)}
              />

              {' '}Female
            </label>

            <br />
            <br />


            {/* Address */}
            <Form.Control
              type="text"
              placeholder="Address"
            />

            <br />


            {/* PAN number */}
            <Form.Control
              type="text"
              placeholder="PAN No"
            />

            <br />


            {/* Nomination Name */}
            <Form.Control
              type="text"
              placeholder="Nomination Name"
            />

            <br />


            {/* Nomination PAN */}
            <Form.Control
              type="text"
              placeholder="Nomination PAN"
            />

            <br />


            {/* Occupation */}
            <Form.Control
              type="text"
              placeholder="Occupation"
            />

          </Modal.Body>


          {/* Modal Footer */}
          <Modal.Footer>

            {/* Close button */}
            <Button
              variant="secondary"
              onClick={handleClose}
            >
              Close
            </Button>


            {/* Save button */}
            <Button
              variant="primary"
              onClick={handleClose}
            >
              Save Changes
            </Button>

          </Modal.Footer>

        </Modal>


        <br />
        <br />


        {/* --------------------------------------------------
            RD USER TABLE
        -------------------------------------------------- */}

        <Table striped bordered hover>

          {/* Table Header */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Account No</th>
              <th>Aadhar Card No</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Address</th>
              <th>PAN No</th>
              <th>Nomination Name</th>
              <th>Nomination PAN</th>
              <th>Occupation</th>
              <th>RD Amount</th>
              <th>RD Date</th>
              <th>Action</th>
            </tr>
          </thead>


          {/* Table Body */}
          <tbody>

            {/* 
              map() loops through every object inside arr.

              Example:

              arr = [
                { rid: 1, name: "Abhi" },
                { rid: 2, name: "Rahul" }
              ]

              map() creates one <tr> for each user.
            */}
            {arr.map((rd) => (

              // Each row needs a unique key.
              // rid is used because it uniquely identifies
              // an RD user.
              <tr key={rd.rid}>

                <td>{rd.rid}</td>
                <td>{rd.name}</td>
                <td>{rd.accno}</td>
                <td>{rd.adharno}</td>
                <td>{rd.dob}</td>
                <td>{rd.gender}</td>
                <td>{rd.address}</td>
                <td>{rd.panno}</td>
                <td>{rd.nname}</td>
                <td>{rd.npanno}</td>
                <td>{rd.occupation}</td>
                <td>{rd.rdamt}</td>
                <td>{rd.rddate}</td>

                {/* Action buttons */}
                <td>

                  {/* Update button */}
                  <Button
                    variant="success"
                  >
                    Update
                  </Button>

                  {' '}

                  {/* Delete button */}
                  <Button
                    variant="warning"
                  >
                    Delete
                  </Button>

                </td>

              </tr>

            ))}

          </tbody>

        </Table>

      </div>
    </>
  );
}