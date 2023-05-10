import React from "react"
import LightMode from "../assets/icons/light-mode.svg"
import DarkMode from "../assets/icons/dark-mode.svg"

export default function LightDarkBtn() {

  return (
    <div className="darkmode-button">
      <input type="checkbox" id="darkmode-toggle"/>
      <label htmlFor="darkmode-toggle">
        <img alt="sun" className="sun" src={LightMode} />
        <img alt="moon" className="moon" src={DarkMode} />
      </label>
    </div>
  )
}