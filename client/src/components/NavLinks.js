import React from "react"
import { NavLink } from 'react-router-dom'


export default function NavLinks() {
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "red"
  }

  return(
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
  )
}