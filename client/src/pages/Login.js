import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import AuthForm from '../components/AuthForm'
import { UserContext } from '../context/UserProvider'
import '../css/styles.css'

const initInputs = {username: '', password: ''}

export default function Login() {
  const [toggle, setToggle] = useState(false)
  const [inputs, setInputs] = useState(initInputs)
  const [status, setStatus] = useState("idle")
  const [error, setError] = useState(null)

  const { 
    errMsg, 
    resetAuthErr, 
    setUserState, 
    handleAuthError, 
    getUserIssues 
  } = useContext(UserContext)

  const navigate = useNavigate()

  function signup(credentials) {
    axios.post('/auth/signup', credentials)
      .then(res => {
        const { user, token } = res.data
        console.log(res)
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        setUserState(prevUserState => ({
          ...prevUserState,
          user,
          token
        }))
      })
      .catch(err => handleAuthError(err.response.data.errMsg))
      // .then(res => console.log(res))
      // .catch(err => console.log(err))
  }

  function login(credentials) {
    axios.post('/auth/login', credentials)
      .then(res => {
        const { user, token } = res.data
        console.log(res.data)
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        getUserIssues()
        setUserState(prevUserState => ({
          ...prevUserState,
          user,
          token
        }))
        navigate("/profile", { replace: true })
      })
      .catch(err => handleAuthError(err.response.data.errMsg))
      .finally(() => setStatus("idle"))
  }

  function handleChange(e) {
    const { name, value } = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSignup(e){
    e.preventDefault()
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