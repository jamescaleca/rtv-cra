import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import NavLinks from "./NavLinks"
import NavItem from './NavItem'
import DropdownMenu from './DropdownMenu'
import { ReactComponent as CaretIcon } from '../assets/icons/caret.svg'
import LightDarkBtn from './LightDarkBtn'
import { UserContext } from '../context/UserProvider'



export default function Layout() {
  const { logout, user: { username }, token } = useContext(UserContext)

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}