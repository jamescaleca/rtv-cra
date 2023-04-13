import React from 'react'
import IssueForm from '../components/IssueForm'

export default function Post() {

  return(
    <div className="post-page">
      <div className="post-container">
        <h1>Create a post</h1>
        <IssueForm />
      </div>
    </div>
  )
}