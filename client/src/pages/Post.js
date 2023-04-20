import React from 'react'
import IssueForm from '../components/IssueForm'

export default function Post() {

  return(
    <div className="post-page">
      <div className="post-container">
        <h2>Create a post</h2>
        <IssueForm />
      </div>
    </div>
  )
}