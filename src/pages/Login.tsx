import React, { FormEvent, useEffect, useState } from 'react';
import style from './login.module.scss'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import AuthenticatedRouteHandler from '../routes/AuthenticatedRouteHandler';
import { rootStorage } from '../utils/localstorage';
import { routesUrls } from '../routes/routesConstants';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name,setName ] = useState('');

  const navigate = useNavigate()
  const {setAuthenticated,setUser} = useAuth()

  useEffect(() => {
    const storedUser = rootStorage().getLocalStorage.user;
    if (storedUser && storedUser.userToken) {
        setAuthenticated && setAuthenticated(true)
        setUser && setUser(storedUser)
      navigate(routesUrls.home,{
        replace: true
      });
    }
  }, [setAuthenticated,setUser, navigate]);



  const handleLogin = async (event:FormEvent) => {
    event.preventDefault();

    if(!name.trim()){
      alert('Please enter a name');
      return;
    }
    // Simple email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email');
      return;
    }

    // Simple password validation
    if (password.length < 6) {
      alert('Password should be at least 6 characters long');
      return;
    }
    addLoginDetails(email,password,name)
    // Add your login logic here
    
  };



  const addLoginDetails = async (email:string, password:string,name:string) => { 
    rootStorage().setLocalStorage({
        user:{
          name:name,
          email:email,
          userToken:"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzFjNGZlNGUzOTlmYzE1NTM2Njc3YTE2MTliZmRhYyIsInN1YiI6IjY1ZWZmYzE3ZmNlYzJlMDE3YTgyNzhiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HITuyfGPiciZ4j-gsKiyi6nDv3RTXAWCYEaK1Kinsv4",
          id:email ,
          username : email
        }
      })
    navigate(routesUrls.home,{
      replace: true
    });
  }

  return (
    <AuthenticatedRouteHandler>
      <div className={style.container}>
        <form onSubmit={handleLogin}>
          <label>
              Name
              <input type="name" value={name} onChange={e => setName(e.target.value)} required />
            </label>
          <label>
            Email
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </label>
          <label>
            Password <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </AuthenticatedRouteHandler>
  );
};

export default Login;