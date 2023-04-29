import React, { useState, useRef, useContext } from "react"
import { NavLink } from 'react-router-dom'
import { CSSTransition } from "react-transition-group";
import { ReactComponent as BellIcon } from '../assets/icons/bell.svg';
import { ReactComponent as MessengerIcon } from '../assets/icons/messenger.svg';
import { ReactComponent as CaretIcon } from '../assets/icons/caret.svg';
import { ReactComponent as PlusIcon } from '../assets/icons/plus.svg';
import { ReactComponent as CogIcon } from '../assets/icons/cog.svg';
import { ReactComponent as ChevronIcon } from '../assets/icons/chevron.svg';
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow.svg';
import { ReactComponent as BoltIcon } from '../assets/icons/bolt.svg';
import { UserContext } from '../context/UserProvider'


export default function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);
  const { logout, user: { username }, token } = useContext(UserContext)

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