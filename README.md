# Employee Management System

A simple and efficient Employee Management System built with React, allowing users to manage employee information, assign supervisors, and perform various CRUD operations.

## Features

### 1. Employee Management
- **View Employee List**: Display a comprehensive list of employees with relevant details including first name, last name, email, and position.
- **Search Functionality**: Easily search for employees by name or email to quickly find the information you need.

### 2. Add New Employees
- **Add Employee Form**: A user-friendly form to input new employee details, including first name, last name, email, position, and supervisor information.
- **Validation**: Ensure that all required fields are filled and valid before submitting the form.

### 3. Update Employee Information
- **Edit Employee Details**: Click on an employee to bring up a modal that allows you to edit their information.
- **Real-time Validation**: Validate the input fields in real-time to ensure correct data entry.

### 4. Delete Employees
- **Confirmation Modal**: Before deletion, a confirmation modal prompts the user to confirm the action to prevent accidental deletions.
- **Error Handling**: Alerts to inform users of successful or failed deletion actions.

### 5. Assign Supervisors
- **Assign Supervisor Modal**: A dedicated modal to assign a supervisor to an employee.
- **Dynamic Supervisor Search**: As you type in the email of a supervisor, the application automatically fetches relevant supervisors without needing a search button.
- **Success/Error Alerts**: Alerts to notify users of the outcome of the assignment action.

### 6. Responsive Design
- **Mobile-Friendly**: The application is designed to be fully responsive, providing a smooth experience on both desktop and mobile devices.

### 7. User Feedback
- **Alerts for Actions**: Users receive visual feedback for various actions like adding, updating, deleting, or assigning supervisors through alert messages.

## Technologies Used
- **React**: JavaScript library for building user interfaces.
- **React-Bootstrap**: UI toolkit for Bootstrap components in React.
- **Axios**: Promise-based HTTP client for making API requests.
- **React Router**: For navigation and routing in the application.

## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites
- Node.js
- npm (Node package manager)

### Installation
1. Clone the repo
   ```bash
   git clone https://github.com/ramimohsen/employee-management-frontend.git
   cd employee-management-frontend
   npm install
   npm start
   ```