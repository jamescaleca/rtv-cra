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


  function DropdownItem(props) {
    return (
      <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }
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

      <CSSTransition
        in={activeMenu === 'settings'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit>
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>My Tutorial</h2>
          </DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>HTML</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>CSS</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>JavaScript</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>Awesome!</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'animals'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit>
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Animals</h2>
          </DropdownItem>
          <DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
          <DropdownItem leftIcon="🐸">Frog</DropdownItem>
          <DropdownItem leftIcon="🦋">Horse?</DropdownItem>
          <DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}