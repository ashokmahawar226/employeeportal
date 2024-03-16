// components/EmployeeDetails.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  guardianPhone: string;
  address: string;
}

interface Props {
}

const EmployeeDetails: React.FC<Props> = ({  }) => {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await fetch(`/api/employees/${id}`);
        const data: Employee = await response.json();
        setEmployee(data);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };
    fetchEmployeeDetails();
  }, [id]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Employee Details</h2>
      <p>First Name: {employee.firstName}</p>
      <p>Last Name: {employee.lastName}</p>
      <p>Email: {employee.email}</p>
      <p>Phone: {employee.phone}</p>
      <p>Guardian Phone: {employee.guardianPhone}</p>
      <p>Address: {employee.address}</p>
      {/* Display other details as needed */}
    </div>
  );
};

export default EmployeeDetails;
