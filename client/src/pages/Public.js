import React, { useContext, useEffect } from 'react'
import PublicIssueList from '../components/PublicIssueList'
import { UserContext } from '../context/UserProvider'
import '../css/styles.css'

export default function Public(){
  const { issues, getAllIssues, user: { username } } = useContext(UserContext)
  // console.log(issues)

  // useEffect(() => {
  //   getAllIssues()
  // }, [])

  return (
    <div className="public">
      <PublicIssueList />
    </div>
  )
}