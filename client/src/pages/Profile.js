import React, { useContext, useEffect } from 'react'
import IssueMap from "../components/IssueMap"
import { UserContext } from '../context/UserProvider'
import '../css/styles.css'

export default function Profile() {
  const {
    issues,
    user: { _id },
    getUserIssues,
  } = useContext(UserContext)

  useEffect(() => {
    getUserIssues(_id)
  }, [getUserIssues, _id])
  
  return (
    <div className='profile'>
      
      {/* <div id='add-issue-txt'>
        <h3>Add an Issue</h3>
      </div>
      <IssueForm /> */}

      <h2>😎 Your Issues 😎</h2>

      {issues.length > 0 ? 
        <IssueMap issues={issues} /> :
        <h4 style={{ "margin": "2rem"}}>You haven't posted any issues yet</h4> 
      }
      {/* <IssueList 
        issues={issues}
        deleteIssue={deleteIssue}
        editIssue={editIssue}
        token={token}
        username={username}
      /> */}
    </div>
  )
}