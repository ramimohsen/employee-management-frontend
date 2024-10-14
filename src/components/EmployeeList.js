import React, { useState, useEffect } from 'react';
import { getAllEmployees } from '../api/employeeApi';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import UpdateEmployeeModal from './UpdateEmployeeModal';
import Alert from 'react-bootstrap/Alert';


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // Add a hover effect
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.common.white,
}));

const ListEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');


  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getAllEmployees(page, rowsPerPage); // Fetch paginated data
        setEmployees(response.data.content); // Set employee list from API
        setTotalElements(response.data.totalElements); // Set total employees count for pagination
      } catch (error) {
        console.error('Error fetching employees', error);
      }
    };

    fetchEmployees();
  }, [page, rowsPerPage]); // Update when page or rowsPerPage changes

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };
  const handleShowUpdateModal = (employee) => {
    setSelectedEmployee(employee);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedEmployee(null);
  };
  const handleAlert = (message, variant) => {
    setAlertMessage(message);
    setAlertVariant(variant);

    // Clear the alert after 3 seconds
    setTimeout(() => {
      setAlertMessage('');
    }, 3000);
  };

  return (
    <Paper>
    {alertMessage && <Alert variant={alertVariant}>{alertMessage}</Alert>}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>First Name</StyledTableCell>
              <StyledTableCell>Last Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Position</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <StyledTableRow key={employee.employeeId}>
                <TableCell>{employee.firstName}</TableCell>
                <TableCell>{employee.lastName}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleShowUpdateModal(employee)}>
                    Update Employee
                  </Button>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={totalElements}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

     <UpdateEmployeeModal
        show={showUpdateModal}
        handleClose={handleCloseUpdateModal}
        employeeToUpdate={selectedEmployee}
        onAlert={handleAlert} // Pass alert function to the modal
      />
    </Paper>
  );
};

export default ListEmployee;
