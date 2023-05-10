import React, { useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom"
import axios from "axios"
import IssueMap from "../components/IssueMap"

export default function OtherUserProfile() {
  const { username } = useParams()
  const location = useLocation()
  const [otherUserIssues, setOtherUserIssues] = useState([])

  function getOtherUserIssues(userId) {
    axios.get(`/issues/user/${userId}`)
      .then(res => setOtherUserIssues(res.data))
      .catch(err => console.log(err.response.data.errMsg))
  }

  useEffect(() => {
    getOtherUserIssues(location.state.user)
  }, [location.state])

  return(
    <>
      <h1><i>{username}</i>'s issues</h1>
      <IssueMap 
        issues={otherUserIssues}
      />
    </>
  )
}