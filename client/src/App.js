import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from "./pages/Login"
import Profile from './pages/Profile'
import Public from './pages/Public'
import Post from './pages/Post'
import IssueList from './components/IssueList'
import IssueDetailPage from './pages/IssueDetailPage'
import OtherUserProfile from './pages/OtherUserProfile'
import NotFound from './pages/NotFound'
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
              path="/"
              element={<Public />}
            />
            <Route 
              path="/login"
              element={<Login />}
            />
            <Route 
              path='/issues/:issueId'
              element={<IssueDetailPage />}
            />
            <Route 
              path='/user/:username'
              element={<OtherUserProfile />}
            />
            <Route 
              path='/profile'
              element={<ProtectedRoute token={token} redirectTo='/'>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route 
              path='/post'
              element={<ProtectedRoute token={token} redirectTo='/'>
                  <Post />
                </ProtectedRoute>
              }
            />
            <Route 
              path='*'
              element={<NotFound />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App