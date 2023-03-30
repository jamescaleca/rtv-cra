import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'
import '../css/styles.css'

export default function Navbar() {
  const { logout, user: { username }, token } = useContext(UserContext)

  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "red"
  }

  return (
    <>
      {token ? 
        <div className='navbar'>
          <NavLink 
            to='/profile'
            style={({isActive}) => isActive ? activeStyle : null}
          >
            Profile
          </NavLink>
          
          <NavLink 
            to='/issues'
            style={({isActive}) => isActive ? activeStyle : null}
          >
            Public
          </NavLink>
          
          <NavLink 
            to='/post'
            style={({isActive}) => isActive ? activeStyle : null}
          >
             + 
          </NavLink>
          
          <div>
            <p>Logged in as: <b>{username}</b></p>
            <button onClick={logout}>Logout</button>
          </div>
        </div> 
      :
        <div className='navbar'>
          <NavLink 
            to='/'
            style={({isActive}) => isActive ? activeStyle : null}
          >
            Public
          </NavLink>
          
          <NavLink 
            to='/auth'
            style={({isActive}) => isActive ? activeStyle : null}
          >
            Login
          </NavLink>
        </div>
      }
    </>
  )
}