
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import { routesUrls } from './routesConstants';
import Dashboard from '../pages/Dashboard';
import EmployeeList from '../pages/employee/EmployeeList';
import EmployeeDetails from '../pages/employee/EmployeeDetails';
import EditEmployee from '../pages/employee/EditEmployee';

const AppRoutes = ()=>{
    return (
        <Router>
          <Routes>
            <Route path="*" element={<Login/>} />
            <Route path={routesUrls.login} element={<Login/>} />
            <Route path={routesUrls.employeeList} element={<EmployeeList/>} />
            <Route path={routesUrls.employeeDetails} element={<EmployeeDetails/>} />
            <Route path={routesUrls.editEmployeeDetails} element={<EditEmployee/>} />

          </Routes>
        </Router>
    );
}

export default AppRoutes