import React, { useState, useRef, useContext } from "react"
import { NavLink } from 'react-router-dom'
import { CSSTransition } from "react-transition-group";
import { UserContext } from '../context/UserProvider'


export default function DropdownMenu() {
  const [activeMenu] = useState('main');
  const [menuHeight] = useState(null);
  const dropdownRef = useRef(null);
  const { logout } = useContext(UserContext)

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
      >
        <div className="menu">
          <NavLink className="menu-item" to='/profile'>Profile</NavLink>
          <button className="menu-item" onClick={logout}>Logout</button>
        </div>
      </CSSTransition>
    </div>
  );
}