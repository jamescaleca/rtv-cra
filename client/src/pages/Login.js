import React, { useState, useContext } from 'react'
import AuthForm from '../components/AuthForm'
import { UserContext } from '../context/UserProvider'
import '../css/styles.css'

const initInputs = {username: '', password: ''}

export default function Login() {
  const [toggle, setToggle] = useState(false)
  const [inputs, setInputs] = useState(initInputs)

  const { 
    errMsg, 
    resetAuthErr,
    setStatus,
    login,
    signup,
  } = useContext(UserContext)

  function handleChange(e) {
    const { name, value } = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSignup(e){
    e.preventDefault()
    setStatus("submitting")
    signup(inputs)
  }

  function handleLogin(e){
    e.preventDefault()
    setStatus("submitting")
    login(inputs)
  }

  function toggleForm() {
    setToggle(prev => !prev)
    resetAuthErr()
  }

  return (
    <div className='auth-container'>
      <h1 id='site-title'>Rock The Vote</h1>
      { !toggle ? 
        <>
          <AuthForm 
            handleChange={handleChange}
            handleSubmit={handleSignup}
            inputs={inputs}
            btnText='Sign up'
            errMsg={errMsg}
          />
          <p onClick={toggleForm}>Already a member?</p>
        </>
      :
        <>
          <AuthForm 
            handleChange={handleChange}
            handleSubmit={handleLogin}
            inputs={inputs}
            btnText='Login'
            errMsg={errMsg}
          />
          <p onClick={toggleForm}>Not a member?</p>
        </>
      }
    </div>
  )
}