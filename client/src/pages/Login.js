import React from 'react'
import AuthForm from '../components/AuthForm'
import '../css/styles.css'

export default function Login() {
  return (
    <div className='auth-container'>
      <h1 id='site-title'>Rock The Vote</h1>
      <AuthForm />
    </div>
  )
}