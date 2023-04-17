import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'
import NavItem from "./NavItem"
import DropdownMenu from "./DropdownMenu"
import { ReactComponent as CaretIcon } from "../assets/icons/caret.svg"
import '../css/styles.css'

export default function Navbar(props) {
  const { logout, user: { username }, token } = useContext(UserContext)

  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "red"
  }

  return (
    <>
      {token ? 
        <nav className='navbar'>
          <ul className="navbar-nav">{props.children}</ul>
        </nav> 
      :
        <nav className='navbar'>
          <ul className="navbar-nav">
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
          </ul>
        </nav>
      }
    </>
  )
}