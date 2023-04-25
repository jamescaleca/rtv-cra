import React, { useContext, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
import IssueMap from "../components/IssueMap"
import { UserContext } from '../context/UserProvider'
import Patrick from '../assets/images/patrick.jpeg'
import '../css/styles.css'

export function loader() {
  async function getAllIssues() {
    const url = "/issues"
    const res = await fetch(url)
    if(!res.ok) {
      throw {
        message: "Failed to fetch issues",
        statusText: res.statusText,
        status: res.status
      }
    }
    const data = await res.json()
    return data
  }
  return getAllIssues()
}



export default function Public(){
  const issues = useLoaderData()

  return (
    <div className="public">
      <h2>🔥 Hottest issues 🔥</h2>
      { issues.length === 0 ? 
        <div className='nothing-here'>
          <h1>Oops!</h1>
          <p>Looks like there's nothing here.</p>
          <img src={Patrick}></img>
        </div>
        :
        <IssueMap 
          issues={issues}
        />
      }
    </div>
  )
}