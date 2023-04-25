import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserProvider'
import { useParams, Link } from 'react-router-dom'
import Comments from '../components/Comments'
import '../css/styles.css'

function IssueCommentsPage() {
  const { userAxios, 
    getAllComments, 
    issues, 
    getIssueById, 
    issue,
    setIssue, 
    user, 
    userState, 
    setUserState, 
    comments, 
    setComments 
  } = useContext(UserContext)

  const { issueId } = useParams()
  console.log(issueId)

  
  // const { title, description, _id, user, username } = props.location.state

  useEffect(() => {
    getIssueById(issueId)
    getAllComments(issueId)
  }, [issueId])


  function addComment(newComment, issueId) {
    userAxios.post(`/comments/${issueId}`, newComment)
      .then(res => setUserState(prevState => ({
        ...prevState,
        issues: prevState.issues.map(issue => 
          issueId === issue._id ? 
          {...issue, comments: [...issue.comments, newComment]} : 
          issue
        )
      })))
      .catch(err => console.log(err.response.data.errMsg))
    return getAllComments(issueId)
  }


  // const initInputs = {
  //   comment: '',
  //   user: user || '',
  //   username: username || '',
  //   _id: _id || ''
  // }

  // const [inputs, setInputs] = useState(initInputs)

  // const currentIssue = issues.find(issue => (issue._id === _id))
  // const newCommentsArray = currentIssue.comments.map(comment => (
  //   <>
  //     <li>
  //       <p>{comment.comment}</p>
  //       <p>{comment.user}</p>
  //     </li>
  //     <hr />
  //   </>
  // ))

  // const mapComments = issue.comments.map(comment => (
  //   <ul>
  //     <li>
  //       <p>{comment.comment}</p>
  //       <p>{comment.user}</p>
  //     </li>
  //   </ul>
  // ))

  // function handleChange(e) {
  //   const {name, value} = e.target
  //   setInputs(prevInputs => ({
  //     ...prevInputs,
  //     [name]: value
  //   }))
  // }

  function handleSubmit(e) {
    e.preventDefault()
    // addComment(inputs, _id)
    // setInputs(initInputs)
    // getAllComments(_id)
  }


  // const { comment } = inputs

  // console.log(issue.comments.length)

  return (
    <div id='issue-comments-page'>
      {!issue ? 
        <h1>Loading...</h1> 
        :
        <div>
          <Link
            to="../.."
            relative="path"
            className="back-button"
          >
            &larr; <span>Back to all issues</span>
          </Link>
          <h1>{issue.title}</h1>
          <p>{issue.description}</p>
          <h3>Posted by <i>{issue.username}</i></h3>

          <Comments 
            comments={comments}
          />

          {/* <h3>Comments</h3>
          <div>
            { 
              issue.comments.length === 0 || issue.comments === undefined ?
              <p>No comments on this post yet</p>
            :
              {mapComments} 
            }
          </div> */}

          <form onSubmit={handleSubmit} id='new-comment-form'>
            {/* <h3>Leave a comment as <i>{user.username}</i></h3> */}
            {/* <input
              type='text'
              name='comment'
              value={comment}
              onChange={handleChange}
              placeholder='Write your well-informed opinions here...'
            />
            <button>Comment</button> */}
          </form>

          {/* <ul id='comments-section'>
            {newCommentsArray}
          </ul> */}
        </div>
      
      }
    </div>
  )
}

export default IssueCommentsPage