import axios from 'axios'
import { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
export default function Appcopy()
{
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
    const [arr,setrd]=useState([])
    const handlename = (e) => {
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
 const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //for modal update
  const [ushow, usetShow] = useState(false);
  const uhandleClose = () => setShow(false);
  const uhandleShow = () => setShow(true);
  //for update
  const[rid,usetrid]=useState();
  const [uname, usetName] = useState("");
  const [uaddress, uSetaddress] = useState("");
  const [udob, uSetDob] = useState("");
  const [ugender, uSetGen] = useState("");
  const [urddate, uSetRddt] = useState("");
  const [urdamt, uSetRdamt] = useState(0);
  const [uoccupation,uSetAoup] = useState("");
  const [uaccno, uSetAccno] = useState("");
  const [uadharno,uSetAdharno] = useState("");
  const [upanno, uSetPanno] = useState("");
  const [unname, uSetNname] = useState("");
  const [unaddr, uSetNadr] = useState("");
  const [unpanno, uSetNpan] = useState("");
      const uhandlename = (e) => {
    setName(e.target.value);
  };
  const uhndaddress = (e) => {
    Setaddress(e.target.value);
  };
  const uhndDob = (e) => {
    SetDob(e.target.value);
  };
  const uhndIgen = (e) => {
    SetGen(e.target.value);
  };
  const uhndIrddt = (e) => {
    SetRddt(e.target.value);
  };
  const uhndIrdamt = (e) => {
    SetRdamt(e.target.value);
  };
  const uhndIacup = (e) => {
    SetAoup(e.target.value);
  };
  const uhndIacno = (e) => {
    SetAccno(e.target.value);
  };
  const uhndIadharno = (e) => {
    SetAdharno(e.target.value);
  };
  const uhndIpanno = (e) => {
    SetPanno(e.target.value);
  };
  const uhndInnm = (e) => {
    SetNname(e.target.value);
  };
  const uhndInadr = (e) => {
    SetNadr(e.target.value);
  };
  const uhndInpann = (e) => {
    SetNpan(e.target.value);
  };
  const rduser=()=>{
    axios.get("http://localhost:8080/rduser")
      .then(res => {
        console.log(res.data);
        setrd(res.data);
      })
  };
  const del=(rid)=>{
    axios.delete("http://localhost:8080/del/" + rid)
    .then(res=>{
        alert("Deleted successfully");
        rduser();
    }) .catch(err => {
    console.log("API ERROR:", err);
    console.log("STATUS:", err.response?.status);
    console.log("DATA:", err.response?.data);
  });
  }
  const save=()=>
  {
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
      rddate: rddate

    };
    axios.post("http://localhost:8080/save",rd)
    .then(res=>
    {
         alert("inserted successfully");
        rduser();
    }
    )
  }
  const updat=(rid,
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
    npanno)=>
  {
     usetrid(rid);
uSetaddress(address)
usetName(name);
uSetDob(dob);
uSetGen(gender);
uSetRddt(rddate);
uSetRdamt(rdamt);
uSetAoup(occupation);
uSetAccno(accno);
uSetAdharno(adharno);
uSetPanno(panno);
uSetNname(nname);
uSetNadr(naddr);
uSetNpan(npanno);
setShow(true)
  }
  useEffect(()=>{
    rduser();
  },[])
   return (
  <>
    <div className="main-container">

      {/* Header */}
      <div className="page-header">

        <div>
          <h1>RD User System</h1>
          <p>Manage RD customer information</p>
        </div>

        {/* Modal form to add user */}
        <Button variant="primary" onClick={handleShow}>
          + Add user
        </Button>

      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control type="text" placeholder="name" onChange={handlename}/>
      <br />



          {/* Address */}

          <Form.Control
            type="text"
            placeholder="Address"
            onChange={hndaddress}
          />

          <br />


          {/* Account No */}

          <Form.Control
            type="text"
            placeholder="Account No"
            onChange={hndIacno}
          />

          <br />


          {/* Date of Birth */}

          <label>dob</label>

          <Form.Control
            type="date"
            onChange={hndDob}
          />

          <br />


          {/* RD Date */}

          <label>rddate</label>

          <Form.Control
            type="date"
            onChange={hndIrddt}
          />

          <br />


          {/* RD Amount */}

          <label>rdamt</label>

          <Form.Control
            type="number"
            onChange={hndIrdamt}
          />

          <br />


          {/* Gender */}

          <label className="gender-title">
            Gender
          </label>


          <div className="gender-box">

            <label>

              <input
                type="radio"
                value="Male"

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


          {/* Aadhar */}

          <Form.Control
            type="text"
            placeholder="Aadhar"
            onChange={hndIadharno}
          />

          <br />


          {/* PAN */}

          <Form.Control
            type="text"
            placeholder="PAN No"
            onChange={hndIpanno}
          />

          <br />


          {/* Nomination Address */}

          <Form.Control
            type="text"
            placeholder="Nomination Address"
            onChange={hndInadr}
          />

          <br />


          {/* Nomination Name */}

          <Form.Control
            type="text"
            placeholder="Nomination Name"
            onChange={hndInnm}
          />

          <br />


          {/* Nomination PAN */}

          <Form.Control
            type="text"
            placeholder="Nomination PAN"
            onChange={hndInpann}
          />

          <br />


          {/* Occupation */}

          <Form.Control
            type="text"
            placeholder="Occupation"
            onChange={hndIacup}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="primary" onClick={save}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
{/* for update */}
      
      </div>

      <Modal show={ushow} onHide={uhandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>updation</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control type="text" placeholder="name" value={uname}
          onChange={uhandlename}/>
      <br />



          {/* Address */}

          <Form.Control
            type="text"
            value={uaddress}
            onChange={uhndaddress}
          />

          <br />


          {/* Account No */}

          <Form.Control
            type="text"
            value={uaccno}
            placeholder="Account No"
            onChange={uhndIacno}
          />

          <br />


          {/* Date of Birth */}

          <label>dob</label>

          <Form.Control
            type="date"
            value={udob}
            onChange={uhndDob}
          />

          <br />


          {/* RD Date */}

          <label>rddate</label>

          <Form.Control
          value={urddate}
            type="date"
            onChange={uhndIrddt}
          />

          <br />


          {/* RD Amount */}

          <label>rdamt</label>

          <Form.Control
            type="number"
            value={urdamt}
            onChange={uhndIrdamt}
          />

          <br />


          {/* Gender */}

          <label className="gender-title">
            Gender
          </label>


          <div className="gender-box">

            <label>

              <input
                type="radio"
                value="Male"

                onChange={uhndIgen}
              />

              {' '}Male

            </label>


            <label>

              <input
                type="radio"
                value="Female"
                checked={gender === "Female"}
                onChange={uhndIgen}
              />

              {' '}Female

            </label>

          </div>


          <br />


          {/* Aadhar */}

          <Form.Control
            type="text"
            value={uadharno}
            placeholder="Aadhar"
            onChange={uhndIadharno}
          />

          <br />


          {/* PAN */}

          <Form.Control
            type="text"
            value={upanno}
            placeholder="PAN No"
            onChange={uhndIpanno}
          />

          <br />


          {/* Nomination Address */}

          <Form.Control
            type="text"
            value={unaddr}
            placeholder="Nomination Address"
            onChange={uhndInadr}
          />

          <br />


          {/* Nomination Name */}

          <Form.Control
            type="text"
            value={uname}
            placeholder="Nomination Name"
            onChange={uhndInnm}
          />

          <br />


          {/* Nomination PAN */}

          <Form.Control
            type="text"
            value={unpanno}
            placeholder="Nomination PAN"
            onChange={uhndInpann}
          />

          <br />


          {/* Occupation */}

          <Form.Control
            type="text"
            value={uoccupation}
            placeholder="Occupation"
            onChange={uhndIacup}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={uhandleClose}>
            Close
          </Button>

          <Button variant="primary">
            update 
          </Button>
        </Modal.Footer>
      </Modal>     
       {/* Table */}
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

                <td className="id-column">
                  {rd.rid}
                </td>

                <td className="name-column">
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
                  <span className="gender-badge">
                    {rd.gender}
                  </span>
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

                <td className="amount">
                  ₹{rd.rdamt}
                </td>

                <td>
                  {rd.rddate}
                </td>

                <td>
                  <Button variant="warning">
                    View
                  </Button>

                  <Button variant="primary" 
                   onClick={() =>
                        updat(
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
                          rd.npanno
                        )
                      }
                      >
                    Update
                  </Button>

                  <Button
                    variant="danger"
                    className="ms-2"
                    onClick={() => del(rd.rid)}
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
)};