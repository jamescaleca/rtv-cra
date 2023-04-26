import React, { useContext } from "react"
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'
import UpvoteIcon from '../assets/icons/arrow-alt-square-up-regular.svg'
import DownvoteIcon from '../assets/icons/arrow-square-down-regular.svg'

export default function IssueMap(props) {
  const { upvoteIssue, downvoteIssue } = useContext(UserContext)
  const { issues } = props

  const mapIssues = [].concat(issues)
    .sort((a, b) => b.votesTotal - a.votesTotal)
    .map((issue) => 
      <li key={issue._id} className='issue-li'>
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
        <Link className="issue-link" to={`/issues/${issue._id}`}>
          <h3 className="issue-title">{issue.title}</h3>
          <p>
            {issue.description.length > 60 ?
              `${issue.description.slice(0, 60)}...` :
              issue.description
            }
          </p>
          {/* <h3>Upvotes: {issue.upvotes.length}</h3>
          <h3>Downvotes: {issue.downvotes.length}</h3> */}
        </Link>
        <div className="votes">
          <img 
            className='upvote'
            alt='upvote' 
            src={UpvoteIcon} 
            onClick={() => upvoteIssue(issue._id)}
          />
          <h3>{issue.votesTotal}</h3>
          <img 
            className='downvote'
            alt='downvote' 
            src={DownvoteIcon} 
            onClick={() => downvoteIssue(issue._id)}
          />
        </div>
        <hr />
      </li>
    )

  return (
    <ul className="issue-list">{mapIssues}</ul>
  )
}