import React, { useState, useContext } from 'react'
import { useLoaderData, useNavigate } from "react-router-dom"
import AuthForm from '../components/AuthForm'
import { UserContext } from '../context/UserProvider'
import axios from 'axios'
import { loginUser } from "../api"
import '../css/styles.css'

const initInputs = {username: '', password: ''}
const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  config.headers.Authorization = `Bearer ${token}`
  return config
})

export function loader({ request }) {
  return new URL(request.url).searchParams.get("message")
}

export default function Login() {
  const initState = {
    user: JSON.parse(localStorage.getItem('user')) || {},
    token: localStorage.getItem('token') || '',
    issues: [],
    // currentIssue: {},
    errMsg: ''
  }
  const [inputs, setInputs] = useState(initState)
  const [toggle, setToggle] = useState(false)
  const [loginFormData, setLoginFormData] = useState(initState)
  const [error, setError] = useState(null)
  const [status, setStatus] = useState("idle")

  const message = useLoaderData()
  const navigate = useNavigate()

  const { signup,  errMsg, resetAuthErr, getUserIssues, setUserState } = useContext(UserContext)


  function handleChange(e) {
    const { name, value } = e.target
    setLoginFormData(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function login(credentials) {
    axios.post('/auth/login', credentials)
      .then(res => {
        const { user, token } = res.data
        console.log(res.data)
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        setUserState(prevUserState => ({
          ...prevUserState,
          user,
          token
        }))
        navigate("/profile", { replace: true })
      })
      .catch(err => setError(err.response.data.errMsg))
      .finally(() => setStatus("idle"))
  }

  

  function handleSignup(e){
    e.preventDefault()
    signup(inputs)
    getUserIssues()
  }

  function handleLogin(e){
    e.preventDefault()
    setStatus("submitting")
    setError(null)
    login(loginFormData)

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
          <form id='auth-form' onSubmit={handleSignup}>
            <input 
              type='text'
              value={loginFormData.username}
              name='username'
              onChange={handleChange}
              placeholder='Username'
            />
            <input 
              type='password'
              value={loginFormData.password}
              name='password'
              onChange={handleChange}
              placeholder='Password'
            />
            <button>Sign up</button>
            <p style={{color: 'red'}}>{ errMsg }</p>
          </form>
          <p onClick={toggleForm}>Already a member?</p>
        </>
      :
        <>
          <form id='auth-form' onSubmit={handleLogin}>
            <input 
              type='text'
              value={loginFormData.username}
              name='username'
              onChange={handleChange}
              placeholder='Username'
            />
            <input 
              type='password'
              value={loginFormData.password}
              name='password'
              onChange={handleChange}
              placeholder='Password'
            />
            <button
              disabled={status === "submitting"}
            >
              {status === "submitting"
                ? "Logging in..."
                : "Log in"
              }
            </button>
            {message && <p style={{color: 'red'}}>{ message }</p>}
            {error && <p style={{color: 'red'}}>{ error }</p>}
          </form>
          <p onClick={toggleForm}>Not a member?</p>
        </>
      }
    </div>
  )
}