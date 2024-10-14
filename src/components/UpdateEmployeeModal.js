// UpdateEmployeeModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateEmployee } from '../api/employeeApi';

const UpdateEmployeeModal = ({ show, handleClose, employeeToUpdate, onAlert }) => {
  const [employeeData, setEmployeeData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
  });
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (employeeToUpdate) {
      setEmployeeData({
        firstName: employeeToUpdate.firstName,
        lastName: employeeToUpdate.lastName,
        email: employeeToUpdate.email,
        position: employeeToUpdate.position,
      });
    }
  }, [employeeToUpdate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        await updateEmployee(employeeToUpdate.employeeId, employeeData);
        onAlert(`Successfully updated ${employeeData.firstName} ${employeeData.lastName}`, 'success');
        handleClose(); // Close the modal after update
      } catch (error) {
        onAlert(`${error.response?.data?.message || error.message}`, 'danger');
      }
    }
    setValidated(true);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="firstName" className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter first name"
              name="firstName"
              value={employeeData.firstName}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">Please provide a first name.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="lastName" className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter last name"
              name="lastName"
              value={employeeData.lastName}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">Please provide a last name.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              name="email"
              value={employeeData.email}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="position" className="mb-3">
            <Form.Label>Position</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter position"
              name="position"
              value={employeeData.position}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">Please provide a position.</Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Update Employee
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateEmployeeModal;
