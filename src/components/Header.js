import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

const Header = ({ onShowModal }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>Employee Management System</Navbar.Brand>
        <Nav className="ml-auto">
          <Button variant="primary" onClick={onShowModal}>Create Employee</Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
