import React, { useState, useContext } from 'react'
import { useLoaderData, useNavigate, Form } from "react-router-dom"
import AuthForm from '../components/AuthForm'
import { UserContext } from '../context/UserProvider'
import axios from 'axios'
import { loginUser } from "../api"
import '../css/styles.css'

const initInputs = {username: '', password: ''}
const userAxios = axios.create()

const initState = {
  user: JSON.parse(localStorage.getItem('user')) || {},
  token: localStorage.getItem('token') || '',
  issues: [],
  // currentIssue: {},
  errMsg: ''
}

userAxios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  config.headers.Authorization = `Bearer ${token}`
  return config
})

export function loader({ request }) {
  return new URL(request.url).searchParams.get("message")
}

export async function action({ request }) {
  const formData = await request.formData()
  const username = formData.get("username")
  const password = formData.get("password")
  const data = await loginUser({ username, password })
  console.log(data)
  return null
}

export default function Login() {
  const [userState, setUserState] = useState(initState)
  const [toggle, setToggle] = useState(false)
  const [loginFormData, setLoginFormData] = useState(initInputs)
  const [error, setError] = useState(null)
  const [status, setStatus] = useState("idle")

  const message = useLoaderData()
  const navigate = useNavigate()

  function handleChange(e) {
    const { name, value } = e.target
    setLoginFormData(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function resetAuthErr(){
    setUserState(prevState => ({
      ...prevState,
      errMsg: ''
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
      .catch(err => setError(err.response.data.errMsg))
      // .then(res => console.log(res))
      // .catch(err => console.log(err))
  }

  function getUserIssues() {
    axios.get('/issues/user')
      .then(res => setUserState(prevState => ({
        ...prevState,
        issues: res.data
      })))
      .catch(err => console.log(err.response.data.errMsg))
  }

  function handleSignup(e){
    e.preventDefault()
    signup(loginFormData)
    getUserIssues()
  }

  function handleLogin(e){
    e.preventDefault()
    setStatus("submitting")
    setError(null)
    loginUser(loginFormData)
      .then(data => {
        navigate("/profile", { replace: true })
      })
      .catch(err => setError(err))
      .finally(() => setStatus("idle"))
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
          <Form id='auth-form' onSubmit={handleSignup}>
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
            <p style={{color: 'red'}}>{ userState.errMsg }</p>
          </Form>
          <p onClick={toggleForm}>Already a member?</p>
        </>
      :
        <>
          <Form method="post" id='auth-form' >
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
            {error && <p style={{color: 'red'}}>{ error.message }</p>}
          </Form>
          <p onClick={toggleForm}>Not a member?</p>
        </>
      }
    </div>
  )
}