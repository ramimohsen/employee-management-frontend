import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { FaGithub } from 'react-icons/fa';
import EmployeeList from './EmployeeList';
import CreateEmployeeModal from './CreateEmployeeModal';
import Header from './Header';

const MainPage = () => {
  const [showModal, setShowModal] = useState(false);

  // Handle Modal Show
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Handle Employee Created (This is where you refresh the list)
  const handleEmployeeCreated = () => {
    // You can refresh the EmployeeList component here (e.g., by re-fetching data)
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header with button */}
      <Header onShowModal={handleShowModal} />

      <Container className="flex-grow-1 my-4">
        {/* Employee List Component */}
        <EmployeeList />

        {/* Modal for creating employee */}
        <CreateEmployeeModal
          show={showModal}
          handleClose={handleCloseModal}
          onEmployeeCreated={handleEmployeeCreated}
        />
      </Container>

      {/* Footer */}
     <footer className="bg-dark text-light py-3 mt-auto">
        <Container className="d-flex justify-content-between">
          <span>&copy; {new Date().getFullYear()}</span>
          <a href="https://github.com/ramimohsen" className="text-light" target="_blank" rel="noopener noreferrer">
            <FaGithub className="me-2" /> @ramimohsen
          </a>
        </Container>
      </footer>
    </div>
  );
};

export default MainPage;
