import React, { useContext, useEffect } from 'react'
import IssueMap from "../components/IssueMap"
import { UserContext } from '../context/UserProvider'
import Patrick from '../assets/images/patrick.jpeg'
import '../css/styles.css'

export default function Public(){
  const { getAllIssues, publicIssues } = useContext(UserContext)

  useEffect(() => {
    getAllIssues()
  }, [])

  return (
    <div className="public">
      <h2>🔥 Hottest issues 🔥</h2>
      { publicIssues.length === 0 ? 
        <div className='nothing-here'>
          <h1>Oops!</h1>
          <p>Looks like there's nothing here.</p>
          <img src={Patrick}></img>
        </div>
        :
        <IssueMap 
          issues={publicIssues}
        />
      }
    </div>
  )
}