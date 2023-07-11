import React, { useContext, useState, useRef } from 'react'
import { UserContext } from '../context/UserProvider'
import '../css/styles.css'

export default function AuthForm(props) {
  const { 
    errMsg, 
    resetAuthErr,
    setStatus,
    login,
    signup,
    status
  } = useContext(UserContext)

  const [toggle, setToggle] = useState(false)

  const usernameRef = useRef()
  const passwordRef = useRef()

  function toggleForm() {
    setToggle(prev => !prev)
    resetAuthErr()
  }

  function handleSignup(e){
    e.preventDefault()
    setStatus("submitting")
    signup({
      username: usernameRef.current.value, 
      password: passwordRef.current.value
    })
  }

  function handleLogin(e){
    e.preventDefault()
    setStatus("submitting")
    login({
      username: usernameRef.current.value, 
      password: passwordRef.current.value
    })
  }

  return (
    <>
      {!toggle ?
      <>
        <form id='auth-form' onSubmit={handleSignup}>
          <input 
            type='text'
            ref={usernameRef}
            name='username'
            placeholder='Username'
          />
          <input 
            type='password'
            ref={passwordRef}
            name='password'
            placeholder='Password'
          />
          <button disabled={status === "submitting"}
          >
            { status === "submitting" 
              ? "Submitting..." 
              : "Sign Up" 
            }
          </button>
          <p style={{color: 'red'}}>{ errMsg }</p>
        </form>
        <p onClick={toggleForm}>Already a member?</p>
      </>
      :
      <>
        <form id='auth-form' onSubmit={handleLogin}>
          <input 
            type='text'
            ref={usernameRef}
            name='username'
            placeholder='Username'
          />
          <input 
            type='password'
            ref={passwordRef}
            name='password'
            placeholder='Password'
          />
          <button disabled={status === "submitting"}
          >
            { status === "submitting" 
              ? "Submitting..." 
              : "Log in" 
            }
          </button>
          <p style={{color: 'red'}}>{ errMsg }</p>
        </form>
        <p onClick={toggleForm}>Not a member?</p>
      </>
      }
    </>
  )
}