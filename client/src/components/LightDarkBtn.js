import React, { useContext } from "react"
import { UserContext } from "../context/UserProvider"
import LightMode from "../assets/icons/light-mode.svg"
import DarkMode from "../assets/icons/dark-mode.svg"

export default function LightDarkBtn() {
  const { darkMode, setDarkMode } = useContext(UserContext)

  return (
    <div className="darkmode-button">
      <input type="checkbox" id="darkmode-toggle"/>
      <label htmlFor="darkmode-toggle">
        <img className="sun" src={LightMode} />
        <img className="moon" src={DarkMode} />
      </label>
    </div>
  )
}