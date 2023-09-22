import React, { useContext } from 'react'
import { UserContext } from '../context/UserProvider'

export default function Comments({ comments }) {
  const { user } = useContext(UserContext)

  console.log(user._id)
  return (
    <>
    {comments.length > 0 ?
      <ul>
        {comments.map(comment => (
          <li key={comment._id} className="post-li">
            <div className="comment">
              <p>{comment.comment}</p>
              <p>Posted by: <i>{comment.username}</i></p>
              {/* {comment.user === user._id && token ?
                <button 
                  className="delete-button"

                  >Delete
                </button> 
                : null 
              } */}
            </div>
            <hr />
          </li>
        ))}
      </ul> :
      <p style={{ "padding": "1rem 0", "textAlign": "center" }}>
        No comments here yet
      </p>
      }
    </>
  )
}