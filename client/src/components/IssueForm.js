import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import { UserContext } from '../context/UserProvider'
import '../css/styles.css'

export default function IssueForm(props) {
  const initInputs = {
    title: props.title || '',
    description: props.description || ''
  }

  const [inputs, setInputs] = useState(initInputs)
  const { editIssue, addIssue } = useContext(UserContext)
  const { editToggle, toggle } = props
  const { title, description } = inputs

  const navigate = useNavigate()

  function handleChange(e) {
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    addIssue(inputs, props._id)
    setInputs(initInputs)
    navigate("/")
  }

  function handleEdit(e) {
    e.preventDefault()
    editIssue(inputs, props._id)
    toggle()
    navigate("/profile")
  }

  return (
    <>
      {editToggle ?  
        <form className="new-post-form" onSubmit={handleEdit}>
          <input 
            type='text'
            name='title'
            value={title}
            onChange={handleChange}
            placeholder='Title'
            required
          />
          <textarea 
            name='description'
            value={description}
            onChange={handleChange}
            placeholder='Description'
            rows={14}
            required
          />
          <button>Done editing</button>
        </form> :
        <form className="new-post-form" onSubmit={handleSubmit}>
          <input 
            type='text'
            name='title'
            value={title}
            onChange={handleChange}
            placeholder='Title'
            required
          />
          <textarea 
            name='description'
            value={description}
            onChange={handleChange}
            placeholder='Description'
            rows={14}
            required
          />
          <button>Post</button>
        </form> 
      }
    </>
  )
}