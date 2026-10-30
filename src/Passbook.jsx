import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
export default function PassBookEntry() {

    const { rid } = useParams();
    // MODAL

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);


    // PASSBOOK DATA save

    const [data, setData] = useState([]);
    // USER DETAILS

    const [rdate, setRdate] = useState("");
    const [ramt, setRamt] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [n, setN] = useState("");

    // USER-ENTERED / CALCULATED VALUES

    const [lateday, setLday] = useState(0);
    const [fineamt, setfamt] = useState(0);

    // TOTAL PASSBOOK ENTRIES
    
    const totalEntries = data.length;
}