import React, { useContext, useEffect, useState, useRef } from 'react'
import { UserContext } from '../context/UserProvider'
import { useParams, Link } from 'react-router-dom'
import Comments from '../components/Comments'
import '../css/styles.css'

const initInputs = { comment: "" }

export default function IssueDetailPage() {
  const {
    getAllComments,
    getIssueById, 
    issue,
    user, 
    token,
    comments, 
    addComment,
    timezone
  } = useContext(UserContext)

  const [inputs, setInputs] = useState(initInputs)

  const { issueId } = useParams()

  const commentRef = useRef()
  
  const { comment } = inputs

  // const { title, description, _id, user, username } = props.location.state

  useEffect(() => {
    getIssueById(issueId)
    getAllComments(issueId)
  }, [issueId])

  function handleChange(e) {
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    addComment({comment: commentRef.current.value}, issueId)
    setInputs(initInputs)
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