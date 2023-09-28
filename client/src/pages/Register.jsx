import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Login from './Login'
import axios from 'axios'
import { AUTH_URL } from '../../configs'

export default function Register() {
  const [inputs, setInputs]= useState({
    username:"",
    email:"",
    password:"",
  })

  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = e=>{
setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
  }
  const register = async e=>{
  e.preventDefault();
  try {
    const res = await axios.post(AUTH_URL+"/register",inputs)
    navigate("/login");
  } catch (error) {
    setErr(error.response.data)
  }
  }
  return (
    <div className='auth'>
      <h1>Register</h1>
      <form >
        <input required type="text" name="username"  placeholder='Username' onChange={handleChange}/>
        <input required type="email" name="email"  placeholder='Email' onChange={handleChange}/>
        <input required type="password" name="password"  placeholder='Password' onChange={handleChange}/>
        <button onClick={register}>Register</button>
        { err && <p>{err}</p>}
        <span>Don you have an account? <Link to="/login">Login</Link></span>
      </form>
    </div>
  )
}









// import React from 'react'

// export default function Register() {
//   return (
//     <div>Register</div>
//   )
// }
