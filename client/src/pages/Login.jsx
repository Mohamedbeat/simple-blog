import React, { useContext, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import Register from './Register'
import axios from 'axios';
import { AUTH_URL } from '../../configs';
import { AuthContext } from '../context/authContext';



export default function Login() {
  const [inputs, setInputs]= useState({
    username:"",
    password:"",
  })

  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const {login} = useContext(AuthContext);


  const handleChange = e=>{
setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
  }
  const register = async e=>{
  e.preventDefault();
  try {
      await login(inputs)
     // const res = await axios.post(AUTH_URL+"/login",inputs)  
     
     //{withCredentials: true, credentials: 'include'}
    navigate("/");
  } catch (error) {
    console.log(error);
    setErr(error.response.data)
  }
  }
  return (
    <div className='auth'>
      <h1>Login</h1>
      <form >
        <input required type="text" name="username"  placeholder='Username' onChange={handleChange}/>
        <input required type="password" name="password"  placeholder='Password' onChange={handleChange}/>
        <button onClick={register}>Login</button>
        {err &&<p> {err} </p>}
        <span>Dont you have an account? <Link to="/register">Register</Link></span>
      </form>
    </div>
  )
}
