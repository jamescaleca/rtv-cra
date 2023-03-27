import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'
import '../css/styles.css'

export default function Navbar() {
  const { logout, user: { username }, token } = useContext(UserContext)

  return (
    <>
      {token ? 
        <div className='navbar'>
          <Link to='/profile'>Profile</Link>
          <Link to='/'>Public</Link>
          <Link to='/post'> + </Link>
          <div>
            <p>Logged in as: <b>{username}</b></p>
            <button onClick={logout}>Logout</button>
          </div>
        </div> 
      :
        <div className='navbar'>
          <Link to='/'>Public</Link>
          <Link to='/auth'>Login</Link>
        </div>
      }
    </>
  )
}