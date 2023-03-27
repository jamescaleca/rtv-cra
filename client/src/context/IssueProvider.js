// import React, { useEffect, useState, useContext } from 'react'
// import { useHistory } from 'react-router-dom'
// import axios from 'axios'
// import '../css/styles.css'

// export const IssueContext = React.createContext()

// const issueAxios = axios.create()

// export default function IssueProvider(props) {
//     const [issues, setIssues] = useState([])

//     function getIssueById(issueId) {
//         axios.get(`/api/issues/${issueId}`)
//             .then(res => setIssues(res.data))
//             .catch(err => console.log(err.response.data.errMsg))
//     }

//     function deleteIssue(issueId) {
//         axios.delete(`/api/issues/${issueId}`)
//             .then(res => {
//                 setIssues(prevIssues => prevIssues.filter(issue => issue.id !== issueId))
//                 axios.get('/issues')
//                     .then(res => setIssues(res.data))
//             })
//             .catch(err => console.log(err))
            
//     }

    // function editIssue(updates, issueId) {
    //     axios.put(`/api/issues/${issueId}`, updates)
    //         .then(res => {
    //             setIssues(prevIssues => prevIssues.map(issue => issue._id !== issueId ? issue : res.data))
    //         })
    //         .catch(err => console.log(err))
    // }

    // function getAllIssues() {
    //     issueAxios.get('/api/issues')
    //         .then(res => setIssues(prevState => ({
    //             ...prevState,
    //             issues: res.data
    //         })))
    //         .catch(err => console.log(err.response.data.errMsg))
    // }

    // const allIssues = issues.map(issue => 
    //     <Issue 
    //         {...issue}
    //         key={issue.title}
    //         deleteIssue={deleteIssue}
    //         editIssue={editIssue}
    //     />
    // )

    // const history = useHistory()

    // function submitBtnRedirect() {
    //     history.push('/api/issues/:userId')
    // }

    // useEffect(() => {
    //     getAllIssues()
    // }, [])

    // const useIssues = () => {
    //     const context = useContext(IssueContext)
    //     if (!context) throw new Error('You must use Provider to consume Context')
    //     return context
    // }

//     return (
//         <IssueContext.Provider value={{
//             ...issues,
//             // allIssues,
//             getAllIssues,
//             getIssueById,
//             editIssue,
//             deleteIssue,
//             history,
//             submitBtnRedirect
//         }}>
//             { props.children }
//         </IssueContext.Provider>
//     )
// }

// export { IssueProvider, useIssues, IssueContext }