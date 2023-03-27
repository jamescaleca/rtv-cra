import React from 'react'
import { Link } from 'react-router-dom'
import IssuePreview from './IssuePreview'
import '../css/styles.css'

export default function IssueList(props) {
  const { issues, editIssue, deleteIssue, username } = props
  // console.log(username)
  return (
    <ul id='profile-issue-list'>
      { issues.map((issue) => 
        <li className='profile-issue-li' key={issue._id}>
          <Link 
            to={`/api/issues/${issue._id}`}
          >
            <div className='profile-issues-title'>
              <h1>issue goes here</h1>
            </div>
          </Link>

          <IssuePreview 
            {...issue}
            key={`${issue._id}`}
            deleteIssue={deleteIssue}
            editIssue={editIssue}
            username={username}
            upvotes={issue.upvotes}
            downvotes={issue.downvotes}
          />
          <hr />
        </li>
      )}
    </ul>
  )
}