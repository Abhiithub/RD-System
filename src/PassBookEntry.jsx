import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import React, { Component } from 'react';
import Swal from 'sweetalert2';
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

export default function PassBookEntry() {

    const { id } = useParams();

    // ================= STATE =================

    const [rddate, setRddate] = useState("");
    const [rdamt, setRdamt] = useState(0);
    const [data, setData] = useState([]);
    const [lday, setLday] = useState(0);
    const [fine, setFine] = useState(0);

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);


    // ================= CALCULATIONS =================

    const totalPaid = data.reduce(
        (total, p) => total + Number(p.rdamt || 0),
        0
    );

    const maturityAmount = totalPaid + (totalPaid * 14) / 100;

    const totalAmountToPay = Number(rdamt || 0) * 12;


    // ================= FORMAT CURRENCY =================

    const formatCurrency = (amount) => {
        return Number(amount || 0).toLocaleString("en-IN");
    };


    // ================= MODAL =================

    const handleShow = () => {
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
        setLday(0);
        setFine(0);
    };


    // ================= LATE DAYS =================

    const handleLateDays = (e) => {

        const days = Math.max(0, Number(e.target.value));

        setLday(days);
        setFine(days * 50);
    };
    // ===================loan eligibility=================
const loan = () => {
    if (data.length > 6) {

        const half = totalPaid / 2;

        Swal.fire({
            title: "You are eligible",
            html: `<b>Payable RD Amount (50% Only)</b>
                   <br>
                   <h2 style="color:green">₹${half}</h2>`,
            icon: "warning",
            confirmButtonText: "Proceed",
            confirmButtonColor: "#198754"
        });

    } else {
        alert("not eligible");
    }
};
// ===================close rd=================
const rdcls=()=>
{
    if(data.length<12)
    {
        alert("Amount will get only 50% u ll get "+totalPaid/2)
    }
}

    // ================= GET PASSBOOK =================

    const passbook = () => {

        setFetching(true);

        axios
            .get(`http://localhost:8080/getPassbookByRid/${id}`)

            .then((res) => {

                console.log("Passbook Data =", res.data);

                setData(res.data);

                if (res.data.length > 0) {

                    setRdamt(res.data[0].rdamt);
                    setRddate(res.data[0].rddate);

                }

            })

            .catch((err) => {

                console.error("Error fetching passbook:", err);

                setData([]);

            })

            .finally(() => {

                setFetching(false);

            });
    };


    // ================= SAVE PASSBOOK ENTRY =================

    const savePassbook = () => {

        const passbookData = {

            famt: fine,

            flg: 0,

            lday: lday,

            rdamt: rdamt,

            rddate: rddate,

            rduser: {
                rid: id
            }

        };

        console.log("Sending Data =", passbookData);

        setLoading(true);

        axios
            .post("http://localhost:8080/passbooksave", passbookData)

            .then((res) => {

                console.log("Saved =", res.data);

                alert("Passbook entry inserted successfully.");

                handleClose();

                passbook();

            })

            .catch((err) => {

                console.error("Save error =", err);

                alert("Failed to insert passbook entry.");

            })

            .finally(() => {

                setLoading(false);

            });
    };


    // ================= LOAD DATA =================

    useEffect(() => {

        passbook();

    }, [id]);


    // ================= UI =================

    return (

        <Container className="py-5">

            {/* ================= PAGE HEADER ================= */}

            <Card className="border-0 shadow-sm mb-4">

                <Card.Body className="p-4">

                    <Row className="align-items-center">

                        <Col>

                            <div className="d-flex align-items-center gap-3">

                                <div
                                    className="bg-primary text-white rounded-3 d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        fontSize: "22px"
                                    }}
                                >
                                    ₹
                                </div>

                                <div>

                                    <h2 className="fw-bold mb-1 text-dark">
    RD Passbook
</h2>

                                    <p className="text-muted mb-0">
                                        Customer transaction details
                                    </p>

                                </div>

                            </div>

                        </Col>

                        <Col xs="auto">

                            <Badge
                                bg="primary"
                                className="px-3 py-2 fs-6"
                            >
                                RID: {id}
                            </Badge>

                        </Col>

                    </Row>

                </Card.Body>

            </Card>


            {/* ================= SUMMARY CARDS ================= */}

            <Row className="g-4 mb-5">

                {/* CUSTOMER */}

                <Col xl={3} md={6}>

                    <Card className="border-0 shadow-sm h-100">

                        <Card.Body className="p-4">

                            <p className="text-muted small fw-semibold mb-2">
                                CUSTOMER
                            </p>

                            <h5 className="fw-bold mb-1">

                                {data.length > 0
                                    ? data[0].name
                                    : "No Customer"}

                            </h5>

                            <small className="text-muted">
                                Customer ID: {id}
                            </small>

                        </Card.Body>

                    </Card>

                </Col>


                {/* TOTAL PAID */}

                <Col xl={3} md={6}>

                    <Card className="border-0 shadow-sm h-100">

                        <Card.Body className="p-4">

                            <p className="text-muted small fw-semibold mb-2">
                                TOTAL PAID
                            </p>

                            <h4 className="fw-bold text-success mb-1">

                                ₹{formatCurrency(totalPaid)}

                            </h4>

                            <small className="text-muted">
                                Total amount deposited
                            </small>

                        </Card.Body>

                    </Card>

                </Col>


                {/* MATURITY */}

                <Col xl={3} md={6}>

                    <Card className="border-0 shadow-sm h-100">

                        <Card.Body className="p-4">

                            <p className="text-muted small fw-semibold mb-2">
                                MATURITY AMOUNT
                            </p>

                            <h4 className="fw-bold text-warning mb-1">

                                ₹{formatCurrency(maturityAmount)}

                            </h4>

                            <small className="text-muted">
                                Estimated maturity amount
                            </small>

                        </Card.Body>

                    </Card>

                </Col>


                {/* TOTAL TO PAY */}

                <Col xl={3} md={6}>

                    <Card className="border-0 shadow-sm h-100">

                        <Card.Body className="p-4">

                            <p className="text-muted small fw-semibold mb-2">
                                TOTAL AMOUNT TO PAY
                            </p>

                            <h4 className="fw-bold text-primary mb-1">

                                ₹{formatCurrency(totalAmountToPay)}

                            </h4>

                            <small className="text-muted">
                                Monthly RD × 12 months
                            </small>

                        </Card.Body>

                    </Card>

                </Col>


                {/* TOTAL ENTRIES */}
<div className="d-flex align-items-center gap-2">
    <div
        className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
        style={{
            width: "45px",
            height: "45px",
            fontSize: "18px"
        }}
    >
        {data.length}
    </div>

    <small className="text-muted fw-semibold">
        TOTAL ENTRIES
    </small>
</div>

            </Row>


            {/* ================= SECTION HEADER ================= */}

            <div className="d-flex justify-content-between align-items-center mb-3">

                <div>

                    <h4 className="fw-bold mb-1">
                        Passbook Entries
                    </h4>

                    <p className="text-muted mb-0">
                        Complete transaction history
                    </p>

                </div>


                <Button
                    variant="primary"
                    className="px-4 shadow-sm"
                    onClick={handleShow}
                >
                    + Add Entry
                </Button>

            </div>


            {/* ================= ADD ENTRY MODAL ================= */}

            <Modal
                show={show}
                onHide={handleClose}
                centered
            >

                <Modal.Header closeButton>

                    <Modal.Title className="fw-bold">
                        Add Passbook Entry
                    </Modal.Title>

                </Modal.Header>


                <Modal.Body className="p-4">

                    {/* RID */}

                    <Form.Group className="mb-3">

                        <Form.Label className="fw-semibold">
                            RD Customer ID
                        </Form.Label>

                        <Form.Control
                            type="text"
                            value={id}
                            readOnly
                        />

                    </Form.Group>


                    {/* RD DATE */}

                    <Form.Group className="mb-3">

                        <Form.Label className="fw-semibold">
                            RD Date
                        </Form.Label>

                        <Form.Control
                            type="date"
                            value={rddate}
                            readOnly
                        />

                    </Form.Group>


                    {/* RD AMOUNT */}

                    <Form.Group className="mb-3">

                        <Form.Label className="fw-semibold">
                            RD Amount
                        </Form.Label>

                        <Form.Control
                            type="number"
                            value={rdamt}
                            readOnly
                        />

                    </Form.Group>


                    {/* LATE DAYS */}

                    <Form.Group className="mb-3">

                        <Form.Label className="fw-semibold">
                            Late Days
                        </Form.Label>

                        <Form.Control
                            type="number"
                            min="0"
                            value={lday}
                            onChange={handleLateDays}
                            placeholder="Enter number of late days"
                        />

                        <Form.Text className="text-muted">
                            Fine is calculated at ₹50 per late day.
                        </Form.Text>

                    </Form.Group>


                    {/* FINE */}

                    <Form.Group>

                        <Form.Label className="fw-semibold">
                            Fine Amount
                        </Form.Label>

                        <Form.Control
                            type="number"
                            value={fine}
                            readOnly
                        />

                    </Form.Group>

                </Modal.Body>


                <Modal.Footer>

                    <Button
                        variant="light"
                        onClick={handleClose}
                        disabled={loading}
                    >
                        Cancel
                    </Button>


                    <Button
                        variant="primary"
                        onClick={savePassbook}
                        disabled={loading}
                    >

                        {loading ? (

                            <>
                                <Spinner
                                    size="sm"
                                    animation="border"
                                    className="me-2"
                                />

                                Saving...

                            </>

                        ) : (

                            "Save Entry"

                        )}

                    </Button>

                </Modal.Footer>

            </Modal>


            {/* ================= PASSBOOK TABLE ================= */}

            <Card className="border-0 shadow-sm">

                <Card.Body className="p-0">

                    {fetching ? (

                        /* LOADING */

                        <div className="text-center py-5">

                            <Spinner
                                animation="border"
                                variant="primary"
                            />

                            <p className="text-muted mt-3 mb-0">
                                Loading passbook entries...
                            </p>

                        </div>

                    ) : data.length === 0 ? (

                        /* EMPTY STATE */

                        <div className="text-center py-5">

                            <div
                                className="bg-light rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                                style={{
                                    width: "70px",
                                    height: "70px",
                                    fontSize: "28px"
                                }}
                            >
                                ₹
                            </div>

                            <h5 className="fw-semibold text-dark">
                                No passbook entries
                            </h5>

                            <p className="text-muted mb-3">
                                No transactions have been recorded
                                for this customer yet.
                            </p>

                            <Button
                                variant="primary"
                                onClick={handleShow}
                            >
                                + Add First Entry
                            </Button>

                        </div>

                    ) : (

                        /* TABLE */

                        <Table
                            responsive
                            hover
                            className="mb-0 align-middle"
                        >

                            <thead className="table-light">

                                <tr>

                                    <th className="px-4 py-3">
                                        Passbook ID
                                    </th>

                                    <th>
                                        Customer
                                    </th>

                                    <th>
                                        RD Amount
                                    </th>

                                    <th>
                                        Fine
                                    </th>

                                    <th>
                                        Late Days
                                    </th>

                                    <th>
                                        RD Date
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {data.map((p) => (

                                    <tr key={p.pid}>

                                        {/* PASSBOOK ID */}

                                        <td className="px-4 fw-semibold">
                                            #{p.pid}
                                        </td>


                                        {/* CUSTOMER */}

                                        <td className="fw-semibold">
                                            {p.name}
                                        </td>


                                        {/* RD AMOUNT */}

                                        <td>

                                            <span className="fw-semibold text-success">

                                                ₹{formatCurrency(p.rdamt)}

                                            </span>

                                        </td>


                                        {/* FINE */}

                                        <td>

                                            <span className="fw-semibold text-danger">

                                                ₹{formatCurrency(p.famt)}

                                            </span>

                                        </td>


                                        {/* LATE DAYS */}

                                        <td>

                                            {Number(p.lday) > 0 ? (

                                                <Badge
                                                    bg="warning"
                                                    text="dark"
                                                    className="px-2 py-1"
                                                >

                                                    {p.lday} day
                                                    {Number(p.lday) > 1
                                                        ? "s"
                                                        : ""}

                                                </Badge>

                                            ) : (

                                                <Badge
                                                    bg="success"
                                                    className="px-2 py-1"
                                                >
                                                    On Time
                                                </Badge>

                                            )}

                                        </td>


                                        {/* DATE */}

                                        <td>
                                            {p.rddate}
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </Table>

                    )}

                </Card.Body>

            </Card>
<div className="d-flex gap-2">
<Button
        variant="danger"
        className="px-4 shadow-sm"
        onClick={loan}
    >
        loan eligibility
    </Button>
    <Button
        variant="danger"
        className="px-4 shadow-sm"
        onClick={rdcls}
    >
        Close RD
    </Button>

</div>
        </Container>

    );
}