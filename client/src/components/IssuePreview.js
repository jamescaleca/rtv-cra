import React, { useState, useContext } from 'react'
import IssueForm from './IssueForm'
import { UserContext } from '../context/UserProvider'
import UpvoteIcon from '../assets/icons/arrow-alt-square-up-regular.svg'
import DownvoteIcon from '../assets/icons/arrow-square-down-regular.svg'
import '../css/styles.css'

function IssuePreview(props) {
  const { _id, title, description, upvotes, downvotes } = props
  const {editIssue, deleteIssue} = useContext(UserContext)
  const [editToggle, setEditToggle] = useState(false)

  function toggle(){setEditToggle(prevToggle => !prevToggle)}

  const firstFewDesc = description.slice(0, 60)

  return (
    <>
    <h1>{title}</h1>
      <h2>
        {description.length > 60 ? 
          `${firstFewDesc}...`
          : description
        }
      </h2>
      <h3>
        <img 
          className='upvote'
          alt='upvote-icon' 
          src={UpvoteIcon}
        />  
        {upvotes.length}
      </h3>
      <h3>
        <img 
          className='downvote'
          alt='downvote-icon' 
          src={DownvoteIcon}
        />   
        {downvotes.length}
      </h3>
      <h3>Total Votes: {upvotes.length - downvotes.length}</h3>
      <button onClick={() => deleteIssue(_id)}>Delete</button>
      <button onClick={() => toggle()}>Edit</button>

      {editToggle === true ?
        <>
          <IssueForm 
            _id={_id}
            title={title}
            description={description}
            submit={editIssue}
            toggle={toggle}
            editToggle={editToggle}
          />
          <button onClick={() => toggle()}>Done editing</button>
        </>
        :
        null
      }
    </>
  )
}

export default IssuePreview