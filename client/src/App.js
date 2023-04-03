import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth from './pages/Auth'
import Profile from './pages/Profile'
import Public from './pages/Public'
import Post from './pages/Post'
import IssueList from './components/IssueList'
import IssueDetailPage from './pages/IssueDetailPage'
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
              element={token ? <Navigate to='/issues' /> : <Auth />}
            />
            
            <Route 
              path='/issues' 
              element={<ProtectedRoute token={token}>
                  <Public />
                </ProtectedRoute>
              } 
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
              path='/issues/:issueId'
              element={<ProtectedRoute token={token} redirectTo='/'>
                  <IssueDetailPage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
