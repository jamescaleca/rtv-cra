import React, { useContext, useEffect } from 'react'
import IssueForm from '../components/IssueForm'
import IssueMap from "../components/IssueMap"
import IssueList from '../components/IssueList'
import { UserContext } from '../context/UserProvider'
import '../css/styles.css'

export default function Profile() {
  const {
    issues,
    user: { username },
    token,
    getUserIssues,
    deleteIssue,
    editIssue
  } = useContext(UserContext)

  useEffect(() => {
    getUserIssues()
  }, [])
  
  return (
    <div className='profile'>
      
      {/* <div id='add-issue-txt'>
        <h3>Add an Issue</h3>
      </div>
      <IssueForm /> */}

      <h2>😎 Your Issues 😎</h2>
      <IssueMap 
        issues={issues}
      />
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