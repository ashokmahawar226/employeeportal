//handle auth and return same screen 
import React, { useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { rootStorage } from '../utils/localstorage';
import { routesUrls } from './routesConstants';

interface AuthenticatedRouteHandlerProps {
    children: React.ReactNode;
}
const AuthenticatedRouteHandler: React.FC<AuthenticatedRouteHandlerProps> = ({children}) => {
    const { isAuthenticated,setAuthenticated,setUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const user = rootStorage().getLocalStorage.user
        
        if(isAuthenticated){
            // already login 
        }else if(user){
            setUser &&  setUser(user)
            setAuthenticated && setAuthenticated(true)
        }else{
            navigate(routesUrls.login, { replace: true })
        }
        
    }, [isAuthenticated,navigate,setUser,setAuthenticated])

    return children as React.ReactElement;
}

export default AuthenticatedRouteHandler;