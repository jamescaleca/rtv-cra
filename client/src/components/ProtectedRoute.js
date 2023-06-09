import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute(props){
  const { children, redirectTo, token } = props
  return token ? children : <Navigate to={redirectTo} />
}

export default ProtectedRoute;