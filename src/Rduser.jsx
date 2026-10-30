import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import './App.css';
import { useNavigate } from 'react-router-dom';
export default function Rduser() {
const navigate=useNavigate();
  // =========================
  // ADD USER
  // =========================

  const [arr, setrd] = useState([]);

  const [show, setShow] = useState(false);

  const [name, setName] = useState("");
  const [address, Setaddress] = useState("");
  const [dob, SetDob] = useState("");
  const [gender, SetGen] = useState("");
  const [rddate, SetRddt] = useState("");
  const [rdamt, SetRdamt] = useState(0);
  const [occupation, SetAoup] = useState("");
  const [accno, SetAccno] = useState("");
  const [adharno, SetAdharno] = useState("");
  const [panno, SetPanno] = useState("");
  const [nname, SetNname] = useState("");
  const [naddr, SetNadr] = useState("");
  const [npanno, SetNpan] = useState("");

  // Add form handlers

  const hndname = (e) => {
    setName(e.target.value);
  };

  const hndaddress = (e) => {
    Setaddress(e.target.value);
  };

  const hndDob = (e) => {
    SetDob(e.target.value);
  };

  const hndIgen = (e) => {
    SetGen(e.target.value);
  };

  const hndIrddt = (e) => {
    SetRddt(e.target.value);
  };

  const hndIrdamt = (e) => {
    SetRdamt(e.target.value);
  };

  const hndIacup = (e) => {
    SetAoup(e.target.value);
  };

  const hndIacno = (e) => {
    SetAccno(e.target.value);
  };

  const hndIadharno = (e) => {
    SetAdharno(e.target.value);
  };

  const hndIpanno = (e) => {
    SetPanno(e.target.value);
  };

  const hndInnm = (e) => {
    SetNname(e.target.value);
  };

  const hndInadr = (e) => {
    SetNadr(e.target.value);
  };

  const hndInpann = (e) => {
    SetNpan(e.target.value);
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);


  // =========================
  // UPDATE USER
  // =========================

  const [ushow, usetShow] = useState(false);

  const [urid, usetRid] = useState(0);
  const [uname, usetName] = useState("");
  const [uaddress, usetAddress] = useState("");
  const [udob, usetDob] = useState("");
  const [ugender, usetGender] = useState("");
  const [urddate, usetRddate] = useState("");
  const [urdamt, usetRdamt] = useState(0);
  const [uoccupation, usetOccupation] = useState("");
  const [uaccno, usetAccno] = useState("");
  const [uadharno, usetAdharno] = useState("");
  const [upanno, usetPanno] = useState("");
  const [unname, usetNname] = useState("");
  const [unaddr, usetNaddr] = useState("");
  const [unpanno, usetNpanno] = useState("");


  // Update modal handlers

  const uhandleClose = () => usetShow(false);


  const uhndname = (e) => {
    usetName(e.target.value);
  };

  const uhndaddress = (e) => {
    usetAddress(e.target.value);
  };

  const uhndDob = (e) => {
    usetDob(e.target.value);
  };

  const uhndIgen = (e) => {
    usetGender(e.target.value);
  };

  const uhndIrddt = (e) => {
    usetRddate(e.target.value);
  };

  const uhndIrdamt = (e) => {
    usetRdamt(e.target.value);
  };

  const uhndIacup = (e) => {
    usetOccupation(e.target.value);
  };

  const uhndIacno = (e) => {
    usetAccno(e.target.value);
  };

  const uhndIadharno = (e) => {
    usetAdharno(e.target.value);
  };

  const uhndIpanno = (e) => {
    usetPanno(e.target.value);
  };

  const uhndInnm = (e) => {
    usetNname(e.target.value);
  };

  const uhndInadr = (e) => {
    usetNaddr(e.target.value);
  };

  const uhndInpann = (e) => {
    usetNpanno(e.target.value);
  };


  // =========================
  // GET USERS
  // =========================

  const rduser = () => {

    axios.get("http://localhost:8080/rduser")
      .then(res => {

        console.log(res.data);

        setrd(res.data);

      })
      .catch(err => {

        console.log(err);

      });

  };


  useEffect(() => {

    rduser();

  }, []);


  // =========================
  // DELETE
  // =========================

  const del = (rid) => {

    axios.delete("http://localhost:8080/del/" + rid)
      .then(res => {

        alert("Deleted successfully");

        rduser();

      })
      .catch(err => {

        console.log(err);

      });

  };


  // =========================
  // OPEN UPDATE MODAL
  // =========================

  const update = (
    rid,
    name,
    address,
    dob,
    gender,
    rddate,
    rdamt,
    occupation,
    accno,
    adharno,
    panno,
    nname,
    naddr,
    npanno
  ) => {

    usetRid(rid);
    usetName(name);
    usetAddress(address);
    usetDob(dob);
    usetGender(gender);
    usetRddate(rddate);
    usetRdamt(rdamt);
    usetOccupation(occupation);
    usetAccno(accno);
    usetAdharno(adharno);
    usetPanno(panno);
    usetNname(nname);
    usetNaddr(naddr);
    usetNpanno(npanno);
    usetShow(true);
  };


  // =========================
  // ACTUALLY UPDATE
  // =========================

  const updateUser = () => {

    const rd = {

      rid: urid,
      name: uname,
      address: uaddress,
      dob: udob,
      gender: ugender,
      rddate: urddate,
      rdamt: urdamt,
      occupation: uoccupation,
      accno: uaccno,
      adharno: uadharno,
      panno: upanno,
      nname: unname,
      naddr: unaddr,
      npanno: unpanno,
      agree: true

    };
    axios.put("http://localhost:8080/update", rd)

      .then(res => {

        alert("Updated successfully");

        usetShow(false);

        rduser();

      })

  };

const view = (rid) => {
  alert(rid);
  navigate(`/user/${rid}`);
};
  // =========================
  // SAVE
  // =========================

  const save = () => {

    const rd = {

      accno: accno,
      address: address,
      adharno: adharno,
      agree: true,
      dob: dob,
      gender: gender,
      name: name,
      nname: nname,
      npanno: npanno,
      occupation: occupation,
      panno: panno,
      rdamt: rdamt,
      rddate: rddate,
      naddr: naddr

    };

    axios.post("http://localhost:8080/save", rd)

      .then(res => {

        console.log("Success:", res.data);

        alert("Inserted");

        setShow(false);

        rduser();

      })

      .catch(err => {

        console.log(err);

        alert("Error while inserting");

      });

  };


  return (

    <div className="main-container">

      {/* =========================
          HEADER
      ========================= */}

      <div className="page-header">

        <div>

          <h1>RD User System</h1>

          <p>Manage RD customer information</p>

        </div>


        <Button
          variant="primary"
          className="add-user-btn"
          onClick={handleShow}
        >

          + Add User

        </Button>

      </div>


      {/* =========================
          ADD USER MODAL
      ========================= */}

      <Modal
        show={show}
        onHide={handleClose}
        centered
      >

        <Modal.Header closeButton>

          <Modal.Title>
            Add RD User
          </Modal.Title>

        </Modal.Header>


        <Modal.Body>

          <Form.Control
            type="text"
            placeholder="Name"
            onChange={hndname}
          />

          <br />

          <Form.Control
            type="text"
            placeholder="Address"
            onChange={hndaddress}
          />

          <br />

          <Form.Control
            type="text"
            placeholder="Account No"
            onChange={hndIacno}
          />

          <br />

          <label>dob</label>

          <Form.Control
            type="date"
            onChange={hndDob}
          />

          <br />

          <label>rddate</label>

          <Form.Control
            type="date"
            onChange={hndIrddt}
          />

          <br />

          <label>rdamt</label>

          <Form.Control
            type="number"
            onChange={hndIrdamt}
          />

          <br />

          <label className="gender-title">
            Gender
          </label>

          <div className="gender-box">

            <label>

              <input
                type="radio"
                value="Male"
                checked={gender === "Male"}
                onChange={hndIgen}
              />

              {' '}Male

            </label>


            <label>

              <input
                type="radio"
                value="Female"
                checked={gender === "Female"}
                onChange={hndIgen}
              />

              {' '}Female

            </label>

          </div>

          <br />

          <Form.Control
            type="text"
            placeholder="Aadhar"
            onChange={hndIadharno}
          />

          <br />

          <Form.Control
            type="text"
            placeholder="PAN No"
            onChange={hndIpanno}
          />

          <br />

          <Form.Control
            type="text"
            placeholder="Nomination Address"
            onChange={hndInadr}
          />

          <br />

          <Form.Control
            type="text"
            placeholder="Nomination Name"
            onChange={hndInnm}
          />

          <br />

          <Form.Control
            type="text"
            placeholder="Nomination PAN"
            onChange={hndInpann}
          />

          <br />

          <Form.Control
            type="text"
            placeholder="Occupation"
            onChange={hndIacup}
          />

        </Modal.Body>


        <Modal.Footer>

          <Button
            variant="secondary"
            onClick={handleClose}
          >

            Close

          </Button>


          <Button
            variant="primary"
            onClick={save}
          >

            Save

          </Button>

        </Modal.Footer>

      </Modal>


      {/* =========================
          UPDATE MODAL
      ========================= */}

      <Modal
        show={ushow}
        onHide={uhandleClose}
        centered
      >

        <Modal.Header closeButton>

          <Modal.Title>
            Update User
          </Modal.Title>

        </Modal.Header>


        <Modal.Body>

          <Form.Control
            type="text"
            value={uname}
            onChange={uhndname}
          />

          <br />


          <Form.Control
            type="text"
            value={uaddress}
            onChange={uhndaddress}
          />

          <br />


          <Form.Control
            type="text"
            value={uaccno}
            onChange={uhndIacno}
          />

          <br />


          <label>dob</label>

          <Form.Control
            type="date"
            value={udob}
            onChange={uhndDob}
          />

          <br />


          <label>rddate</label>

          <Form.Control
            type="date"
            value={urddate}
            onChange={uhndIrddt}
          />

          <br />


          <label>rdamt</label>

          <Form.Control
            type="number"
            value={urdamt}
            onChange={uhndIrdamt}
          />

          <br />


          {/* GENDER */}

          <label className="gender-title">
            Gender
          </label>

          <div className="gender-box">

            <label>

              <input
                type="radio"
                value="Male"
                checked={ugender === "Male"}
                onChange={uhndIgen}
              />

              {' '}Male

            </label>


            <label>

              <input
                type="radio"
                value="Female"
                checked={ugender === "Female"}
                onChange={uhndIgen}
              />

              {' '}Female

            </label>

          </div>

          <br />


          <Form.Control
            type="text"
            value={uadharno}
            onChange={uhndIadharno}
          />

          <br />


          <Form.Control
            type="text"
            value={upanno}
            onChange={uhndIpanno}
          />

          <br />


          <Form.Control
            type="text"
            placeholder="Nomination Address"
            value={unaddr}
            onChange={uhndInadr}
          />

          <br />


          <Form.Control
            type="text"
            placeholder="Nomination Name"
            value={unname}
            onChange={uhndInnm}
          />

          <br />


          <Form.Control
            type="text"
            placeholder="Nomination PAN"
            value={unpanno}
            onChange={uhndInpann}
          />

          <br />


          <Form.Control
            type="text"
            value={uoccupation}
            onChange={uhndIacup}
          />

        </Modal.Body>


        <Modal.Footer>

          <Button
            variant="secondary"
            onClick={uhandleClose}
          >

            Close

          </Button>


          <Button
            variant="primary"
            onClick={updateUser}
          >

            Update

          </Button>

        </Modal.Footer>

      </Modal>


      {/* =========================
          TABLE
      ========================= */}

      <div className="table-box">

        <Table hover responsive>

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


          <tbody>

            {arr.map((rd) => (

              <tr key={rd.rid}>

                <td>
                  {rd.rid}
                </td>

                <td>
                  {rd.name}
                </td>

                <td>
                  {rd.accno}
                </td>

                <td>
                  {rd.adharno}
                </td>

                <td>
                  {rd.dob}
                </td>

                <td>
                  {rd.gender}
                </td>

                <td>
                  {rd.address}
                </td>

                <td>
                  {rd.panno}
                </td>

                <td>
                  {rd.nname}
                </td>

                <td>
                  {rd.npanno}
                </td>

                <td>
                  {rd.occupation}
                </td>

                <td>
                  ₹{rd.rdamt}
                </td>

                <td>
                  {rd.rddate}
                </td>


                <td>

                  <div className="action-buttons">

                    {/* VIEW */}

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => view(rd.rid)}
                    >
                      View
                    </Button>


                    {/* UPDATE */}

                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() =>
                        update(
                          rd.rid,
                          rd.name,
                          rd.address,
                          rd.dob,
                          rd.gender,
                          rd.rddate,
                          rd.rdamt,
                          rd.occupation,
                          rd.accno,
                          rd.adharno,
                          rd.panno,
                          rd.nname,
                          rd.naddr,
                          rd.npanno
                        )
                      }
                    >

                      Update

                    </Button>


                    {/* DELETE */}

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => del(rd.rid)}
                    >

                      Delete

                    </Button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </Table>

      </div>

    </div>

  );

}