import React, { useContext } from 'react'
import { 
  RouterProvider, 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  Navigate 
} from 'react-router-dom'
import Auth from './pages/Auth'
import Profile from './pages/Profile'
import Public from './pages/Public'
import Post from './pages/Post'
import IssueList from './components/IssueList'
import IssueDetailPage from './pages/IssueDetailPage'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import { UserContext } from './context/UserProvider'
import './css/styles.css'

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<Layout />}>
    <Route 
      path='/'
      element={<Auth />}
    />
    <Route 
      path='/issues' 
      element={<Public />} 
    />
    <Route 
      path='/issues/:issueId'
      element={<IssueDetailPage />}
    />
    <Route 
      path='/profile'
      element={<Profile />}
    />
    <Route 
      path='/post'
      element={<Post />}
    />
    <Route 
      path='*'
      element={<NotFound />}
    />
  </Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
