import React, { useState, useContext } from "react"
import { UserContext } from '../context/UserProvider'

export default function NavItem(props) {
  const [open, setOpen] = useState(false);
  const { user: { username } } = useContext(UserContext)

  const { icon } = props
  
  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {username}{icon}
      </a>
      {open && props.children}
    </li>
  )
}