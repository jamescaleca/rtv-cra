import React, { useContext } from 'react'
import { UserContext } from '../context/UserProvider'
import '../css/styles.css'

export default function AuthForm(props) {
  const {
    handleChange,
    handleSubmit,
    btnText,
    errMsg,
    inputs: {
      username,
      password
    }
  } = props

  const { status } = useContext(UserContext)

  return (
    <form id='auth-form' onSubmit={handleSubmit}>
      <input 
        type='text'
        value={username}
        name='username'
        onChange={handleChange}
        placeholder='Username'
      />
      <input 
        type='password'
        value={password}
        name='password'
        onChange={handleChange}
        placeholder='Password'
      />
      <button disabled={status === "submitting"}
      >
        { status === "submitting" 
          ? "Submitting..." 
          : btnText 
        }
      </button>
      <p style={{color: 'red'}}>{ errMsg }</p>
    </form>
  )
}