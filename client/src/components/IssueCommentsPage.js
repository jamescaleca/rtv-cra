import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserProvider'
import { useParams } from 'react-router-dom'
import '../css/styles.css'

function IssueCommentsPage(props) {
  const params = useParams()
  const { userAxios, getAllComments, issues, getIssueById, issue, setIssue, user, userState, setUserState } = useContext(UserContext)
  
  // const { title, description, _id, user, username } = props.location.state

  useEffect(() => {
    getIssueById(params.issueId)
  }, [params.issueId])

  console.log(issue)

  function addComment(newComment, issueId) {
    userAxios.post(`/api/issues/${issueId}/comments`, newComment)
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

  const mapComments = issue.comments.map(comment => (
    <>
      <li>
        <p>{comment.comment}</p>
        <p>{comment.user}</p>
      </li>
    </>
  ))

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

  // console.log(currentIssue)

  return (
    <div id='issue-comments-page'>
      {issue ? 
        <div>
          <h1>{issue.title}</h1>
          <p>{issue.description}</p>
          <h3>Posted by <i>{issue.username}</i></h3>

          <h3>Comments</h3>
          <ul>{ mapComments }</ul>

          <form onSubmit={handleSubmit} id='new-comment-form'>
            <h3>Leave a comment as <i>{user.username}</i></h3>
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
      : <h1>Loading...</h1>
      }
    </div>
  )
}

export default IssueCommentsPage