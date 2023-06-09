import React, { useContext } from 'react'
import { UserContext } from '../context/UserProvider'
import NavItem from "./NavItem"
import NavLinks from "./NavLinks"
import DropdownMenu from "./DropdownMenu"
import { ReactComponent as CaretIcon } from "../assets/icons/caret.svg"
import '../css/styles.css'


export default function Navbar(props) {
  const { token } = useContext(UserContext)

  return (
    <>
      {token ? 
        <nav className='navbar'>
          <ul className="navbar-nav">
            <NavLinks />
            <NavItem icon={<CaretIcon />}>
              <DropdownMenu></DropdownMenu>
            </NavItem>
            {/* <LightDarkBtn /> */}
            {/* <CircleIcon 
              onClick={darkModeToggle}
              id="dark-mode-toggle"
            /> */}
          </ul>
        </nav> 
      :
        <nav className='navbar'>
          <ul className="navbar-nav">
            <NavLinks />
            {/* <LightDarkBtn /> */}
            {/* <CircleIcon 
              onClick={darkModeToggle}
              id="dark-mode-toggle"
            /> */}
          </ul>
        </nav>
      }
    </>
  )
}