import React, { useState, useEffect, Fragment } from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CRUD = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const [editID, setEditID] = useState('');
    const [editFirstname, setEditFirstname] = useState('')
    const [editLastname, setEditLastname] = useState('')
    const [editEmail, setEditEmail] = useState('')
    const [editPhone, setEditPhone] = useState('')



    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        axios.get('http://localhost:7248/api/Persons')
            .then((result) => {
                setData(result.data)
            })
            .catch((error) => {
                console.log(error)
            })

    }

    const handleEdit = (id) => {
        handleShow();
        axios.get('http://localhost:7248/api/Persons/${id}')
            .then((result) => {
                setEditFirstName(result.data.firstname);
                setEditLastName(result.data.lastname);
                setEditEmail(result.data.email);
                setEditPhone(result.data.phone);
                setEditID(id);

            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this data?") == true) {
            axios.delete('http://localhost:7248/api/Persons/${id}')
                .then((result) => {
                    if (result.status == 200) {
                        toast.success('Employee has been deleted');
                    }
                }).catch((error) => {
                    toast.error(error);
                })
        }
    }

    const handleUpdate = () => {
        const url = 'http://localhost:7248/api/Persons/${editID}';
        const data = {
            "id": editID,
            "firstname": editFirstname,
            "lastname": editLastname,
            "email": editEmail,
            "phone": editPhone
        }
    }

    axios.put(url, data)
        .then((result) => {
            handleClose();
            getData();
            clear();
            toast.success('Employee has been updated');
        }).catch((error) => {
            toast.error(error);
        })
}

const handleSave = () => {
    const url = 'http://localhost:7248/api/Persons';
    const data = {
        "firstname": firstname,
        "lastname": lastname,
        "email": email,
        "phone": phone
    }
    axios.post(url, data)
        .then((result) => {
            getData();
            clear();
            toast.success('Employee has been added');
        }).catch((error) => {
            toast.error(error);
        })



    const clear = () => {
        setFirstname('');
        setLastname('');
        setEmail('');
        setPhone('');
        setEditFirstname('');
        setEditLastname('');
        setEditEmail('');
        setEditPhone('');
        setEditId('');
    }


    return (
        <Fragment>
            <ToastifyContainer />
            <Container>
                <Row>
                    <Col>
                        <input type="text" className="form-control" placeholder="Enter first name"
                            value={firstname} onChange={(e) => setFirstname(e.target.value)}
                        />
                    </Col>
                    <Col> <input type="text" className="form-control" placeholder="Enter last name"
                        value={lastname} onChange={(e) => setLastname(e.target.value)} />
                    </Col>
                    <Col> <input type="text" className="form-control" placeholder="Enter email"
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Col>
                    <Col> <input type="text" className="form-control" placeholder="Enter phone"
                        value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </Col>
                    <Col>
                        <button className="btn btn-primary" onClick={() => handleSave()}>Submit</button>
                    </Col>

                </Row>
            </Container>
            <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.length > 0 ?
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.firstname}</td>
                                        <td>{item.lastname}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td colSpan={2}>
                                            <button className="btn btn-primary" onClick={() => handleEdit(item.id)}>Edit</button>
                                            <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                                        </td>
                                    </tr>

                                )
                            })
                            :
                            'Loading...'
                    }


                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <input type="text" className="form-control" placeholder="Enter first name"
                                value={editFirstname} onChange={(e) => setEditFirstname(e.target.value)}
                            />
                        </Col>
                        <Col> <input type="text" className="form-control" placeholder="Enter last name"
                            value={editLastname} onChange={(e) => setEditLastname(e.target.value)} />
                        </Col>
                        <Col> <input type="text" className="form-control" placeholder="Enter email"
                            value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                        </Col>
                        <Col> <input type="text" className="form-control" placeholder="Enter phone"
                            value={setEditPhone} onChange={(e) => setEditPhone(e.target.value)} />
                        </Col>

                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )

}

export default CRUD;