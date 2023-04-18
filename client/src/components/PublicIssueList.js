import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import IssueMap from "./IssueMap"
import { UserContext } from '../context/UserProvider'
import UpvoteIcon from '../assets/icons/arrow-alt-square-up-regular.svg'
import DownvoteIcon from '../assets/icons/arrow-square-down-regular.svg'
import Patrick from '../assets/images/patrick.jpeg'
import '../css/styles.css'

export default function PublicIssueList(props) {
  // const { issues, username } = props
  const { getAllIssues, publicIssues } = useContext(UserContext)
  // const [votesTotal, setVotesTotal] = useState(0)

  useEffect(() => {
    getAllIssues()
  }, [])

  return (
    <>
      { publicIssues.length === 0 ? 
        <div className='nothing-here'>
          <h1>Oops!</h1>
          <p>Looks like there's nothing here.</p>
          <img src={Patrick}></img>
        </div>
        :
        <IssueMap 
          issues={publicIssues}
        />
      }
    </>
  )
}