import React from 'react'
import { 
  RouterProvider, 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  Navigate 
} from 'react-router-dom'
import Login, { loader as loginLoader } from './pages/Login'
import Profile from './pages/Profile'
import Public, { loader as issuesLoader } from './pages/Public'
import Post from './pages/Post'
import IssueList from './components/IssueList'
import IssueDetailPage, { loader as issueDetailPageLoader} from './pages/IssueDetailPage'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import { UserContext } from './context/UserProvider'
import './css/styles.css'


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route 
      index
      element={<Public />}
      loader={issuesLoader}
    />
    <Route 
      path='/login'
      element={<Login />}
      loader={loginLoader}
    />
    <Route 
      path='/issues/:issueId'
      element={<IssueDetailPage />}
      loader={issueDetailPageLoader}
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
