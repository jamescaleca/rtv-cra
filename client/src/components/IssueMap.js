import React, { useContext, useState } from "react"
import { Link, useLocation } from 'react-router-dom'
import IssueForm from "./IssueForm"
import { UserContext } from '../context/UserProvider'
import UpvoteIcon from '../assets/icons/arrow-alt-square-up-regular.svg'
import DownvoteIcon from '../assets/icons/arrow-square-down-regular.svg'

export default function IssueMap(props) {
  const { 
    upvoteIssue,
    downvoteIssue,
    editIssue,
    deleteIssue,
    timezone
   } = useContext(UserContext)
  const [editToggle, setEditToggle] = useState(false)
  const { issues } = props

  const { pathname } = useLocation()

  function toggle(){setEditToggle(prevToggle => !prevToggle)}
  
  const modal = document.querySelector("[data-modal]")
  const overlay = document.querySelector("[data-overlay]")

  function openModal() {
    modal.classList.add("open")
    overlay.classList.add("open")
  }
  function closeModal() {
    modal.classList.remove("open")
    overlay.classList.remove("open")
  }

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
        <div className="post-buttons">
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
          <ul className="edit-delete-btns">
            <li><button onClick={() => toggle()}>Edit</button></li>
            <li>
              <button 
                data-open-modal
                className="delete-button" 
                onClick={() => openModal()}
              >Delete
              </button>
            </li>
          </ul>
          <div data-overlay className="overlay"></div>
          <div data-modal className="modal">
            <div>Are you sure you want to delete this issue?</div>
            <div>This action cannot be undone.</div>
            <button 
              data-close-modal
              onClick={() => closeModal()}
            >Actually nevermind
            </button>
            <button
              data-close-modal
              className="delete-button"
              onClick={() => deleteIssue(issue._id)}
            >Yes, delete this issue

            </button>
          </div>
        </div>
        {editToggle === true ?
          <IssueForm 
            _id={issue._id}
            title={issue.title}
            description={issue.description}
            submit={editIssue}
            toggle={toggle}
            editToggle={editToggle}
          />
          :
          null
        }
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