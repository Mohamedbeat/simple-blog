import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

export default function NavBar() {

  const {currentUser, logout} = useContext(AuthContext)

  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <a href="/">MyBlogie</a>
        </div>
        <div className="links">
          <div className="navigation">
            <Link className='link' to="/?cat=islamic"><h6 className='category'>ISLAMIC</h6></Link>
            <Link className='link' to="/?cat=science"><h6 className='category'>SCIENCE</h6></Link>
            <Link className='link' to="/?cat=technology"><h6 className='category'>TECHNOLOGY</h6></Link>
            <Link className='link' to="/?cat=cenima"><h6 className='category'>CENIMA</h6></Link>
            <Link className='link' to="/?cat=design"><h6 className='category'>DESIGN</h6></Link>
            <Link className='link' to="/?cat=food"><h6 className='category'>FOOD</h6></Link>
          </div>
           
          
          
        </div>
        <div className="user">
            <span className='username'>{currentUser?.username}</span>
            {currentUser ? <span className='link logout ' onClick={logout}>Logout</span>: <Link className='link login' to='/login'>Login</Link>}
            <span className='write'>
              <Link className='link' to="/write">Write</Link>
            </span>
          </div>
      </div>
    </div>
  )
}
