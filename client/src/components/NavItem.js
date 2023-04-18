import React, { useState, useContext } from "react"
import { UserContext } from '../context/UserProvider'


export default function NavItem(props) {
  const [open, setOpen] = useState(false);
  const { logout, user: { username }, token } = useContext(UserContext)


  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {username}{props.icon}
      </a>

      {open && props.children}
    </li>
  );
}