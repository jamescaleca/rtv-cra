import React from 'react'

export default function Comments(props) {
  const comments = props.comments
  return (
    <>
    {comments.length > 0 ?
      <ul>
        {comments.map(comment => (
          <li key={comment._id} className="post-li">
            <div className="comment">
              <p>{comment.comment}</p>
              <p>Posted by: <i>{comment.username}</i></p>
            </div>
            <hr />
          </li>
        ))}
      </ul> :
      <p style={{ "padding": "1rem 0", "text-align": "center" }}>
        No comments here yet
      </p>
      }
    </>
  )
}