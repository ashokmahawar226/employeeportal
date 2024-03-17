// components/EditEmployee.tsx
import React, { useState, useEffect, FormEvent } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { rootStorage } from '../../utils/localstorage';
import style from './editEmployee.module.scss'
import { routesUrls } from '../../routes/routesConstants';
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
       const employeeData = rootStorage().getLocalStorage.employeeData 
       if(employeeData){
       const data =  employeeData.filter((ele:any)=>ele.id === id)
       data?.[0] && setEmployee(data[0]);
       }
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
  const handleLogin = async (event:FormEvent) => {
    event.preventDefault();

    if(!employee?.firstName.trim()){
      alert('Please enter a name');
      return;
    }
    // Simple email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(employee?.email || '')) {
      alert('Please enter a valid email');
      return;
    }
    const employeeData = rootStorage().getLocalStorage.employeeData 
    if(employeeData){
        const index = employeeData.findIndex((ele:any)=>{
            return ele.id === id
        })
        if(index>-1){
            employeeData[index]={...employee}
            rootStorage().setLocalStorage({employeeData:employeeData})
            navigation(routesUrls.employeeList,{
                replace : true
            })
        }
    }
  };



  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.container}>
      <h2>Edit Employee</h2>
      <form onSubmit={handleLogin} className={style.form}>
        <div className={style.subDiv}>
            <label>
                Firs tName : 
                <input type="firstName" value={employee.firstName} onChange={e => {
                    setEmployee({...employee,firstName:e.target.value})
                }} required />
            </label>
        </div>
        <div className={style.subDiv}>
            <label>
                Last Name : 
                <input type="lastname" value={employee.lastName} onChange={e => {
                    setEmployee({...employee,lastName:e.target.value})
                }} required />
            </label>
        </div>
        <div className={style.subDiv}>
            <label>
                Email : 
                <input type="email" value={employee.email} onChange={e => {
                    setEmployee({...employee,email:e.target.value})
                }} required />
            </label>
        </div>
        <div className={style.subDiv}>
            <label>
            Phone Number: 
                <input type="firstName" value={employee.phone} onChange={e => {
                    setEmployee({...employee,phone:e.target.value})
                }} required />
            </label>
        </div>
        <div className={style.subDiv}>
            <label>
            Guardian Phone Number : 
                <input type="firstName" value={employee.guardianPhone} onChange={e => {
                    setEmployee({...employee,guardianPhone:e.target.value})
                }} required />
            </label>
        </div>
        <div className={style.subDiv}>
            <label>
                Address : 
                <input type="firstName" value={employee.address} onChange={e => {
                    setEmployee({...employee,address:e.target.value})
                }} required />
            </label>
        </div>
        <div className={style.subDiv}>
            <label>
                Upload Picture : 
                <input type="firstName" value={employee.firstName} onChange={e => {
                    setEmployee({...employee,firstName:e.target.value})
                }} required />
            </label>
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default EditEmployee;
