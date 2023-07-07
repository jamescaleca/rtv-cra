import React, { useContext, useEffect, useState, useRef } from 'react'
import { UserContext } from '../context/UserProvider'
import { useParams, Link } from 'react-router-dom'
import Comments from '../components/Comments'
import axios from "axios"
import '../css/styles.css'

export default function IssueDetailPage() {
  const {
    user, 
    token,
    addComment,
    timezone
  } = useContext(UserContext)

  const [issue, setIssue] = useState(null)
  const [comments, setComments] = useState([])

  const { issueId } = useParams()

  const commentRef = useRef()

  //GET ISSUE BY ID
  function getIssueById(issueId) {
    axios.get(`/issues/${issueId}`)
      .then(res => setIssue(res.data))
      .catch(err => console.log(err.response.data.errMsg))
  }

  //GET ALL COMMENTS ON POST
  function getAllComments(issueId) {
    axios.get(`/comments/${issueId}`)
      .then(res => setComments(res.data))
      .catch(err => console.log(err.response.data.errMsg))
  }

  useEffect(() => {
    getIssueById(issueId)
    getAllComments(issueId)
  }, [issueId])

  function handleSubmit(e) {
    e.preventDefault()
    addComment({comment: commentRef.current.value}, issueId)
    getAllComments(issueId)
  }

  return (
    <div className='issue-comments-page'>
      {!issue ? 
        <h1>Loading...</h1> :
        <>
          <Link
            to="../.."
            relative="path"
            className="back-button"
          >
            &larr; <span>Back to all issues</span>
          </Link>
          <div className="issue-title-desc">
            <p className="p-bg">Posted by 
              <i>
                <Link 
                  to={`/user/${issue.username}`} 
                  state={{ user: issue.user }}
                  className="username-small"
                >
                  {` ${issue.username} `}
                </Link>
              </i>
              on {new Date(issue.datePosted)
                .toLocaleString('en-us', {timeZone: timezone})
              }
            </p>
            <h4>{issue.title}</h4>
            <p className="issue-desc">{issue.description}</p>
          </div>
          {token ? 
            <form onSubmit={handleSubmit} className='new-post-form'>
              <p>Leave a comment as <i>{user.username}</i></p>
              <textarea 
                name='comment'
                ref={commentRef}
                placeholder='Write your well-informed comments here!'
                rows={8}
                required
              />
              <button>Post comment</button>
            </form> :
            <p style={{ "padding": "1rem 0", "text-align": "center" }}>
              Sign in to post a comment
            </p>
          }
          <hr />
          <Comments 
            comments={comments}
          />
        </>
      }
    </div>
  )
}