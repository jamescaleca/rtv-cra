import React from 'react'

export default function Comments(props) {
  const comments = props.comments
  return (
    <>
      <h1>Comments go here:</h1>
      <ul>
        {comments.map(comment => (
          <li>
            <p>{comment.comment}</p>
            <p>Posted by: <i>{comment.username}</i></p>
          </li>
        ))}
      </ul>
    </>
  )
}