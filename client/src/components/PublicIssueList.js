import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'
import UpvoteIcon from '../assets/icons/arrow-alt-square-up-regular.svg'
import DownvoteIcon from '../assets/icons/arrow-square-down-regular.svg'
import Patrick from '../assets/images/patrick.jpeg'
import '../css/styles.css'

export default function IssueList(props) {
  // const { issues, username } = props
  const { upvoteIssue, downvoteIssue, getAllIssues, publicIssues, user } = useContext(UserContext)
  // const [votesTotal, setVotesTotal] = useState(0)

  useEffect(() => {
    getAllIssues()
  }, [])

  const mapIssues = [].concat(publicIssues)
    .sort((a, b) => b.votesTotal - a.votesTotal)
    .map((issue) => 
      <li key={issue._id} className='issue-li'>
        <Link to={`/api/issues/${issue._id}`}>
          <h1>{issue.title}</h1>
          <p>{issue.description}</p>
          {/* <h3>Upvotes: {issue.upvotes.length}</h3>
          <h3>Downvotes: {issue.downvotes.length}</h3> */}
          <h3>Total votes: <span>{issue.votesTotal}</span></h3>
          <h4>Username: {issue.username}</h4>
        </Link>
        <img 
          className='upvote'
          alt='upvote' 
          src={UpvoteIcon} 
          onClick={() => upvoteIssue(issue._id)}
        />
        <img 
          className='downvote'
          alt='downvote' 
          src={DownvoteIcon} 
          onClick={() => downvoteIssue(issue._id)}
        />
        <hr />
      </li>
    )

  return (
    <>
      <div id='public-issues-title'>
        <h1>All Issues</h1>
      </div>
      { publicIssues.length === 0 ? 
        <div className='nothing-here'>
          <h1>Oops!</h1>
          <p>Looks like there's nothing here.</p>
          <img src={Patrick}></img>
        </div>
        :
        <ul id='issue-list'>
          { mapIssues }
        </ul>
      }
    </>
  )
}