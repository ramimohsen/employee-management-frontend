import React, { useState, useEffect } from 'react';
import { searchEmployeesByEmail, assignSupervisor } from '../api/employeeApi'; // Adjust your API calls accordingly
import { Modal, Button, Form, Alert, Row, Col } from 'react-bootstrap';

const AssignSupervisorModal = ({ show, handleClose, employee, onAlert }) => {
  const [employeeData, setEmployeeData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    supervisorName: ''
  });
  const [supervisors, setSupervisors] = useState([]);
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);
  const [searchEmail, setSearchEmail] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');

  useEffect(() => {
    if (employee) {
      setEmployeeData({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        position: employee.position,
        supervisorName: employee.supervisorName
      });
    }
  }, [employee]);

  // Auto-search for supervisors when the user types in the email field
  useEffect(() => {
    const fetchSupervisors = async () => {
      if (searchEmail) {
        try {
          const response = await searchEmployeesByEmail(searchEmail); // API call to search supervisors
          setSupervisors(response.data); // Assuming the response contains the list of supervisors
        } catch (error) {
          setAlertMessage('Failed to fetch supervisors');
          setAlertVariant('danger');
        }
      } else {
        setSupervisors([]); // Clear supervisors if input is empty
      }
    };

    fetchSupervisors();
  }, [searchEmail]); // Effect runs when searchEmail changes

  const handleAssign = async () => {
    if (!selectedSupervisor) {
      setAlertMessage('Please select a supervisor');
      setAlertVariant('danger');
      return;
    }

    try {
      await assignSupervisor(employee.employeeId, selectedSupervisor.employeeId); // Adjust API call
      onAlert(`Successfully assigned ${employeeData.firstName} ${employeeData.lastName} to ${selectedSupervisor.firstName} ${selectedSupervisor.lastName}`, 'success');
      handleClose();
    } catch (error) {
      onAlert(`${error.response?.data?.message || error.message}`, 'danger');
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Assign Supervisor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {alertMessage && <Alert variant={alertVariant}>{alertMessage}</Alert>}
        <Form>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Employee</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={`${employeeData.firstName} ${employeeData.lastName}`}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Current Supervisor</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={employeeData.supervisorName ? employeeData.supervisorName : 'None'}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Search Supervisor by Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter supervisor email"
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          {supervisors.length > 0 && (
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Select Supervisor</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedSupervisor ? selectedSupervisor.email : ''}
                    onChange={(e) => {
                      const selected = supervisors.find(s => s.email === e.target.value);
                      setSelectedSupervisor(selected);
                    }}
                  >
                    <option value="" disabled>Select a supervisor</option>
                    {supervisors.map(supervisor => (
                      <option key={supervisor.employeeId} value={supervisor.email}>
                        {supervisor.firstName} {supervisor.lastName} ({supervisor.email})
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAssign}>
          Assign
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AssignSupervisorModal;
