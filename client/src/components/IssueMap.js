import React, { useContext, useState, useEffect } from "react"
import { Link, useLocation } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'
import UpvoteIcon from '../assets/icons/arrow-alt-square-up-regular.svg'
import DownvoteIcon from '../assets/icons/arrow-square-down-regular.svg'

export default function IssueMap(props) {
  const { 
    upvoteIssue,
    downvoteIssue,
    editIssue,
    deleteIssue,
    token,
    username,
    timezone
   } = useContext(UserContext)
  const [editToggle, setEditToggle] = useState(false)
  const { issues } = props

  const { pathname } = useLocation()

  function toggle(){setEditToggle(prevToggle => !prevToggle)}

  console.log(timezone)

  const mapIssues = [].concat(issues)
    .sort((a, b) => b.votesTotal - a.votesTotal)
    .map((issue) => 
      <li key={issue._id} className='post-li'>
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
          <p>{
            new Date(issue.datePosted)
              .toLocaleString('en-us', {timeZone: timezone})
          }</p>
          <p>
            {issue.description.length > 60 ?
              `${issue.description.slice(0, 60)}...` :
              issue.description
            }
          </p>
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

  const profileMapIssues = [].concat(issues)
    .sort((a, b) => b.datePosted - a.datePosted)
    .map((issue) => 
      <li key={issue._id} className='post-li'>
        <Link className="issue-link" to={`/issues/${issue._id}`}>
          <h3 className="issue-title">{issue.title}</h3>
          <p>{
            new Date(issue.datePosted)
              .toLocaleString('en-us', {timeZone: timezone})
          }</p>
          <p>
            {issue.description.length > 60 ?
              `${issue.description.slice(0, 60)}...` :
              issue.description
            }
          </p>
        </Link>
        <ul className="votes">
          <li className="tooltip">
            <span className="tooltiptext">Upvotes: {issue.upvotes.length}</span>
            <img 
              className='upvote'
              alt='upvote' 
              src={UpvoteIcon} 
            />
          </li>
          <li>
            <h3>{issue.votesTotal}</h3>
          </li>
          <li className="tooltip">
            <span className="tooltiptext">Downvotes: {issue.downvotes.length}</span>
            <img 
              className='downvote'
              alt='downvote' 
              src={DownvoteIcon} 
            />
          </li>
        </ul>
        <hr />
      </li>
    ) 

  return (
    <>{
      pathname === "/profile" ?
      <ul className="issue-list">{profileMapIssues}</ul> :
      <ul className="issue-list">{mapIssues}</ul>
    }</>
  )
}