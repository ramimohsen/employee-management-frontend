import React, { useState } from 'react';
import { Modal, Button, Form, Alert, Row, Col } from 'react-bootstrap';
import { createEmployee } from '../api/employeeApi';

const CreateEmployeeModal = ({ show, handleClose, onEmployeeCreated }) => {
  const [employeeData, setEmployeeData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
  });
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertVariant, setAlertVariant] = useState('');
  const [validated, setValidated] = useState(false);

  // Handle Input Changes
  const handleChange = (e) => {
    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit Form
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const response = await createEmployee(employeeData);
        setAlertMessage(`Employee ${response.data.firstName} ${response.data.lastName} created successfully!`);
        setAlertVariant('success');
        onEmployeeCreated(); // Notify parent to refresh employee list
        handleClose(); // Close modal on success
      } catch (error) {
        setAlertMessage(`${error.response?.data?.message || error.message}`);
        setAlertVariant('danger');
      }
    }
    setValidated(true);
  };

  const handleModalClose = () => {
    setEmployeeData({
      firstName: '',
      lastName: '',
      email: '',
      position: '',
    });
    setValidated(false);
    setAlertMessage('');
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleModalClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {alertMessage && (
          <Alert variant={alertVariant} onClose={() => setAlertMessage(null)} dismissible>
            {alertMessage}
          </Alert>
        )}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="firstName">
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
            </Col>
            <Col md={6}>
              <Form.Group controlId="lastName">
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
            </Col>
          </Row>

          <Form.Group controlId="email">
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

          <Form.Group controlId="position">
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

          <Button variant="primary" type="submit" className="mt-3">
            Create Employee
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateEmployeeModal;
