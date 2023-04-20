import React, { useContext } from "react"
import { NavLink } from 'react-router-dom'
import { UserContext } from "../context/UserProvider"


export default function NavLinks() {
  const { token } = useContext(UserContext)

  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "red"
  }

  return(
    <>
      {token ?
        <>
          <li className="nav-link">
            <NavLink 
              to='/profile'
              style={({isActive}) => isActive ? activeStyle : null}
            >
              Profile
            </NavLink>
          </li>
          <li className="nav-link">
            <NavLink 
              to='/issues'
              style={({isActive}) => isActive ? activeStyle : null}
            >
              Public
            </NavLink>
          </li>
          <li className="nav-link">
            <NavLink 
              to='/post'
              style={({isActive}) => isActive ? activeStyle : null}
            >
              + 
            </NavLink>
          </li>
        </>
        :
        <>
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
        </>
      }
    </>
  )
}