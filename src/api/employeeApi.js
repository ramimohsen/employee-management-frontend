import axios from 'axios';

const BASE_URL = 'http://localhost:8080/v1/api/employees'; 

// Fetch all employees (paginated)
export const getAllEmployees = (page, size) => {
  return axios.get(`${BASE_URL}?page=${page}&size=${size}`);
};

// Get employee details by ID
export const getEmployeeById = (employeeId) => {
  return axios.get(`${BASE_URL}/${employeeId}`);
};

// Create a new employee
export const createEmployee = (employeeData) => {
  return axios.post(BASE_URL, employeeData);
};

// Update an employee
export const updateEmployee = (employeeId, employeeData) => {
  return axios.put(`${BASE_URL}/${employeeId}`, employeeData);
};

// Delete an employee
export const deleteEmployee = (employeeId) => {
  return axios.delete(`${BASE_URL}/${employeeId}`);
};

// Assign supervisor to employee
export const assignSupervisor = (employeeId, supervisorId) => {
  return axios.put(`${BASE_URL}/${employeeId}/assign-supervisor`, { supervisorId });
};

export const searchEmployeesByEmail = (email) => {
  return axios.get(`${BASE_URL}/search`, {
    params: {
      email: email
    }
  });
};
