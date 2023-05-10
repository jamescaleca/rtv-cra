import React, { useContext, useEffect } from 'react'
import { useLocation } from "react-router-dom"
import IssueMap from "../components/IssueMap"
import { UserContext } from '../context/UserProvider'
import Patrick from '../assets/images/patrick.jpeg'
import '../css/styles.css'

export default function Public(){
  const { getAllIssues, publicIssues } = useContext(UserContext)
  const { pathname } = useLocation()

  useEffect(() => {
    getAllIssues()
  })

  return (
    <div className="public">
      <h2>🔥 Hottest issues 🔥</h2>
      { publicIssues.length === 0 ? 
        <div className='nothing-here'>
          <h1>Oops!</h1>
          <p>Looks like there's nothing here.</p>
          <img alt="patrick" src={Patrick}></img>
        </div>
        :
        <IssueMap 
          issues={publicIssues}
          pathname={pathname}
        />
      }
    </div>
  )
}