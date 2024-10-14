import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getEmployeeById } from '../api/employeeApi';

const EmployeeDetails = () => {
  const { employeeId } = useParams();  // Access employeeId using useParams
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await getEmployeeById(employeeId);  // Use employeeId from useParams
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee details", error);
      }
    };

    fetchEmployee();
  }, [employeeId]);  // Use employeeId as the dependency

  if (!employee) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Employee Details</h2>
      <p>First Name: {employee.employee.firstName}</p>
      <p>Last Name: {employee.employee.lastName}</p>
      <p>Email: {employee.employee.email}</p>
      <p>Position: {employee.employee.position}</p>
      {employee.supervisor && <p>Supervisor: {employee.supervisor.firstName} {employee.supervisor.lastName}</p>}
      {employee.subordinates.length > 0 && (
        <div>
          <h4>Subordinates:</h4>
          <ul>
            {employee.subordinates.map(sub => (
              <li key={sub.email}>{sub.firstName} {sub.lastName}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetails;
