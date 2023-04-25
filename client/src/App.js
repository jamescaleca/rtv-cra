import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth from './pages/Auth'
import Profile from './pages/Profile'
import Public, { loader as issuesLoader } from './pages/Public'
import Post from './pages/Post'
import IssueList from './components/IssueList'
import IssueDetailPage, { loader as issueDetailPageLoader } from './pages/IssueDetailPage'
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
              path='/'
              element={token ? <Navigate to='/issues' /> : <Auth />}
            />
            
            <Route 
              path='/issues' 
              element={<ProtectedRoute token={token} redirectTo='/'>
                  <Public />
                </ProtectedRoute>
              } 
            />
            <Route 
              path='/issues/:issueId'
              element={<ProtectedRoute token={token} redirectTo='/'>
                  <IssueDetailPage />
                </ProtectedRoute>
              }
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