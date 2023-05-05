import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserProvider'
import { useParams, Link } from 'react-router-dom'
import Comments from '../components/Comments'
import '../css/styles.css'

export default function IssueDetailPage() {
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
    setComments,
    timezone
  } = useContext(UserContext)

  const { issueId } = useParams()
  console.log(issue)
  
  // const { title, description, _id, user, username } = props.location.state

  useEffect(() => {
    getIssueById(issueId)
    getAllComments(issueId)
  }, [])


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
    <div className='issue-comments-page'>
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
          <p>Posted by 
            <i>
              <Link 
                to={`/user/${issue.username}`} 
                state={{ user: issue.user }}
                >
                {` ${issue.username}`}
              </Link>
            </i>
          </p>
          <h4>{issue.title}</h4>
          <p>Date posted: {
            new Date(issue.datePosted)
              .toLocaleString('en-us', {timeZone: timezone})
          }</p>
          <p>{issue.description}</p>
        

          <form onSubmit={handleSubmit} className='new-post-form'>
            <h3>Leave a comment as <i>{user.username}</i></h3>
            <textarea 
              name='description'
              // value={description}
              // onChange={handleChange}
              placeholder='Write your well-informed comments here!'
              rows={14}
              required
            />
            <button>Post comment</button>
          </form>
          <hr />
          <Comments 
            comments={comments}
          />
        </div>
      
      }
    </div>
  )
}