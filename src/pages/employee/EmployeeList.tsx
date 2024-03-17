// components/EmployeeList.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import data from  './../../data.json'
import style from './employeeList.module.scss'
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { routesUrls } from '../../routes/routesConstants';
import { rootStorage } from '../../utils/localstorage';
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
  logout?: () => void;
}

const EmployeeList: React.FC<Props> = ({  logout }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const navigate = useNavigate()

  useEffect(() => {
    const empData = rootStorage().getLocalStorage.employeeData
    if(empData){
        setEmployees(empData);
        
    }else{
        rootStorage().setLocalStorage({employeeData:data.data})
        setEmployees(data.data);
    }
   
  }, []);


  const onPressEdit = (employeeId:string)=>{
    navigate(routesUrls.editEmployeeDetails,{
        state:{
            id:employeeId
        }
      });
  }

  const onPressFreeze = (index:number)=>{
    let tempData = [...employees]
    tempData[index] = {...tempData[index],freeze : !tempData[index].freeze}
    setEmployees(tempData)
    rootStorage().setLocalStorage({employeeData:tempData})

  }

  const onClickDelete = (idx : number)=>{
    const newArray = employees.filter((_, index) => index !== idx);
    setEmployees(newArray)
    rootStorage().setLocalStorage({employeeData:newArray})
  }

  return (
    <div className={style.employeeListContainer}>
      <h2>Employee List</h2>
      <ul>
        {employees.map((employee,index) => (
          <li key={employee.id}>
            <div className={style.listContainer}>
                <p>{index+1}</p>
               <Link to={`/employee/${employee.id}`}>{employee.firstName} {employee.lastName}</Link>
               <div  style={{cursor:"pointer"}} onClick={()=>{
                if(!employee.freeze){
                    onPressEdit(employee.id)
                }
                }} role="button">
                    <ModeEditIcon/>
                 </div>
                 <div  style={{cursor:"pointer"}} onClick={()=>{
                if(!employee.freeze){
                    onPressFreeze(index)
                }
                }} role="button">
                    <p>{employee.freeze ? "unfreeze" : "freeze" }</p>
                 </div>
                 <Link to={`/employee/${employee.id}`}>link</Link>
                <div style={{cursor:"pointer"}} onClick={()=>{
                    onClickDelete(index)
                }} role="button">
                    <DeleteIcon htmlColor='red'/>
                </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
