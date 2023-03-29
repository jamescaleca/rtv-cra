import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Auth from './components/Auth'
import Profile from './components/Profile'
import Public from './components/Public'
import Post from './components/Post'
import IssueList from './components/IssueList'
import IssueCommentsPage from './components/IssueCommentsPage'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import { UserContext } from './context/UserProvider'
import './css/styles.css'

function App() {
  const { token, user } = useContext(UserContext)

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route 
              path='/' 
              element={<Public />} 
            />
            <Route 
              path='/auth'
              element={token ? <Navigate to='/' /> : <Auth />}
            />
            <Route 
              path='/profile'
              element={<ProtectedRoute token={token} redirectTo='/'>
                  <Profile />
                </ProtectedRoute>}
            />
            <Route 
              path='/post'
              element={<ProtectedRoute token={token} redirectTo='/'>
                  <Post />
                </ProtectedRoute>}
            />
            <Route 
              path='/api/issues/:issueId'
              element={<IssueCommentsPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App