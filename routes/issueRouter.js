const express = require('express')
const issueRouter = express.Router()
const Issue = require('../models/issue.js')

// Get all issues
issueRouter.get('/', (req, res, next) => {
  Issue.find((err, issues) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issues)
  })
})
// Get single issue by ID
issueRouter.get('/:issueId', (req, res, next) => {
  const issueId = req.params.issueId
  console.log(issueId)
  Issue.findById((issueId), (err, issue) => {
    if(err) {
      res.status(500)
      return next(err)
    }
    console.log(req.params)
    return res.status(200).send(issue)
  })
})

// Get issues by user id
issueRouter.get('/user/:userId', (req, res, next) => {
  Issue.find({ user: req.params.userId }, (err, issues) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issues)
  })
})



module.exports = issueRouter