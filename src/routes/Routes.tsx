
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import { routesUrls } from './routesConstants';
import Dashboard from '../pages/Dashboard';

const AppRoutes = ()=>{
    return (
        <Router>
          <Routes>
            <Route path="*" element={<Login/>} />
            <Route path={routesUrls.login} element={<Login/>} />
            <Route path={routesUrls.home} element={<Dashboard/>} />
          </Routes>
        </Router>
    );
}

export default AppRoutes