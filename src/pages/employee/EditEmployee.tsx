// components/EditEmployee.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  guardianPhone: string;
  address: string;
  freeze?:boolean
  profilePicture?:string
}

interface Props {

}
interface Location {
    state:{
        id: string,
    }
}


const EditEmployee: React.FC<Props> = ({  }) => {
    const navigation = useNavigate()
    const location : any = useLocation()
    const { state } = location as Location
    const { id } = state

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

  const handleSubmit = async (updatedEmployeeData: Partial<Employee>) => {
    try {
      await fetch(`/api/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEmployeeData),
      });
      // Redirect or update state accordingly
    } catch (error) {
      console.error('Error updating employee details:', error);
    }
  };

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Employee</h2>
      {/* Render an edit form with inputs for each field */}
      {/* Handle form submission and update the employee data */}
    </div>
  );
};

export default EditEmployee;
