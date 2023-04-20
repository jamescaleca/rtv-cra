import React, { useState } from 'react'
// import { useHistory } from 'react-router-dom'
import axios from 'axios'

const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  config.headers.Authorization = `Bearer ${token}`
  return config
})

export default function UserProvider(props) {
  const initState = {
    user: JSON.parse(localStorage.getItem('user')) || {},
    token: localStorage.getItem('token') || '',
    issues: [],
    // currentIssue: {},
    errMsg: ''
  }

  const [userState, setUserState] = useState(initState)
  const [publicIssues, setPublicIssues] = useState([])
  const [issue, setIssue] = useState(null)
  const [comments, setComments] = useState([])
  const [darkMode, setDarkMode] = useState(false)

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
      .catch(err => handleAuthError(err.response.data.errMsg))
      // .then(res => console.log(res))
      // .catch(err => console.log(err))
  }

  function login(credentials) {
    axios.post('/auth/login', credentials)
      .then(res => {
          const { user, token } = res.data
          console.log(res.data)
          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(user))
          getUserIssues()
          setUserState(prevUserState => ({
            ...prevUserState,
            user,
            token
          }))
      })
      .catch(err => handleAuthError(err.response.data.errMsg))
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUserState({
      user: {},
      token: '',
      issues: []
    })
  }

  function handleAuthError(errMsg){
    setUserState(prevState => ({
      ...prevState,
      errMsg
    }))
  }

  function resetAuthErr(){
    setUserState(prevState => ({
      ...prevState,
      errMsg: ''
    }))
  }

  // Get All Issues
  function getAllIssues() {
    userAxios.get('/issues')
      .then(res => {
        console.log(res.data)
        setPublicIssues(res.data)
      })
      .catch(err => console.log(err.res.data.errMsg))
  }

  // GET USER ISSUES
  function getUserIssues() {
    userAxios.get('/issues/user')
      .then(res => setUserState(prevState => ({
        ...prevState,
        issues: res.data
      })))
      .catch(err => console.log(err.response.data.errMsg))
  }

  // GET ALL COMMENTS
  function getAllComments(issueId) {
    userAxios.get(`/comments/${issueId}`)
      // .then(res => setComments(prevState => ({
      //   ...prevState,
      //   comments: prevState.comments.map(comment => 
      //     issueId === issue._id ? 
      //     {...issue, comments: [...res.data]} : 
      //     issue
      //   )
      // })))
      .then(res => setComments(res.data))
      .catch(err => console.log(err.response.data.errMsg))
  }

  // ADD AN ISSUE
  function addIssue(newIssue) {
    userAxios.post('/issues', newIssue)
      .then(res => {
        setUserState(prevState => ({
          ...prevState,
          issues: [...prevState.issues, res.data]
        }))
      })
      .catch(err => console.log(err.response.data.errMsg))
  }

  //GET ISSUE BY ID
  function getIssueById(issueId) {
    userAxios.get(`/issues/${issueId}`)
      .then(res => setIssue(res.data))
      .catch(err => console.log(err.response.data.errMsg))
  }

  // ADD A COMMENT
  function addComment(newComment, issueId) {
    userAxios.post(`/issues/${issueId}/comments`, newComment)
      .then(res => setUserState(prevState => ({
        ...prevState,
        issues: prevState.issues.map(issue => 
          issueId === issue._id ? 
          {...issue, comments: [...issue.comments, newComment]} : 
          issue
        )
      })))
      .catch(err => console.log(err.response.data.errMsg))
    return getAllComments(issueId)
  }

  //EDIT ISSUE
  function editIssue(updates, issueId) {
    userAxios.put(`/issues/${issueId}`, updates)
      .then(res => 
        setUserState(prevState => ({
        ...prevState,
        issues: prevState.issues.map(issue => 
          issue._id !== issueId ? issue : res.data)}))
        )
      .catch(err => console.log(err))
    return getUserIssues()
  }

  //UPVOTE ISSUE
  function upvoteIssue(issueId) {
    userAxios.put(`/issues/upvote/${issueId}`)
      .then(res => setUserState(prevState => ({
        ...prevState,
        issues: prevState.issues.map(issue => 
          issueId = issue._id ?
          {
            ...issue, 
            upvotes: [...issue.upvotes, res.data]
          } : 
          issue
        )
      })))
      .catch(err => console.log(err))
    return getAllIssues()
  }

  //DOWNVOTE ISSUE
  function downvoteIssue(issueId) {
    userAxios.put(`/issues/downvote/${issueId}`)
      .then(res => setUserState(prevState => ({
        ...prevState,
        issues: prevState.issues.map(issue => 
          issueId = issue._id ?
          {
            ...issue, 
            downvotes: [...issue.downvotes, res.data]
          } : 
          issue
        )
      })))
      .catch(err => console.log(err))
    return getAllIssues()
  }

  //DELETE ISSUE
  function deleteIssue(issueId) {
    userAxios.delete(`/issues/${issueId}`)
      .then(res => setUserState(prevState => ({
        ...prevState,
        issues: prevState.issues.filter(issue => issue._id !== issueId)
      })))
      .catch(err => console.log(err))
    return getUserIssues()
  }

  // const history = useHistory()

  // function submitBtnRedirect() {
  //   history.push('/profile')
  // }

  // function commentSubmitRedir(issueId) {
  //   history.push(`/api/issues/${issueId}`)
  // }

  return (
    <UserContext.Provider
      value={{
        ...userState,
        getAllIssues,
        getUserIssues,
        getIssueById,
        getAllComments,
        editIssue,
        deleteIssue,
        signup,
        login,
        logout,
        addIssue,
        addComment,
        resetAuthErr,
        upvoteIssue,
        downvoteIssue,
        issue,
        publicIssues,
        setIssue,
        comments,
        setComments,
        userAxios,
        darkMode, 
        setDarkMode
      }}
    >
      { props.children }
    </UserContext.Provider>
  )
}

export {UserContext, UserProvider}